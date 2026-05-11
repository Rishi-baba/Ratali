import CareTaskItem from "./CareTaskItem";

const tasks = [
  {
    id: 1,
    title: "Feed Panda",
    completed: true,
  },
  {
    id: 2,
    title: "Play Together",
    completed: true,
  },
  {
    id: 3,
    title: "Clean & Tidy",
    completed: true,
  },
  {
    id: 4,
    title: "Nap Time",
    completed: false,
    progress: "0/1",
  },
];

const DailyCareCard = () => {
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
          />
        ))}

      </div>

    </div>
  );
};

export default DailyCareCard;