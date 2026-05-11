import { useState } from "react";
import { X } from "lucide-react";

/**
 * AddTaskModal – a cozy fantasy modal for creating new tasks.
 * It receives `onClose` and `onAddTask` callbacks.
 */
const AddTaskModal = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [type, setType] = useState("today"); // today, daily, repeated
  const [reward, setReward] = useState(5);
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [repeatFrequency, setRepeatFrequency] = useState("Daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const newTask = {
      title,
      category,
      bambooReward: reward,
      dueDate: time,
      description,
      completed: false,
      taskType: type,
      repeatFrequency: type === "repeated" ? repeatFrequency : null,
    };
    onAddTask(newTask);
    // reset fields
    setTitle("");
    setCategory("Work");
    setType("today");
    setReward(5);
    setTime("");
    setDescription("");
    setRepeatFrequency("Daily");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {/* Fade/scale animation */}
      <div className="animate-appear-slow bg-[#fff5df]/90 border border-[#e5d4af] rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#8b7551] hover:text-[#5b3925]"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-[#5b3925] mb-4 text-center">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723] focus:border-[#6c9f43]"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]"
          >
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]"
          >
            <option value="today">Today Task</option>
            <option value="daily">Daily Task</option>
            <option value="repeated">Repeated Task</option>
          </select>
          {type === "repeated" && (
            <select
              value={repeatFrequency}
              onChange={(e) => setRepeatFrequency(e.target.value)}
              className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          )}
          <input
            type="number"
            placeholder="Bamboo reward"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
            className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]"
            min={0}
          />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]"
          />
          <textarea
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]"
          />
          <button
            type="submit"
            className="w-full bg-[#67b84f] hover:bg-[#78c85d] text-white py-2 rounded-2xl font-bold transition-all duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
