const PandaHero = ({
  pandaImage,
}) => {
  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-hidden
      "
    >

      {/* TOP TITLE */}
      <div
        className="
          absolute
          top-[2%]
          left-1/2
          -translate-x-1/2
          w-[58%]
          h-[15%]
          flex
          flex-col
          items-center
          justify-center
          shadow-xl
          z-30
        "
      >

        <h1
          className="
            text-[22px]
            font-bold
            text-[#f8e7c5]
            leading-none
          "
        >
          Panda Feeding & Chilling Zone
        </h1>

        <p
          className="
            text-[10px]
            text-[#e7c89a]
            mt-2
          "
        >
          Happy Panda = More Focus + More Bamboo!
        </p>

      </div>

      

      {/* HEALTH CARD */}
      <div
        className="
          absolute
          top-[8%]
          right-[2%]
          w-45
          bg-[#fae3a9]
          rounded-3xl
          border-2
          border-[#dcc79d]
          px-6
          py-4
          shadow-lg
          z-19
        "
      >

        <div className="flex items-center -m-2 justify-between">

          <div>
            <h3
              className="
                text-[14px]
                font-bold
                text-[#5b3925]
              "
            >
              Panda Health
            </h3>

            <p
              className="
                text-[10px]
                text-[#7a5a32]
                mt-1
              "
            >
              So healthy!
            </p>
          </div>

          <div className="text-[40px]">
            😊
          </div>

        </div>

        {/* progress */}
        <div className="mt-3">

          <div className="flex justify-between mb-1">

            <span
              className="
                text-[12px]
                text-[#5b3925]
                font-semibold
              "
            >
              Health
            </span>

            <span
              className="
                text-[12px]
                text-[#5b3925]
                font-bold
              "
            >
              85%
            </span>

          </div>

          <div
            className="
              w-full
              h-3
              rounded-full
              bg-[#eadcbc]
              overflow-hidden
            "
          >
            <div
              className="
                h-full
                w-[85%]
                bg-[#82d85f]
                rounded-full
              "
            />
          </div>

        </div>

      </div>

      {/* BAMBOO COUNT */}
      <div
        className="
          absolute
          top-[55%]
          right-[3%]
          bg-[#3b2417]/90
          border-2
          border-[#6a432c]
          rounded-full
          px-5
          py-2
          flex
          items-center
          gap-3
          shadow-lg
          z-30
        "
      >

        <span className="text-[16px]">
          🎋
        </span>

        <div className="leading-none">

          <p
            className="
              text-[12px]
              font-bold
              text-[#f8e7c5]
            "
          >
            1,250
          </p>

          <p
            className="
              text-[8px]
              text-[#d9b98c]
              mt-1
            "
          >
            Bamboo
          </p>

        </div>

      </div>

      {/* SPEECH BUBBLE */}
      <div
        className="
          absolute
          left-[23%]
          top-[38%]
          bg-[#fff7e8]
          px-4
          py-3
          rounded-[28px]
          shadow-lg
          z-30
        "
      >

        <p
          className="
            text-[15px]
            text-[#5b3925]
            font-semibold
            leading-snug
          "
        >
          Mmm...
          <br />
          yummy
          <br />
          bamboo!
        </p>

        {/* tail */}
        <div
          className="
            absolute
            -bottom-2
            left-7
            w-4
            h-4
            rotate-45
            bg-[#fff7e8]
          "
        />

      </div>

      {/* PANDA */}
      <img
        src={pandaImage}
        alt="Panda"
        className="
          absolute
          bottom-[2%]
          left-1/2
          -translate-x-1/2
          w-[34%]
          object-contain
          z-20
          drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]
          animate-[float_4s_ease-in-out_infinite]
        "
      />

    </div>
  );
};

export default PandaHero;