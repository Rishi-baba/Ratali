const categoryColors = {
  Work: "bg-[#dcecff] text-[#4a78c2]",
  Study: "bg-[#efe1ff] text-[#8a5bd1]",
  Personal: "bg-[#ffe7c7] text-[#d68a2f]",
  Health: "bg-[#ffdce3] text-[#d45d7a]",
};

const TaskCard = ({
  id,
  title,
  category,
  reward,
  time,
  completed = false,
  repeatFrequency = null, // "Daily", "Weekly", "Monthly"
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div
      className="
        group
        w-[75%]
        bg-[#fff5df]/90
        border
        border-[#e5d4af]
        rounded-2xl
        px-4
        py-3
        flex
        items-center
        justify-between
        transition-all
        duration-300
        hover:scale-[1.01]
        hover:shadow-sm
        relative
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* checkbox */}
        <button
          onClick={() => onToggleComplete && onToggleComplete(id)}
          className={`
            w-6
            h-6
            rounded-lg
            flex
            items-center
            justify-center
            text-white
            text-sm
            font-bold
            shrink-0
            transition-colors
            duration-300

            ${
              completed
                ? "bg-[#67b84f]"
                : "border-2 border-[#d9c39a] hover:border-[#67b84f]"
            }
          `}
        >
          {completed && "✓"}
        </button>

        {/* TEXT */}
        <div>

          <h3
            className={`
              text-[16px]
              font-semibold
              transition-colors
              duration-300
              ${completed ? "text-[#8b7551] line-through" : "text-[#5b3925]"}
            `}
          >
            {title}
          </h3>

          <div className="flex items-center gap-2 mt-1">

            {/* category */}
            <span
              className={`
                px-2
                py-[2px]
                rounded-full
                text-[11px]
                font-semibold

                ${categoryColors[category] || "bg-[#f5e7ca] text-[#7a5a32]"}
              `}
            >
              {category}
            </span>

            {/* repeat frequency */}
            {repeatFrequency && (
              <span className="flex items-center gap-1 text-[11px] text-[#8b7551] bg-[#eadcbc]/50 px-2 py-[2px] rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {repeatFrequency}
              </span>
            )}

            {/* time */}
            <span
              className="
                text-[12px]
                text-[#8b7551]
              "
            >
              {time}
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* reward */}
        <div
          className="
            flex
            items-center
            gap-1
            text-[#69b34c]
            font-bold
            text-[18px]
          "
        >
          🎋 +{reward}
        </div>

        {/* favorite */}
        <button
          className="
            text-[#f0b75a]
            text-[22px]
            hover:scale-110
            transition-all
            duration-300
          "
        >
          ☆
        </button>

        {/* Hover Actions (Edit & Delete) */}
        <div className="absolute -right-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* edit button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // onEdit could be implemented later
            }}
            className="
              text-[#8b7551]
              hover:text-[#5b3925]
              hover:bg-[#eadcbc]
              p-1.5
              rounded-full
              transition-all
              duration-300
            "
            title="Edit Task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(id);
            }}
            className="
              text-[#d45d7a]
              hover:text-[#b83b58]
              hover:bg-[#ffdce3]
              p-1.5
              rounded-full
              transition-all
              duration-300
            "
            title="Delete Task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
};

export default TaskCard;