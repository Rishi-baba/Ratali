import pandaImage from "../assets/study-panda.png";

const ProductivityTipCard = () => {
  return (
    <div
      className="
        h-full
        w-full
        px-4
        ml-3
        flex
        flex-col
        justify-between
        overflow-hidden
      "
    >

      {/* TITLE */}
      <h2
        className="
          
          text-[1.3vw]
          font-bold
          text-[#5b3925]
          leading-none
        "
      >
        Productivity Tip
      </h2>

      {/* CONTENT */}
      <div className="flex items-center gap-3 mt-1">

        {/* TEXT */}
        <div className="flex-1">

          <p
            className="
              text-[0.9vw]
              text-[#7a5a32]
              leading-snug
            "
          >
            Break big tasks into smaller steps and take breaks!
          </p>

          <button
            className="
              mt-3
              bg-[#67b84f]
              hover:bg-[#78c85d]
              text-white
              text-[0.8vw]
              font-bold
              px-3
              py-2
              rounded-xl
              transition-all
              duration-300
            "
          >
            Try Focus Mode
          </button>

        </div>

        {/* PANDA */}
        <img
          src={pandaImage}
          
          alt="Study Panda"
          className="
            -mt-2
            w-[75px]
            object-contain
            shrink-0
          "
        />

      </div>

    </div>
  );
};

export default ProductivityTipCard;