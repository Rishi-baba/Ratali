const CareTaskItem = ({
  title,
  completed = false,
  progress,
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        py-1
        border-b
        border-[#eadcbc]
        last:border-none
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-2">

        {/* checkbox */}
        <div
          className={`
            w-4
            h-4
            rounded-md
            flex
            items-center
            justify-center
            text-white
            text-[11px]
            font-bold

            ${
              completed
                ? "bg-[#4caf50]"
                : "border border-[#ccb993]"
            }
          `}
        >
          {completed && "✓"}
        </div>

        {/* title */}
        <span
          className="
            text-[14px]
            text-[#5b3925]
            font-medium
          "
        >
          {title}
        </span>

      </div>

      {/* RIGHT */}
      <span
        className="
          text-[13px]
          text-[#69a85b]
          font-semibold
        "
      >
        {completed ? "Done" : progress}
      </span>

    </div>
  );
};

export default CareTaskItem;