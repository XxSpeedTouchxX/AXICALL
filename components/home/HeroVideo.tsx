"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Playlist for the hero "montage" — plays each video in order, then loops
 * back to the first. Add more paths here once the files are in public/.
 */
const VIDEO_SOURCES = ["/hero-video.mp4"];

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isPlaylist = VIDEO_SOURCES.length > 1;

  // The clip is several megabytes, so it is only fetched once it is actually
  // on screen — and never for visitors who ask for reduced motion or are on a
  // metered connection, who get the poster instead.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion || connection?.saveData) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
    <div ref={containerRef} className="h-full w-full">
      <video
        ref={videoRef}
        key={VIDEO_SOURCES[index]}
        className="h-full w-full cursor-pointer object-cover"
        src={shouldLoad ? VIDEO_SOURCES[index] : undefined}
        poster="/hero-car.jpg"
        autoPlay
        muted
        loop={!isPlaylist}
        playsInline
        preload="none"
        onClick={togglePlayback}
        onEnded={isPlaylist ? handleEnded : undefined}
      >
        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>
    </div>
  );
}
