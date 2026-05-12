import useAuthStore from "../store/authStore";
import pandaLogo from "../assets/hero/health_100to50.png";

const MoodCard = () => {
  const { user } = useAuthStore();
  const level = user?.pandaLevel || 1;
  const totalHealthFed = user?.totalHealthFed || 0;
  const progress = (totalHealthFed % 500) / 500 * 100;

  return (
    <div
      className="
        h-full
        w-full
        px-5
        flex
        flex-col
      "
    >
      {/* TITLE */}
      <h2
        className="
          text-[15px]
          font-bold
          text-[#5b3925]
          mt-1
          mb-1
        "
      >
        Panda's Level
      </h2>

      {/* CONTENT */}
      <div className="flex items-center gap-3">
        {/* panda icon */}
        <img
          src={pandaLogo}
          alt="Panda Level"
          className="w-12 h-12 object-contain -ml-1"
        />

        {/* mood text and progress */}
        <div className="flex-1">
          <h3
            className="
              text-[16px]
              font-bold
              text-[#5b3925]
              leading-none
            "
          >
            Level {level}
          </h3>

          {/* Progress Bar Container */}
          <div className="mt-2">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[10px] text-[#8b7551] font-medium">Progress</span>
              <span className="text-[10px] text-[#8b7551] font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#eadcbc] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#67b84f] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p
            className="
              text-[9px]
              text-[#7a5a32]
              mt-1
              italic
              leading-none
            "
          >
            {500 - (totalHealthFed % 500)} health to next level!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;