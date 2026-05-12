import motivationImg from "../assets/custom/motivation.jpg";

const TaskSummaryCard = () => {
  return (
    <div
      className="
        h-[90%]
        w-[93%]
        ml-3
        mt-1
        flex
        flex-col
        overflow-hidden
        rounded-2xl
      "
    >
      <img 
        src={motivationImg} 
        alt="Motivation" 
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
};

export default TaskSummaryCard;