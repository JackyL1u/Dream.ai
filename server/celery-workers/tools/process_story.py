import os
import time
import uuid
import io
import requests
import openai
import replicate
import nltk
from PIL import Image, ImageOps, ImageChops
from dotenv import load_dotenv
from urllib.request import urlretrieve
from mutagen.mp3 import MP3

load_dotenv()
nltk.load('tokenizers/punkt/english.pickle')

OPENAI_API_TOKEN = os.getenv('OPENAI_API_TOKEN')

openai.api_key = OPENAI_API_TOKEN

def create_story(topic, tags):
  print("Starting Create Story Text")
  start = "Make a story about {} in 5 sentences or less.".format(topic)
  story_text = ""

  while True:
    if story_text == "":
      prompt = start
    else:
      prompt = story_text
    gpt3_response = openai.Completion.create(
      model="text-davinci-003",
      prompt=prompt,
      n=1
    )
    story_text = story_text + gpt3_response.choices[0].text
    if story_text[-1] in [".", "!"]:
      break
  print("Finished Create Story Text")

  print(story_text)
  sentences = nltk.tokenize.sent_tokenize(story_text)

  if len(sentences) > 3:
    sentences = sentences[0:3]

  counter = 0

  result = []

  for sentence in sentences:
    sentence = sentence.replace('\n', ' ')

    audio, duration = create_audio(sentence)
    frames = create_frames(sentence, tags, duration)

    result.append({
      "text": sentence,
      "audio": audio,
      "frames": frames
    })

    print(sentence)
    
  print(result)
  return result

def create_audio(sentence):
  print("Starting Create Audio")
  model = replicate.models.get("afiaka87/tortoise-tts")
  version = model.versions.get("e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71")
  url = version.predict(text=sentence, voice_a="freeman")
  
  filename, _ = urlretrieve(url)
  audio = MP3(filename)
  print("Finished Create Audio")
  return [url, round(audio.info.length)]

def create_frames(sentence, styles, num_of_frames):
  print("Starting Create Frames")

  prompt = "{} Create in {} style".format(sentence, ", ".join(styles))

  image_size = 256

  frames = []

  for i in range(0, num_of_frames):
    if i == 0:
      dalle2_response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="{}x{}".format(image_size, image_size)
      )
      image_url = dalle2_response['data'][0]['url']
      frames.append(image_url)
    else:
      image = Image.open(requests.get(frames[-1], stream=True).raw)

      mask = shift_image(frames[-1], num_of_frames)

      image_bytes = io.BytesIO()
      image.save(image_bytes, format='PNG')
      image_bytes = image_bytes.getvalue()

      mask_bytes = io.BytesIO()
      mask.save(mask_bytes, format='PNG')
      mask_bytes = mask_bytes.getvalue()

      dalle2_response = openai.Image.create_edit(
        image=mask_bytes,
        mask=mask_bytes,
        prompt=prompt,
        n=1,
        size="{}x{}".format(image_size, image_size)
      )
      image_url = dalle2_response['data'][0]['url']
      frames.append(image_url)
  print("Finished Create Frames")
  return frames
  
def shift_image(image_url, num_of_frames):
  
  image = Image.open(requests.get(image_url, stream=True).raw).convert('RGBA')
  width, height = image.size

  shift_size = width // num_of_frames

  image = image.crop((shift_size, 0, width, height))
  image = ImageChops.offset(image, width - shift_size, 0)
  image = ImageOps.pad(image, (width, height), color=None, centering=(0, 0))
  return image
