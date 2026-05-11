const UnlockItem = ({
  image,
  title,
  locked = true,
}) => {
  return (
    <div
      className="
        relative
        w-23.75
        h-17.5
        shrink-0
        rounded-2xl
        overflow-hidden
        border
        border-[#5d4428]
        bg-[#2d2014]
      "
    >

      {/* image */}
      <img
        src={image}
        alt={title}
        className="
          w-full
          h-full
          object-cover
        "
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* title */}
      <div
        className="
          absolute
          bottom-1
          left-2
          right-2
        "
      >
        <p
          className="
            text-[10px]
            text-white
            font-semibold
            truncate
          "
        >
          {title}
        </p>
      </div>

      {/* lock */}
      {locked && (
        <div
          className="
            absolute
            bottom-1
            right-1
            w-4
            h-4
            rounded-full
            bg-black/70
            text-white
            text-[8px]
            flex
            items-center
            justify-center
          "
        >
          🔒
        </div>
      )}

    </div>
  );
};

export default UnlockItem;