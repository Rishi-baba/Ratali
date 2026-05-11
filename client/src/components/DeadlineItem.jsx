const categoryColors = {
  Work: "bg-[#dcecff] text-[#4a78c2]",
  Study: "bg-[#efe1ff] text-[#8a5bd1]",
  Personal: "bg-[#ffe7c7] text-[#d68a2f]",
  Health: "bg-[#ffdce3] text-[#d45d7a]",
};

const DeadlineItem = ({
  title,
  date,
  category,
}) => {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        py-2
        border-b
        border-[#eadcbc]
        last:border-none
      "
    >

      {/* LEFT */}
      <div className="min-w-0">

        <h3
          className="
            text-[13px]
            font-semibold
            text-[#5b3925]
            truncate
          "
        >
          {title}
        </h3>

        <p
          className="
            text-[11px]
            text-[#8b7551]
            mt-1
          "
        >
          {date}
        </p>

      </div>

      {/* CATEGORY */}
      <span
        className={`
          shrink-0
          ml-2
          px-2
          py-[2px]
          rounded-full
          text-[10px]
          font-semibold

          ${categoryColors[category]}
        `}
      >
        {category}
      </span>

    </div>
  );
};

export default DeadlineItem;