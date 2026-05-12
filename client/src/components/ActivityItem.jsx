const ActivityItem = ({
  image,
  title,
  happiness,
  duration,
  cost,
  onClick
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        py-2
        border-b
        border-[#e7d8ba]
        last:border-none
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-0">

        {/* icon */}
        <div
          className="
            w-9.5
            h-9.5
            rounded-xl
            overflow-hidden
            shrink-0
            bg-[#f4e8cd]
            border
            border-[#e3d2af]
          "
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* text */}
        <div className="min-w-0">

          <h3
            className="
              text-[13px]
              font-semibold
              text-[#5b3925]
              leading-tight
              truncate
            "
          >
            {title}
          </h3>

          <p
            className="
              text-[11px]
              text-[#69b34c]
              mt-0.5
              font-medium
            "
          >
            +{happiness} Happiness
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 shrink-0 ">

        <span
          className="
            text-[11px]
            text-[#69a85b]
            font-semibold
            leading-none
          "
        >
          {duration && `${duration} min `}
          {cost !== undefined && `(-${cost}🎋)`}
        </span>


        <button
          onClick={onClick}
          className="
            w-8
            h-8
            rounded-full
            bg-[#53af43]
            hover:bg-[#63bc53]
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-300
            shadow-md
            text-[12px]
          "
        >
          ▶
        </button>

      </div>

    </div>
  );
};

export default ActivityItem;