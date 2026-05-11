const FoodItem = ({
  image,
  name,
  amount,
  selected = false,
}) => {
  return (
    <button
      className={`
        relative
        w-17
        h-20.5
        shrink-0
        rounded-[18px]
        border
        flex
        flex-col
        items-center
        justify-center
        transition-all
        duration-300

        ${
          selected
            ? "bg-[#eef6d3] border-[#69b34c]"
            : "bg-[#f7ecd7]/90 border-[#e5d2ad]"
        }
      `}
    >
      {/* selected check */}
      {selected && (
        <div
          className="
            absolute
            top-1.5
            right-1.5
            w-4
            h-4
            rounded-full
            bg-[#69b34c]
            text-white
            text-[9px]
            flex
            items-center
            justify-center
          "
        >
          ✓
        </div>
      )}

      {/* image */}
      <img
        src={image}
        alt={name}
        className="w-8 h-8 object-contain mb-1"
      />

      {/* title */}
      <p
        className="
          text-[0.9vw]
          font-semibold
          text-[#5b3925]
          leading-none
        "
      >
        {name}
      </p>

      {/* amount */}
      <p
        className="
          text-[0.8vw]
          text-[#7a5a32]
          mt-1
        "
      >
        +{amount} ⚡
      </p>
    </button>
  );
};

export default FoodItem;