import {
  Gift,
} from "lucide-react";

const DailyMissionCard = () => {
  return (
    <div
      className="
        h-full
        w-full
        px-4
        py-3
        mt-3
        flex
        items-center
        justify-between
        gap-4
        overflow-hidden
      "
    >

      {/* LEFT */}
      <div className="flex-1 min-w-0">

        <h2
          className="
            text-[18px]
            font-bold
            text-[#5b3925]
            leading-none
          "
        >
          Daily Mission
        </h2>

        <p
          className="
            text-[12px]
            text-[#7a5a32]
            mt-2
            leading-snug
          "
        >
          Complete 5 tasks today
          and earn bamboo rewards!
        </p>

        {/* progress */}
        <div className="mt-3">

          <div
            className="
              w-full
              h-3
              rounded-full
              bg-[#e8d8b7]
              overflow-hidden
            "
          >
            <div
              className="
                h-full
                w-[60%]
                bg-[#67b84f]
                rounded-full
              "
            />
          </div>

          <div className="flex items-center justify-between mt-1">

            <span
              className="
                text-[11px]
                text-[#7a5a32]
              "
            >
              3 / 5 completed
            </span>

            <span
              className="
                text-[12px]
                font-bold
                text-[#67b84f]
              "
            >
              🎋 150
            </span>

          </div>

        </div>

      </div>

      {/* REWARD ICON */}
      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-[#f7e8cb]
          flex
          items-center
          justify-center
          shrink-0
        "
      >

        <Gift
          size={32}
          className="text-[#d6a04a]"
        />

      </div>

    </div>
  );
};

export default DailyMissionCard;