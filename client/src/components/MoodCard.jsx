const MoodCard = () => {
  return (
    <div
      className="
        h-full
        w-full
        px-5

        flex
        flex-col
      "
    >

      {/* TITLE */}
      <h2
        className="
          text-[18px]
          font-bold
          text-[#5b3925]
          mb-3
        "
      >
        Panda's Mood
      </h2>

      {/* CONTENT */}
      <div className="flex items-center gap-3">

        {/* panda icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/128/3069/3069172.png"
          alt="Panda Mood"
          className="w-14 h-14 object-contain"
        />

        {/* mood text */}
        <div>

          <h3
            className="
              text-[16px]
              font-bold
              text-[#5b3925]
              leading-none
            "
          >
            Relaxed
          </h3>

          <p
            className="
              text-[13px]
              text-[#7a5a32]
              mt-2
            "
          >
            Keep it up!
          </p>

        </div>

      </div>

    </div>
  );
};

export default MoodCard;