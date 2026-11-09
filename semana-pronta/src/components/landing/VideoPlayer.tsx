import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
// Vídeo hospedado no Cloudinary; a capa é gerada automaticamente a partir do primeiro quadro
const VIDEO_URL =
  "https://res.cloudinary.com/jy3ikn6d/video/upload/v1794161872/semana-pronta-video-narrado.mp4";
const POSTER_URL =
  "https://res.cloudinary.com/jy3ikn6d/video/upload/so_0,f_jpg,q_auto/v1794161872/semana-pronta-video-narrado.jpg";

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [ended, setEnded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) setDuration(video.duration);
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) { video.pause(); return; }
    if (video.ended) video.currentTime = 0;
    setError(false);
    try { await video.play(); } catch { setError(true); setWaiting(false); }
  }

  async function fullscreen() {
    const video = videoRef.current;
    const player = playerRef.current;
    if (!video || !player) return;
    const iosVideo = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (player.requestFullscreen) await player.requestFullscreen();
      else iosVideo.webkitEnterFullscreen?.();
    } catch { video.controls = true; }
  }

  const playLabel = ended ? "Rever o vídeo" : playing ? "Pausar vídeo" : "Reproduzir vídeo";

  return (
    <div ref={playerRef} className="semana-player overflow-hidden rounded-2xl border border-border bg-ink shadow-page" role="region" aria-label="Vídeo Semana Pronta">
      <div className="relative aspect-[9/16]">
        <video
          ref={videoRef} src={VIDEO_URL} poster={POSTER_URL}
          preload="metadata" playsInline aria-label="Apresentação narrada do Semana Pronta"
          className="h-full w-full object-contain"
          onClick={() => void togglePlayback()}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
          onDurationChange={() => setDuration(videoRef.current?.duration ?? 0)}
          onTimeUpdate={() => setTime(videoRef.current?.currentTime ?? 0)}
          onPlay={() => { setPlaying(true); setEnded(false); }}
          onPause={() => setPlaying(false)}
          onPlaying={() => setWaiting(false)}
          onWaiting={() => setWaiting(true)}
          onCanPlay={() => { setWaiting(false); setDuration(videoRef.current?.duration ?? 0); }}
          onEnded={() => { setPlaying(false); setEnded(true); }}
          onVolumeChange={() => setMuted(videoRef.current?.muted ?? false)}
          onError={() => { setError(true); setWaiting(false); }}
        />
        {!playing && !error && (
          <Button variant="hero" size="icon" aria-label={playLabel} title={playLabel}
            onClick={() => void togglePlayback()}
            className="player-play absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink-foreground/20 [&_svg]:size-7">
            {ended ? <RotateCcw /> : <Play className="ml-1 fill-current" />}
          </Button>
        )}
        {waiting && playing && <div className="pointer-events-none absolute inset-0 grid place-items-center"><LoaderCircle className="size-9 animate-spin text-primary-foreground" aria-label="Carregando vídeo" /></div>}
        {error && <div className="absolute inset-x-4 bottom-4 rounded-lg bg-background p-4 text-center text-sm text-foreground" role="alert">Não foi possível reproduzir o vídeo.<Button variant="link" onClick={() => { videoRef.current?.load(); void togglePlayback(); }}>Tentar novamente</Button></div>}
      </div>
      <div className="border-t border-ink-muted/20 bg-ink px-3 pt-3 pb-2 text-ink-foreground">
        <input type="range" aria-label="Progresso do vídeo" min={0} max={duration || 1} step={0.1} value={Math.min(time, duration || 1)} disabled={!duration}
          onChange={(event) => { const video = videoRef.current; if (video) { video.currentTime = Number(event.target.value); setTime(video.currentTime); } }}
          className="video-progress block h-4 w-full cursor-pointer accent-primary disabled:cursor-wait" />
        <div className="flex h-11 items-center gap-1">
          <Button variant="ghost" size="icon" className="player-control shrink-0" title={playLabel} aria-label={playLabel} onClick={() => void togglePlayback()}>{playing ? <Pause /> : ended ? <RotateCcw /> : <Play />}</Button>
          <span className="min-w-0 flex-1 pl-1 text-xs tabular-nums text-ink-muted">{formatTime(time)} <span aria-hidden="true">/</span> {formatTime(duration)}</span>
          <Button variant="ghost" size="icon" className="player-control shrink-0" aria-label={muted ? "Ativar som" : "Silenciar vídeo"} title={muted ? "Ativar som" : "Silenciar vídeo"} onClick={() => { const video = videoRef.current; if (video) video.muted = !video.muted; }}>{muted ? <VolumeX /> : <Volume2 />}</Button>
          <Button variant="ghost" size="icon" className="player-control shrink-0" aria-label="Tela cheia" title="Tela cheia" onClick={() => void fullscreen()}><Maximize /></Button>
        </div>
      </div>
    </div>
  );
}