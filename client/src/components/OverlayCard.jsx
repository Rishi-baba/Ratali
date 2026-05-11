

const OverlayCard = ({ className }) => {
  return (
    <div
      className={`
        absolute
        z-10
        rounded-3xl
        bg-[#f6e7c8]/30
        shadow-2xl
        border
        border-[#7a5a32]/30
        ring-1 ring-white/20
        ${className}
      `}
    />
  );
};

export default OverlayCard;