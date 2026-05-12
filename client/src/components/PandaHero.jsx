import API from "../api/axios";
import useAuthStore from "../store/authStore";

const PandaHero = ({
  pandaImage,
  currentHealth = 100,
}) => {
  const { user, setUser } = useAuthStore();

  const handleRevive = async () => {
    try {
      const res = await API.post("/users/action", { action: "revive" });
      setUser(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to revive");
    }
  };

  let healthStatus = "Healthy";
  if (currentHealth <= 0) healthStatus = "Dead";
  else if (currentHealth < 20) healthStatus = "Critical";
  else if (currentHealth < 40) healthStatus = "Weak";
  else if (currentHealth < 60) healthStatus = "Fine";
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
              className={`text-[10px] mt-1 font-semibold ${currentHealth <= 20 ? 'text-red-500 animate-pulse' : 'text-[#7a5a32]'}`}
            >
              {healthStatus}
            </p>
          </div>

          <div className="text-[40px]">
            {currentHealth > 50 ? "😊" : currentHealth > 0 ? "😰" : "💀"}
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
              {Math.round(currentHealth)}%
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
              className={`h-full rounded-full transition-all duration-1000 ${currentHealth <= 20 ? 'bg-red-500' : 'bg-[#82d85f]'}`}
              style={{ width: `${currentHealth}%` }}
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
            {user?.bamboo || 0}
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
          left-[15%]
          top-[32%]
          bg-[#fff7e8]/90
          backdrop-blur-sm
          px-5
          py-3.5
          rounded-[30px]
          shadow-xl
          z-30
          border border-white/20
        "
      >
        <p
          className="
            text-[15px]
            text-[#5b3925]
            font-bold
            leading-snug
          "
        >
          {(() => {
            if (currentHealth <= 0) return "Zzz... panda gave up 😵‍💫";
            if (currentHealth <= 10) return "Panda almost eepy 🥱";
            if (currentHealth <= 20) return "Paws too tireddd... 🐾";
            if (currentHealth <= 30) return "My bamboo is fading... 🥀";
            if (currentHealth <= 40) return "Panda feeling lonely 🥺";
            if (currentHealth <= 50) return "Let’s focus together 🎯";
            if (currentHealth <= 60) return "Getting a lil sleepy... 💤";
            if (currentHealth <= 70) return "Tiny panda needs hugs 🫂";
            if (currentHealth <= 80) return "You’re doing great! ✨";
            if (currentHealth <= 90) return "So much bamboo energy! 🎋";
            return "Panda super happy! 🐼";
          })()}
        </p>

        {/* tail */}
        <div
          className="
            absolute
            -bottom-2
            right-[15%]
            w-5
            h-5
            rotate-45
            bg-[#fff7e8]/90
            -z-10
            shadow-lg
          "
        />
      </div>

      {currentHealth <= 0 && (
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
          <p className="text-red-500 font-bold bg-white/80 px-4 py-2 rounded-xl mb-2 shadow animate-pulse">Panda is Dead! (Needs 500 🎋)</p>
          <button onClick={handleRevive} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95">
            Revive Panda
          </button>
        </div>
      )}

      {/* PANDA */}
      <img
        src={pandaImage}
        alt="Panda"
        className="
          absolute
          bottom-[2%]
          left-1/2
          -translate-x-1/2
          w-[23%]
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