"use client";

import { useRef, useState } from "react";

/**
 * Playlist for the hero "montage" — plays each video in order, then loops
 * back to the first. Add more paths here once the files are in public/.
 */
const VIDEO_SOURCES = ["/hero-video.mp4"];

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const isPlaylist = VIDEO_SOURCES.length > 1;

  function handleEnded() {
    setIndex((i) => (i + 1) % VIDEO_SOURCES.length);
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }

  return (
    <video
      ref={videoRef}
      key={VIDEO_SOURCES[index]}
      className="h-full w-full cursor-pointer object-cover"
      src={VIDEO_SOURCES[index]}
      poster="/hero-car.jpg"
      autoPlay
      muted
      loop={!isPlaylist}
      playsInline
      preload="metadata"
      onClick={togglePlayback}
      onEnded={isPlaylist ? handleEnded : undefined}
    >
      Votre navigateur ne prend pas en charge la lecture vidéo.
    </video>
  );
}
