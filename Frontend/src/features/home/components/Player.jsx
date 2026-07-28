import { useContext, useEffect, useRef, useState } from "react";
import "../styles/player.scss";
import { useSong } from "../hooks/useSong";

const speedOptions = [0.75, 1, 1.25, 1.5];

const Player = () => {
  const audioRef = useRef(null);
  const { song } = useSong();;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song.url]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Unable to play audio:", error);
    }
  };

  const seekBySeconds = (seconds) => {
    const audio = audioRef.current;

    if (!audio) return;

    const nextTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration || audio.duration || 0
    );

    audio.currentTime = nextTime;
    setProgress(nextTime);
  };

  const changeSpeed = (rate) => {
    const audio = audioRef.current;

    if (audio) {
      audio.playbackRate = rate;
    }

    setPlaybackRate(rate);
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  const formatTime = (value) => {
    if (!Number.isFinite(value)) return "0:00";

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player">
      <div className="player-card">
      <audio ref={audioRef} src={song.url} preload="metadata" />

      <div className="player-top-row">
        <img src={song.posterUrl} alt={song.title} className="player-poster" />
        <div className="player-info">
          <h3 className="player-title">{song.title}</h3>
          <p className="player-subtitle">{song.mood} mood</p>
        </div>
      </div>

      <div className="player-progress-wrap">
        <span className="player-time">{formatTime(progress)}</span>
        <div className="player-progress-bar">
          <div
            className="player-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="player-time">{formatTime(duration)}</span>
      </div>

      <div className="player-controls">
        <button className="player-control-button" onClick={() => seekBySeconds(-5)}>
          −5s
        </button>
        <button className="player-play-button" onClick={togglePlayback}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className="player-control-button" onClick={() => seekBySeconds(5)}>
          +5s
        </button>
      </div>

      <div className="player-speed-row">
        {speedOptions.map((rate) => (
          <button
            key={rate}
            className={`player-speed-button${playbackRate === rate ? " active" : ""}`}
            onClick={() => changeSpeed(rate)}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Player;