import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);
  return seconds + minutes * 60;
};

const Player = ({ duration, randomIdFromArtist, randomId2FromArtist, audio }) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const progressContainer = useRef();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const [progressPercent, setProgressPercent] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const durationInSeconds = timeInSeconds(duration);

  const playPause = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetProgress = () => {
    audioPlayer.current.currentTime = 0;
    progressBar.current.style.setProperty("--_progress", "0%");
    setCurrentTime(formatTime(0));
    setProgressPercent(0);
  };

  const faForwardClick = () => {
    resetProgress();
    window.location.href = `/song/${randomId2FromArtist}`;
  };

  const handleBackwardClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      window.location.href = `/song/${randomIdFromArtist}`;
    } else {
      setClickTimeout(
        setTimeout(() => {
          resetProgress();
          setClickTimeout(null);
        }, 300)
      );
    }
  };

  // Atualiza o tempo e o progresso com base na posição do clique/arrasto
  const updateTimePosition = (clientX) => {
    const containerRect = progressContainer.current.getBoundingClientRect();
    const clickPosition = clientX - containerRect.left;
    const containerWidth = containerRect.width;
    let progressPercentage = (clickPosition / containerWidth) * 100;
    progressPercentage = Math.max(0, Math.min(100, progressPercentage));
    progressBar.current.style.setProperty("--_progress", `${progressPercentage}%`);
    setProgressPercent(progressPercentage);
    const newTimeInSeconds = (progressPercentage / 100) * durationInSeconds;
    audioPlayer.current.currentTime = newTimeInSeconds;
    setCurrentTime(formatTime(newTimeInSeconds));
  };

  const handleProgressClick = (e) => {
    updateTimePosition(e.clientX);
  };

  const handleProgressDragStart = (e) => {
    setIsDragging(true);
    updateTimePosition(e.clientX);
    if (isPlaying) {
      audioPlayer.current.pause();
    }
  };

  const handleProgressDragMove = (e) => {
    if (isDragging) {
      updateTimePosition(e.clientX);
    }
  };

  const handleProgressDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleProgressDragMove);
      document.addEventListener("mouseup", handleProgressDragEnd);
    } else {
      document.removeEventListener("mousemove", handleProgressDragMove);
      document.removeEventListener("mouseup", handleProgressDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleProgressDragMove);
      document.removeEventListener("mouseup", handleProgressDragEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying && !isDragging) {
        const current = audioPlayer.current.currentTime;
        setCurrentTime(formatTime(current));
        const progress = (current / durationInSeconds) * 100;
        progressBar.current.style.setProperty("--_progress", `${progress}%`);
        setProgressPercent(progress);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [isPlaying, isDragging, durationInSeconds]);

  useEffect(() => {
    const handleAudioEnd = () => {
      setIsPlaying(false);
      resetProgress();
    };
    const audioEl = audioPlayer.current;
    audioEl.addEventListener("ended", handleAudioEnd);
    return () => {
      audioEl.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  return (
    <div className="player">
      <div className="player__controllers">
        <FontAwesomeIcon
          className="player__icon"
          onClick={handleBackwardClick}
          icon={faBackwardStep}
        />

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />

        <FontAwesomeIcon
          className="player__icon"
          icon={faForwardStep}
          onClick={faForwardClick}
        />
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div
          ref={progressContainer}
          className={`player__bar ${isHovered ? "player__bar--hover" : ""}`}
          onClick={handleProgressClick}
          onMouseDown={handleProgressDragStart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer" }}
        >
          <div ref={progressBar} className="player__bar-progress"></div>
          {/* Exibe a bola somente no hover */}
          {isHovered && (
            <div
              className="player__ball"
              style={{ left: `${progressPercent}%` }}
            ></div>
          )}
        </div>

        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
