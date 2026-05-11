const TaskSummaryCard = () => {
  return (
    <div
      className="
        h-full
        w-full
        px-4
        py-3
        flex
        flex-col
      "
    >

      {/* TITLE */}
      <div className="mb-3 mt-2 ml-2">

        <h2
          className="
            text-[20px]
            font-bold
            text-[#5b3925]
            leading-none
          "
        >
          Task Summary
        </h2>


      </div>



      {/* PRODUCTIVITY */}
      <div
        className="
         
          rounded-2xl
          px-4
          py-2

        "
      >

        <div className="flex items-center justify-between ">

          <span
            className="
              text-[13px]
              font-semibold
              text-[#5b3925]
            "
          >
            Productivity
          </span>

          <span
            className="
              text-[13px]
              font-bold
              text-[#67b84f]
            "
          >
            60%
          </span>

        </div>


        

        {/* motivation */}
        <p
          className="
            text-[11px]
            text-[#7a5a32]
            mt-2
            leading-snug
          "
        >
          🌿 You're doing great today. Keep going!
        </p>

      </div>

    </div>
  );
};

export default TaskSummaryCard;