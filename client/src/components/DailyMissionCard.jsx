const DailyMissionCard = () => {
  return (
    <div
      className="
        h-full
        w-full
        px-6
        py-4
        mt-4
        flex
        flex-col
        items-center
        justify-center
        text-center
        overflow-hidden
        rounded-2xl
      "
    >
      <div className="relative">
        <span className="absolute -top-6 -left-4 text-4xl text-[#d6a04a]/20 font-serif">“</span>
        <p
          className="
            text-[14px]
            md:text-[15px]
            text-[#5b3925]
            font-medium
            leading-relaxed
            italic
            tracking-wide
          "
        >
          this is just a chapter not your whole story turn the page
        </p>
        <span className="absolute -bottom-10 -right-4 text-4xl text-[#d6a04a]/20 font-serif">”</span>
      </div>
      
      <div className="mt-4 w-12 h-1 bg-[#d6a04a]/30 rounded-full" />
    </div>
  );
};

export default DailyMissionCard;