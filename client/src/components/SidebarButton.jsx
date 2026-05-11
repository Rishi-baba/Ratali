import { useNavigate } from "react-router-dom";

const SidebarButton = ({
  icon,
  label,
  active = false,
  path
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => path && navigate(path)}
      className={`
        relative
        w-full
        flex
        items-center
        gap-3
        px-2
        py-3
        rounded-2xl
        transition-all
        duration-300

        ${
          active
            ? "text-white"
            : "text-[#876957] hover:text-white hover:translate-x-1 "
        }
      `}
    >
      <div className="shrink-0">
        {icon}
      </div>

      <span className="text-sm font-medium truncate">
        {label}
      </span>

      {/* active underline */}
      {active && (
        <div
          className="
            absolute
            bottom-1
            left-2
            h-0.75
            w-[32%]
            rounded-full
            bg-[#d7ff75]
            shadow-[0_0_10px_#d7ff75]
          "
        />
      )}
    </button>
  );
};

export default SidebarButton;