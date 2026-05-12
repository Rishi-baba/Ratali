import { useState, useEffect } from "react";
import {
  AlarmClock,
  ClipboardCheck,
  BriefcaseBusiness,
  HeartPulse,
  Home
} from "lucide-react";
import API from "../api/axios";
import AddTaskModal from "./AddTaskModal";

const getIconAndColor = (category) => {
  switch (category) {
    case "Study": return { icon: ClipboardCheck, color: "text-[#8a5bd1]", bg: "bg-[#efe1ff]" };
    case "Work": return { icon: BriefcaseBusiness, color: "text-[#4a78c2]", bg: "bg-[#dcecff]" };
    case "Health": return { icon: HeartPulse, color: "text-[#d45d7a]", bg: "bg-[#ffdce3]" };
    case "Home": return { icon: Home, color: "text-[#c48b42]", bg: "bg-[#f5e7ca]" };
    default: return { icon: ClipboardCheck, color: "text-[#8b7551]", bg: "bg-[#f5e7ca]" };
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
};

const UpcomingDeadlinesCard = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchDeadlines = async () => {
    try {
      const res = await API.get("/tasks/deadlines");
      setDeadlines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const handleAddDeadline = async (newTask) => {
    try {
      await API.post("/tasks", newTask);
      fetchDeadlines();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="
        h-full
        w-full
        px-4
        py-3
        flex
        -mt-1
        flex-col
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          gap-2
          mb-2
          shrink-0
        "
      >

        <AlarmClock
          size={17}
          className="text-[#c48b42] shrink-0"
        />

        <h2
          className="
            text-[16px]
            font-bold
            text-[#5b3925]
            leading-none
            truncate
          "
        >
          Upcoming Deadlines
        </h2>

      </div>

      {/* SCROLL AREA */}
      <div
        className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          pr-1
          min-h-0
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        <div className="flex flex-col">

          {deadlines.length > 0 ? deadlines.map((item, index) => {
            const { icon: Icon, color, bg } = getIconAndColor(item.category);

            return (
              <div
                key={item._id || index}
                className={`
                  flex
                  items-center
                  justify-between
                  py-2

                  ${
                    index !== deadlines.length - 1
                      ? "border-b border-[#eadcbc]"
                      : ""
                  }
                `}
              >

                {/* LEFT */}
                <div className="flex items-center gap-2 min-w-0">

                  {/* ICON */}
                  <div
                    className={`
                      w-9
                      h-9
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0

                      ${item.bg}
                    `}
                  >
                    <Icon
                      size={17}
                      className={color}
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0">

                    <h3
                      className="
                        text-[13px]
                        font-semibold
                        text-[#5b3925]
                        leading-none
                        truncate
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-[11px]
                        text-[#8b7551]
                        mt-1
                        leading-none
                      "
                    >
                      {formatDate(item.dueDate)}
                    </p>

                  </div>

                </div>

                {/* CATEGORY */}
                <span
                  className={`
                    shrink-0
                    ml-2
                    px-2
                    py-[3px]
                    rounded-full
                    text-[10px]
                    font-semibold

                    ${bg}
                    ${color}
                  `}
                >
                  {item.category}
                </span>

              </div>
            );
          }) : (
            <p className="text-[12px] text-[#8b7551] text-center mt-4">No upcoming deadlines.</p>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <button
        onClick={() => setShowAddModal(true)}
        className="
          mt-2
          text-[12px]
          font-bold
          text-[#5b3925]
          hover:text-[#67b84f]
          transition-all
          duration-300
          self-center
          shrink-0
        "
      >
        + Add Deadline
      </button>

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAddTask={handleAddDeadline}
        />
      )}
    </div>
  );
};

export default UpcomingDeadlinesCard;