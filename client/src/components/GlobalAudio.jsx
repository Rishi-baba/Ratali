import React, { useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import useAudioStore from "../store/audioStore";
import siteAudioFile from "../assets/site.mp4";

const GlobalAudio = () => {
  const { isMuted, setIsMuted, customAudio } = useAudioStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch((e) => console.log("Audio play blocked", e));
      }
    }
  }, [isMuted, customAudio]);

  return (
    <>
      <audio
        ref={audioRef}
        src={customAudio || siteAudioFile}
        autoPlay
        loop
        muted={isMuted}
      />
      
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 left-6 z-[9999] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-300 group"
        title={isMuted ? "Unmute Site Audio" : "Mute Site Audio"}
      >
        {isMuted ? (
          <VolumeX size={22} className="text-[#f8f1df]/70 group-hover:text-[#f8f1df]" />
        ) : (
          <Volume2 size={22} className="text-[#f8f1df]/70 group-hover:text-[#f8f1df]" />
        )}
      </button>
    </>
  );
};

export default GlobalAudio;
