import {
  LayoutDashboard,
  CheckSquare,
  Brain,
} from "lucide-react";

import SidebarButton from "./SidebarButton";

const Sidebar = ({ className }) => {
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
          active
        />

        <SidebarButton
          icon={<CheckSquare size={20} />}
          label="Tasks"
        />

        <SidebarButton
          icon={<Brain size={20} />}
          label="Dashboard"
        />

      </div>

    </div>
  );
};

export default Sidebar;