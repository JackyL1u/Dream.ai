from celery import Celery
from celery.utils.log import get_task_logger
from decouple import config
import json
import uuid
from tools.db import database
import socketio
from tools.process_story import create_story

logger = get_task_logger(__name__)

BROKER = "amqp://guest:guest@rabbitmq:5672"
app = Celery('tasks', broker=BROKER, backend='rpc://')


@app.task()
def process(uuid1, prompt, tags):
    query = database["dreamai"].find_one({"prompt": prompt, "tags": tags}, {"_id": False})
    if query is not None:
        sio = socketio.Client()
        sio.connect('http://socket-io-server:5001')
        sio.emit("message", {"uuid": uuid1, "successful": True, "story": query.get("story")})
    else:
        story = create_story(prompt, tags)
        sio = socketio.Client()
        sio.connect('http://socket-io-server:5001')
        sio.emit("message", {"uuid": uuid1, "successful": True, "story": story})
        query = database["dreamai"].insert_one({"prompt": prompt, "tags": tags, "story": story})
    return ("Successful")

