import { useEffect, useRef, useState } from "react";
import { TRAINING_VIDEO_SECTION } from "../data";

const base = import.meta.env.BASE_URL;
const asset = (src: string) => base + src.replace(/^\//, "");

type VideoElementWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

function TrainingVideoSection() {
  const videoRef = useRef<VideoElementWithWebkit | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const supported =
      Boolean(document.fullscreenEnabled) ||
      Boolean(video && typeof video.webkitEnterFullscreen === "function");
    setCanFullscreen(supported);
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      try {
        await video.play();
        setHasStarted(true);
        setIsPlaying(true);
      } catch {
        // Fallback: if browser blocks unmuted play, start muted so user still sees video
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setHasStarted(true);
        setIsPlaying(true);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = async () => {
    const frame = frameRef.current;
    const video = videoRef.current;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (frame && frame.requestFullscreen) {
      await frame.requestFullscreen();
    } else if (video && typeof video.webkitEnterFullscreen === "function") {
      video.webkitEnterFullscreen();
    }
  };

  return (
    <section className="section training-video" id="rotina">
      <div className="container training-video__inner">
        <div className="training-video__copy">
          <span className="eyebrow">{TRAINING_VIDEO_SECTION.eyebrow}</span>
          <h2>{TRAINING_VIDEO_SECTION.title}</h2>
          <p className="training-video__lead">{TRAINING_VIDEO_SECTION.description}</p>
          <a className="button button--ghost training-video__cta" href="#planos">
            {TRAINING_VIDEO_SECTION.cta}
          </a>
        </div>

        <div className="training-video__media">
          <div className="training-video__frame" ref={frameRef}>
            <video
              ref={videoRef}
              className="training-video__player"
              src={asset(TRAINING_VIDEO_SECTION.videoSrc)}
              poster={asset(TRAINING_VIDEO_SECTION.posterSrc)}
              preload="none"
              playsInline
              muted={isMuted}
              aria-label={TRAINING_VIDEO_SECTION.videoAriaLabel}
              onClick={togglePlay}
              onPlay={() => {
                setHasStarted(true);
                setIsPlaying(true);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {!isPlaying && (
              <button
                type="button"
                className="training-video__play-overlay"
                onClick={togglePlay}
                aria-label={hasStarted ? "Continuar vídeo dos treinos" : "Reproduzir vídeo dos treinos"}
              >
                <span className="training-video__play-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M8 5.5v13l10.5-6.5L8 5.5z" />
                  </svg>
                </span>
              </button>
            )}

            <div className="training-video__controls" aria-label="Controles do vídeo">
              <button
                type="button"
                className="training-video__control-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M7 5h3.5v14H7V5zm6.5 0H17v14h-3.5V5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l10.5-6.5L8 5.5z" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className="training-video__control-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Ativar som" : "Silenciar vídeo"}
                aria-pressed={isMuted}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>

              {canFullscreen && (
                <button
                  type="button"
                  className="training-video__control-btn"
                  onClick={handleFullscreen}
                  aria-label="Tela cheia"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrainingVideoSection;
