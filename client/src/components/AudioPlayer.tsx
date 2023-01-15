import React, { useState, useEffect } from 'react';

interface Props {
  audioFiles: string[];
}

const AudioPlayer: React.FC<Props> = ({ audioFiles }) => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioFiles.length) {
      return;
    }

    // create an audio element to play the files
    const audio = new Audio();
    setAudioElement(audio);
    audio.src = audioFiles[currentAudioIndex];
    audio.play();

    // set up event listeners to move to next file when the current one ends
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioFiles, currentAudioIndex]);

  const handleAudioEnded = () => {
    if (currentAudioIndex + 1 === audioFiles.length) {
      audioFiles = []
    } else {
      setCurrentAudioIndex(currentAudioIndex + 1);
    }
  };

  // return <div>Playing audio {currentAudioIndex + 1} of {audioFiles.length}</div>;
  return <></>;
};

export default AudioPlayer;