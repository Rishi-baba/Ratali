import pandaImage from "../assets/focus-panda.png";

const tabs = [
  "Today",
  "Daily",
  "Repeated",
  "All Tasks",
];

const TasksHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div
      className="
        h-full
        w-full
        flex
        items-center
        justify-between
        gap-5
      "
    >

      {/* LEFT */}
      <div className="flex flex-col justify-center">

        {/* TITLE */}
        <div>

          <h1
            className="
              text-[38px]
              font-bold
              text-[#fff5df]
              drop-shadow-md
              leading-none
            "
          >
            My Tasks 🌿
          </h1>

        </div>

        {/* TABS */}
        <div
          className="
            mt-7
            ml-3
            -mb-4
            flex
            items-center
            gap-3
          "
        >

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab && setActiveTab(tab)}
              className={`
                px-5
                py-2
                rounded-2xl
                text-[14px]
                font-semibold
                transition-all
                duration-300

                ${
                  activeTab === tab
                    ? "bg-[#79c85d] text-white shadow-md"
                    : "bg-[#4b2d1d]/80 text-[#f7e8cb] hover:bg-[#5b3925]/90"
                }
              `}
            >
              {tab}
            </button>
          ))}

        </div>

      </div>

      {/* RIGHT QUOTE CARD */}
      <div
        className="
          mt-17
          mr-3
          rounded-3xl
          px-4
          py-2
          flex
          items-center
          gap-4
          border
          border-[#eadcbc]
          shadow-md
          max-w-[150px]
        "
      >

        {/* TEXT */}
        <div>

          <p
            className="
              text-[12px]
              font-semibold
              text-[#5b3925]
              leading-snug
            "
          >
            Focus on progress,
            not perfection.
          </p>

        </div>

        

      </div>

    </div>
  );
};

export default TasksHeader;