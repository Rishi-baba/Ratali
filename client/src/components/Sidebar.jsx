import {
  LayoutDashboard,
  CheckSquare,
  Brain,
} from "lucide-react";
import { useLocation } from "react-router-dom";

import SidebarButton from "./SidebarButton";

const Sidebar = ({ className }) => {
  const location = useLocation();

  return (
    <div
      className={`
        h-full
        w-full
        flex
        flex-col
        px-3
        ${className}
      `}
    >

      <div className="h-full w-full flex flex-col justify-evenly">

        <SidebarButton
          icon={<LayoutDashboard size={20} />}
          label="Panda"
          path="/panda-zone"
          active={location.pathname === "/panda-zone"}
        />

        <SidebarButton
          icon={<CheckSquare size={20} />}
          label="Tasks"
          path="/tasks"
          active={location.pathname === "/tasks"}
        />

        <SidebarButton
          icon={<Brain size={20} />}
          label="Focus"
          path="/dashboard"
          active={location.pathname === "/dashboard"}
        />

      </div>

    </div>
  );
};

export default Sidebar;