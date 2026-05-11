import pandaImage from "../assets/focus-panda.png";

const TodaysFocusCard = () => {
  return (
    <div
      className="
        h-[110%]
        w-[95%]
        ml-7
        flex
        flex-col
        overflow-hidden
      "
    >

      {/* TITLE */}
      <h2
        className="
          text-[18px]
          font-bold
          text-[#5b3925]
          leading-none
          mb-3
        "
      >
        Today's Focus
      </h2>

      {/* MAIN CONTENT */}
      <div className="flex items-center justify-between flex-1">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* PANDA */}
          <img
            src={pandaImage}
            alt="Focus Panda"
            className="
              w-[75px]
              object-contain
              shrink-0
            "
          />

          {/* TEXT */}
          <div>

            <p
              className="
                text-[12px]
                text-[#7a5a32]
                leading-none
              "
            >
              You've got
            </p>

            <h3
              className="
                text-[42px]
                font-bold
                text-[#67b84f]
                leading-none
                my-1
              "
            >
              4.5
            </h3>

            <p
              className="
                text-[12px]
                text-[#5b3925]
                font-semibold
                leading-none
              "
            >
              focus hours left
            </p>

          </div>

        </div>

        {/* OPTIONAL MINI ICON */}
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-[#eef6d8]
            flex
            items-center
            justify-center
            text-[18px]
            shrink-0
          "
        >
          🌿
        </div>

      </div>

    </div>
  );
};

export default TodaysFocusCard;