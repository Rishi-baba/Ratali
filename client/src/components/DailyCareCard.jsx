import { useState } from "react";
import CareTaskItem from "./CareTaskItem";
import useAuthStore from "../store/authStore";
import API from "../api/axios";

const DailyCareCard = ({ onAction }) => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleTask = async (action, cost, healthAmount) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await API.post("/users/action", { action, cost, healthAmount });
      setUser(res.data);
      if (onAction) onAction(action === "nap" ? "sleeping" : action);
    } catch (err) {
      alert(err.response?.data?.message || `Failed to perform ${action}`);
    } finally {
      setLoading(false);
    }
  };

  const tasks = [
    {
      id: 1,
      title: "Bath Panda (10 🎋)",
      completed: user?.bathDoneToday || false,
      onClick: () => handleTask("bath", 10, 10),
      progress: "+10% ❤️"
    },
    {
      id: 2,
      title: "Nap Time (10 🎋)",
      completed: user?.napDoneToday || false,
      onClick: () => handleTask("nap", 10, 10),
      progress: "+10% ❤️"
    }
  ];

  return (
    <div
      className="
        h-full
        w-full
        px-4
        py-3

      "
    >

      {/* TITLE */}
      <h2
        className="
          text-[15px]
          font-bold
          text-[#5b3925]
          mb-2
        "
      >
        Daily Care
      </h2>

      {/* TASK LIST */}
      <div className="flex -mt-1 flex-col">

        {tasks.map((task) => (
          <CareTaskItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            progress={task.progress}
            onClick={task.onClick}
          />
        ))}

      </div>

    </div>
  );
};

export default DailyCareCard;