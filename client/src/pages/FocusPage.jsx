import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, Music, Maximize } from "lucide-react";
import focusVideo from "../assets/focus.mp4";
import useAudioStore from "../store/audioStore";

const FocusPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const { isMuted, setIsMuted, customAudio, setCustomAudio } = useAudioStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Focus time accumulation
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("ratali_focus_time") || "{}");
    
    if (stored.date !== today) {
      localStorage.setItem("ratali_focus_time", JSON.stringify({ date: today, focusTime: 0 }));
      setTime(0);
    } else {
      setTime(stored.focusTime || 0);
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((t) => {
          const newTime = t + 1;
          const today = new Date().toISOString().split("T")[0];
          localStorage.setItem("ratali_focus_time", JSON.stringify({ date: today, focusTime: newTime }));
          return newTime;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle Audio
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudio(url);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-white/20">
      
      {/* Background Video */}
      <video
        ref={videoRef}
        src={focusVideo}
        autoPlay
        loop
        muted={true}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        className="hidden"
        onChange={handleAudioUpload}
      />

      {/* Top Left: Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg border border-white/10"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-semibold tracking-wide">Back</span>
      </button>

      {/* Top Right: Controls */}
      {!isFullscreen && (
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          
          <button
            onClick={toggleMute}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg border border-white/10"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={() => fileInputRef.current.click()}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg border border-white/10"
            title="Add Music"
          >
            <Music size={18} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg border border-white/10"
            title="Fullscreen"
          >
            <Maximize size={18} />
          </button>

        </div>
      )}

      {/* Center: Timer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
        
        <div className="flex flex-col items-center justify-center pointer-events-auto">
          <h1 className="text-[12px] md:text-sm uppercase tracking-[0.3em] text-[#d9c39a] mb-4 font-bold drop-shadow-md">
            Focus Time
          </h1>
          
          <div className="text-7xl md:text-[8rem] font-light tracking-widest text-[#f8f1df] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] mb-8 font-mono">
            {formatTime(time)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-8 py-3 bg-[#6c9f43]/80 hover:bg-[#6c9f43] backdrop-blur-md text-white rounded-full transition-all duration-300 shadow-lg border border-[#82d85f]/50 uppercase tracking-widest text-xs font-bold"
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setTime(0);
                const today = new Date().toISOString().split("T")[0];
                localStorage.setItem("ratali_focus_time", JSON.stringify({ date: today, focusTime: 0 }));
              }}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white/70 hover:text-white rounded-full transition-all duration-300 shadow-lg border border-white/5 uppercase tracking-widest text-xs font-bold"
            >
              Reset
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FocusPage;
