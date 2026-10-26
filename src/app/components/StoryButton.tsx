'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Clock3, Film, Play, RotateCcw, X } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

export default function StoryButton() {
  const [open, setOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [playbackError, setPlaybackError] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resetVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setVideoStarted(false);
    setVideoEnded(false);
    setPlaybackError('');
  }, []);

  const closeModal = useCallback(() => {
    resetVideo();
    setOpen(false);
  }, [resetVideo]);

  const playVideo = useCallback(() => {
    setPlaybackError('');
    setVideoEnded(false);
    setVideoStarted(true);
  }, []);

  const replayVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setPlaybackError('');
    setVideoEnded(false);
    video.currentTime = 0;

    try {
      await video.play();
    } catch {
      setPlaybackError('Playback could not restart. Please use the video controls to try again.');
    }
  }, []);

  const formatDuration = (seconds: number | null) => {
    if (seconds === null || !Number.isFinite(seconds)) return 'Loading duration…';

    const rounded = Math.max(0, Math.round(seconds));
    const hours = Math.floor(rounded / 3600);
    const minutes = Math.floor((rounded % 3600) / 60);
    const remainingSeconds = rounded % 60;

    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
      : `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [closeModal, open]);

  useEffect(() => {
    if (!open || !videoStarted) return;

    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      setPlaybackError('Playback did not start automatically. Please use the video controls.');
    });
  }, [open, videoStarted]);

  const modal = open
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-title"
          aria-describedby="story-description"
          className="story-overlay-in fixed inset-0 z-[100] overflow-y-auto bg-ink/80 px-4 py-5 backdrop-blur-xl sm:px-6 sm:py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <span className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <span className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-ocean opacity-40 blur-3xl" />
          </div>

          <div
            className="flex min-h-full items-center justify-center"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <article className="story-panel-in relative grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-ink-foreground/15 bg-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] lg:grid-cols-[1.12fr_0.88fr] lg:rounded-[2.25rem]">
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close story"
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ink-foreground/20 bg-ink/45 text-ink-foreground backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:right-6 sm:top-6"
              >
                <X size={19} />
              </button>

              <div className="group relative min-h-[18rem] overflow-hidden bg-black sm:min-h-[23rem] lg:min-h-[38rem]">
                <video
                  ref={videoRef}
                  src="/video/Santorini.mp4"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Discover Santorini — a VOYA film"
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                  onEnded={() => setVideoEnded(true)}
                  onError={() =>
                    setPlaybackError(
                      'The Santorini film could not be loaded. Please try again in a moment.'
                    )
                  }
                  className={`absolute inset-0 h-full w-full bg-black object-cover object-center transition-opacity duration-500 ${
                    videoStarted ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {!videoStarted && (
                  <>
                    <AppImage
                      src="https://img.rocket.new/generatedImages/rocket_gen_img_180d38964-1772538356369.png"
                      alt="Santorini cliffs and an infinity pool overlooking the Aegean Sea"
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/25" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink/30" />
                  </>
                )}

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink/35 px-3.5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground backdrop-blur-md sm:left-7 sm:top-7">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-primary ${videoStarted && !videoEnded ? 'animate-pulse' : ''}`}
                  />
                  A VOYA film
                </div>

                {!videoStarted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={playVideo}
                      aria-label="Play Discover Santorini"
                      className="story-play-float relative flex h-24 w-24 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 focus-visible:scale-105 sm:h-28 sm:w-28"
                    >
                      <span className="absolute inset-0 rounded-full border border-ink-foreground/30 bg-ink/25 backdrop-blur-md" />
                      <span className="absolute inset-3 rounded-full border border-primary/50" />
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_45px_rgba(201,168,106,0.45)]">
                        <Play size={20} className="ml-1" fill="currentColor" />
                      </span>
                    </button>
                  </div>
                )}

                {videoEnded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/45 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={replayVideo}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_15px_40px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                    >
                      <RotateCcw size={17} />
                      Replay film
                    </button>
                  </div>
                )}

                {playbackError && videoStarted && (
                  <div
                    role="status"
                    className="absolute inset-x-4 bottom-16 rounded-xl border border-ink-foreground/15 bg-ink/85 px-4 py-3 text-center text-xs leading-5 text-ink-foreground backdrop-blur-md sm:inset-x-8"
                  >
                    {playbackError}
                  </div>
                )}

                {!videoStarted && (
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-ink-foreground sm:p-8">
                    <div>
                      <p className="eyebrow text-primary">Discover Santorini</p>
                      <p className="mt-2 max-w-xs font-display text-2xl leading-tight sm:text-3xl">
                        A cinematic journey through the Aegean
                      </p>
                    </div>
                    <span className="hidden text-xs font-semibold tracking-widest text-ink-foreground/60 sm:block">
                      {formatDuration(duration)}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative flex flex-col justify-between p-7 text-ink-foreground sm:p-10 lg:p-12">
                <div>
                  <div className="mb-8 flex items-center gap-3 text-primary">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                      <Film size={17} />
                    </span>
                    <span className="eyebrow">A VOYA film</span>
                  </div>

                  <h2
                    id="story-title"
                    className="font-display text-4xl font-medium leading-[0.98] sm:text-5xl lg:text-6xl"
                  >
                    The VOYA <span className="italic text-primary">story</span>
                  </h2>
                  <p
                    id="story-description"
                    className="mt-7 text-sm leading-7 text-ink-foreground/70 sm:text-base"
                  >
                    Discover the beauty of Santorini through a cinematic journey of breathtaking
                    landscapes, timeless architecture, and unforgettable Mediterranean moments.
                  </p>

                  <div className="my-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />

                  <div className="flex items-center gap-3 text-sm text-ink-foreground/65">
                    <Clock3 size={16} className="text-primary" />
                    <span>{formatDuration(duration)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="group mt-10 inline-flex w-full items-center justify-between rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-12px_rgba(201,168,106,0.7)] active:translate-y-0"
                >
                  Continue exploring
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </article>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetVideo();
          setDuration(null);
          setVideoStarted(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Watch our story"
        className="group relative flex h-36 w-36 items-center justify-center rounded-full transition-transform duration-500 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-3 rounded-full border border-primary/25 opacity-0 transition-all duration-500 group-hover:inset-0 group-hover:opacity-100" />
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full animate-spin-slow text-ink-foreground"
          aria-hidden="true"
        >
          <defs>
            <path id="story-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text fill="currentColor" fontSize="9.5" letterSpacing="3.2" fontWeight="600">
            <textPath href="#story-circle">WATCH OUR STORY • WATCH OUR STORY •</textPath>
          </text>
        </svg>
        <span className="absolute inset-4 rounded-full border border-ink-foreground/30 bg-ink/10 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/60 group-hover:bg-primary/15" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_35px_-12px_rgba(201,168,106,0.9)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_38px_rgba(201,168,106,0.45)]">
          <Play size={20} className="ml-0.5" fill="currentColor" />
        </span>
      </button>

      {modal}
    </>
  );
}
