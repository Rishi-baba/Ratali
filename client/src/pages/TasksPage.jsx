import { useState } from "react";
import frameImage from "../assets/tasks-bg.jpg";
import DailyMissionCard from "../components/DailyMissionCard";
import ProductivityTipCard from "../components/ProductivityTipCard";
import Sidebar from "../components/Sidebar";
import TaskBoard from "../components/TaskBoard";
import TasksHeader from "../components/TasksHeader";
import TaskSummaryCard from "../components/TaskSummaryCard";
import TodaysFocusCard from "../components/TodaysFocusCard";
import UpcomingDeadlinesCard from "../components/UpcomingDeadlinesCard";

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState("Today");
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">

      <div className="relative w-full max-w-400">

        {/* FRAME IMAGE */}
        <img
          src={frameImage}
          alt="Tasks Page"
          className="w-full h-auto object-contain"
        />

        {/* LEFT SIDEBAR */}
        <div className="absolute top-[7%] left-[1%] w-[11%] h-[17%]  rounded-xl">
          <Sidebar />
        </div>

        {/* TOP HEADER */}
        <div className="absolute top-[4%] left-[16%] w-[64%] h-[10%] z-20">
          <TasksHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* MAIN TASK BOARD */}
        <div className="absolute top-[17%] left-[16%] w-[64%] h-[64%] z-20">
          <TaskBoard activeTab={activeTab} />
        </div>

        {/* BOTTOM STATS */}
        <div className="absolute top-[83%] left-[16%] w-[20%] h-[12%] z-20">
          <DailyMissionCard></DailyMissionCard> 
        </div>

        {/* RIGHT TOP */}
        <div className="absolute top-[9%] right-[1%] w-[18%] h-[22%] z-20">
          <TaskSummaryCard />
        </div>

        {/* RIGHT MID */}
        <div className="absolute top-[33%] right-[1%] w-[18%] h-[25%] z-20">
          <UpcomingDeadlinesCard />
        </div>

        {/* RIGHT LOWER */}
        <div className="absolute top-[61%] right-[1%] w-[18%] h-[17%] z-20">
          <ProductivityTipCard />
        </div>

        {/* RIGHT BOTTOM */}
        <div className="absolute top-[81%] right-[1%] w-[18%] h-[14%] z-20">
          <TodaysFocusCard />
        </div>
      </div>

    </div>
  );
};

export default TasksPage;