import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

const categories = ["All", "Work", "Study", "Personal", "Health", "Home"];
const allTaskFilters = ["All", "Mini Tasks", "Daily Tasks", "Today's Tasks", "Repeated Tasks", "Completed", "Pending"];

const TaskBoard = ({ activeTab = "Today" }) => {
  const { user, setUser } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allTasksFilter, setAllTasksFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (id) => {
    try {
      await API.put(`/tasks/${id}/complete`);
      fetchTasks();
      const userRes = await API.get("/users/me");
      setUser(userRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      if (expandedTask && expandedTask._id === id) setExpandedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMiniTask = async (taskId, mini) => {
    try {
      await API.post(`/tasks/${taskId}/mini`, mini);
      fetchTasks();
      // Update expandedTask to show the new mini task without closing
      const res = await API.get("/tasks");
      const updatedTask = res.data.tasks.find(t => t._id === taskId);
      if (updatedTask) setExpandedTask(updatedTask);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMiniToggle = async (taskId, miniId) => {
    try {
      await API.put(`/tasks/${taskId}/mini/${miniId}/complete`);
      fetchTasks();
      const res = await API.get("/tasks");
      const updatedTask = res.data.tasks.find(t => t._id === taskId);
      if (updatedTask) setExpandedTask(updatedTask);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMiniDelete = async (taskId, miniId) => {
    try {
      await API.delete(`/tasks/${taskId}/mini/${miniId}`);
      fetchTasks();
      const res = await API.get("/tasks");
      const updatedTask = res.data.tasks.find(t => t._id === taskId);
      if (updatedTask) setExpandedTask(updatedTask);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await API.post("/tasks", newTask);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    if (selectedCategory !== "All" && activeTab !== "All Tasks") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    return filtered;
  };

  const renderTaskCard = (task) => {
    let displayReward = task.bambooReward || task.reward || 5;

    if (task.taskType === "today" && !task.completed) {
      const pendingTodayTasksCount = tasks.filter(t => t.taskType === "today" && !t.completed).length;
      const remainingPool = Math.max(0, 100 - (user?.claimedBambooToday || 0));
      if (pendingTodayTasksCount > 0) {
        displayReward = Math.floor(remainingPool / pendingTodayTasksCount);
      } else {
        displayReward = remainingPool;
      }
    }

    return (
      <TaskCard
        key={task._id}
        id={task._id}
        title={task.title}
        category={task.category}
        reward={displayReward}
        time={task.dueDate ? new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
        completed={task.completed}
        repeatFrequency={activeTab === "Repeated" || activeTab === "All Tasks" ? task.repeatFrequency : null}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    );
  };

  const renderTodayTab = () => {
    const todayTasks = getFilteredTasks().filter(t => t.taskType === "today" || t.taskType === "repeated");
    const completedCount = todayTasks.filter(t => t.completed).length;
    const totalCount = todayTasks.length;

    if (expandedTask) {
      const task = expandedTask;
      return (
        <div className="p-4">
          <button onClick={() => setExpandedTask(null)} className="text-[#6c9f43] hover:underline mb-4">← Back</button>
          <h2 className="text-[1.6vw] font-bold text-[#5b3925] mb-2">{task.title}</h2>
          <MiniTaskForm taskId={task._id} onAdd={handleAddMiniTask} />
          <div className="mt-4 flex flex-col gap-3">
            {task.miniTasks && task.miniTasks.length > 0 ? task.miniTasks.map((mini) => (
              <MiniTask key={mini._id} mini={mini} onToggleComplete={() => handleMiniToggle(task._id, mini._id)} onDelete={() => handleMiniDelete(task._id, mini._id)} />
            )) : <p className="text-[#7a5a32]">No mini tasks yet.</p>}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center mt-4 justify-between mb-1">
          <div>
            <h2 className="-mt-1 text-[1.8vw] font-bold text-[#5b3925]">Today's Tasks</h2>
            <p className="text-[1vw] text-[#7a5a32]">🌿 {completedCount} / {totalCount} tasks completed</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#67b84f] hover:bg-[#78c85d] text-white px-5 py-3 rounded-2xl font-bold shadow-md transition-all duration-300">+ Add Task</button>
        </div>

        <div className="w-[85%] h-3 bg-[#eadcbc] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#78c85d] rounded-full transition-all duration-500"
            style={{ width: `${totalCount === 0 ? 0 : (completedCount / totalCount) * 100}%` }}
          />
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                selectedCategory === category ? "bg-[#67b84f] text-white" : "bg-[#f5e7ca] text-[#7a5a32] hover:bg-[#ebd5b3]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex flex-col gap-3">
            {todayTasks.length > 0 ? todayTasks.map(task => (
              <div key={task._id} onClick={() => setExpandedTask(task)} className="cursor-pointer">
                {renderTaskCard(task)}
              </div>
            )) : <p className="text-[#7a5a32] mt-4">No tasks found for today.</p>}
          </div>
        </div>
        {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} />}
      </>
    );
  };

  const renderDailyTab = () => {
    const dailyTasks = getFilteredTasks();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return (
      <>
        <div className="flex items-center mt-4 justify-between mb-4">
          <h2 className="-mt-1 text-[1.8vw] font-bold text-[#5b3925]">Daily Plan</h2>
          <button onClick={() => setShowAddModal(true)} className="bg-[#67b84f] hover:bg-[#78c85d] text-white px-5 py-3 rounded-2xl font-bold shadow-md transition-all duration-300">+ Add Daily Task</button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex flex-col gap-6">
            {days.map((day, index) => {
              // using array index to fake days if task doesn't have a specific day set, or just filter all daily
              // For backend tasks, we might not have 'day' strictly defined. We'll just show them all in a generic list if 'day' is missing
              const dayTasks = dailyTasks.filter(t => t.taskType === "daily" && (t.day === day || (!t.day && index === 0)));
              if (dayTasks.length === 0) return null;
              return (
                <div key={day} className="flex flex-col gap-3">
                  <h3 className="text-[#8b7551] font-bold text-[14px] border-b border-[#eadcbc] pb-1 w-[75%]">{day}</h3>
                  {dayTasks.map(task => (
                    <div key={task._id}>
                      {renderTaskCard(task)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} />}
      </>
    );
  };

  const renderRepeatedTab = () => {
    const repeatedTasks = getFilteredTasks().filter(t => t.taskType === "repeated");
    return (
      <>
        <div className="flex items-center mt-4 justify-between mb-4">
          <div>
            <h2 className="-mt-1 text-[1.8vw] font-bold text-[#5b3925]">Repeated Tasks</h2>
            <p className="text-[1vw] text-[#7a5a32]">🌿 Build consistent habits</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#67b84f] hover:bg-[#78c85d] text-white px-5 py-3 rounded-2xl font-bold shadow-md transition-all duration-300">+ Add Routine</button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex flex-col gap-3">
            {repeatedTasks.length > 0 ? repeatedTasks.map(renderTaskCard) : <p className="text-[#7a5a32] mt-4">No repeated tasks found.</p>}
          </div>
        </div>
        {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} />}
      </>
    );
  };

  const renderAllTasksTab = () => {
    let filtered = tasks;
    if (allTasksFilter === "Mini Tasks") filtered = filtered.filter(t => t.miniTasks && t.miniTasks.length > 0);
    else if (allTasksFilter === "Daily Tasks") filtered = filtered.filter(t => t.taskType === "daily");
    else if (allTasksFilter === "Today's Tasks") filtered = filtered.filter(t => t.taskType === "today");
    else if (allTasksFilter === "Repeated Tasks") filtered = filtered.filter(t => t.taskType === "repeated");
    else if (allTasksFilter === "Completed") filtered = filtered.filter(t => t.completed);
    else if (allTasksFilter === "Pending") filtered = filtered.filter(t => !t.completed);

    return (
      <>
        <div className="flex items-center mt-4 justify-between mb-2">
          <h2 className="-mt-1 text-[1.8vw] font-bold text-[#5b3925]">All Tasks</h2>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap w-[85%]">
          {allTaskFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setAllTasksFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                allTasksFilter === filter ? "bg-[#5b3925] text-white shadow-sm" : "bg-[#f7e9c9]/80 text-[#7a5a32] hover:bg-[#ebd5b3]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex flex-col gap-3">
            {filtered.length > 0 ? filtered.map(renderTaskCard) : <p className="text-[#7a5a32] mt-4">No tasks match the filter.</p>}
          </div>
        </div>
        {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} />}
      </>
    );
  };

  return (
    <div className="h-full w-full px-5 py-4 flex flex-col overflow-hidden transition-opacity duration-300">
      {activeTab === "Today" && renderTodayTab()}
      {activeTab === "Daily" && renderDailyTab()}
      {activeTab === "Repeated" && renderRepeatedTab()}
      {activeTab === "All Tasks" && renderAllTasksTab()}
    </div>
  );
};

const MiniTaskForm = ({ taskId, onAdd }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd(taskId, { title, timerDuration: duration });
    setTitle("");
    setDuration(5);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
      <input type="text" placeholder="Mini task title" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-3 text-[#3e2723]" required />
      <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="rounded-2xl border border-[#d9c39a] bg-[#f8f1df]/90 py-2 px-2 text-[#3e2723]">
        <option value={5}>5 min</option>
        <option value={10}>10 min</option>
        <option value={15}>15 min</option>
      </select>
      <button type="submit" className="bg-[#67b84f] hover:bg-[#78c85d] text-white px-3 py-2 rounded-2xl font-bold">Add Mini</button>
    </form>
  );
};

const MiniTask = ({ mini, onToggleComplete, onDelete }) => {
  const [timer, setTimer] = useState(mini.timerDuration ? mini.timerDuration * 60 : 0);
  const [showFinish, setShowFinish] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (!timer) return;
    const id = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          setShowFinish(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  const startTimer = (mins) => setTimer(mins * 60);
  const extend = (mins) => setTimer((t) => t + mins * 60);

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (!mini.completed) {
      setShowConfirmModal(true);
    } else {
      onToggleComplete(mini._id);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    onToggleComplete(mini._id);
  };

  return (
    <>
      <div className="group w-[75%] bg-[#fff5df]/90 border border-[#e5d4af] rounded-2xl px-4 py-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.01] relative">
        <div className="flex items-center gap-3">
          <button onClick={handleCheckboxClick} className={`w-5 h-5 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0 ${mini.completed ? "bg-[#67b84f]" : "border-2 border-[#d9c39a]"}`}>{mini.completed && "✓"}</button>
          <div>
            <h4 className={`text-[14px] font-medium ${mini.completed ? "text-[#8b7551] line-through" : "text-[#5b3925]"}`}>{mini.title}</h4>
            <div className="flex items-center gap-2 text-[12px] text-[#8b7551] mt-1">
              <span>{mini.timerDuration} min</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {timer ? (
            <span className="text-[#5b3925] font-mono">{Math.floor(timer/60)}:{String(timer%60).padStart(2,"0")}</span>
          ) : (
            <button onClick={() => startTimer(mini.timerDuration)} className="text-[#6c9f43]">Start</button>
          )}
          {mini.completed && (
            <button onClick={(e) => { e.stopPropagation(); onDelete(mini._id); }} className="opacity-0 group-hover:opacity-100 text-[#d45d7a] hover:text-[#b83b58] p-1 rounded-full transition-all duration-300" title="Delete Mini">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          )}
        </div>
        {showFinish && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#fff5df]/90 border border-[#e5d4af] rounded-2xl p-6 w-80 text-center">
              <h3 className="text-[#5b3925] font-bold mb-3">Mini task time finished 🐼</h3>
              <button onClick={() => setShowFinish(false)} className="mr-2 px-3 py-1 bg-[#67b84f] text-white rounded">Close</button>
              <button onClick={() => { extend(5); setShowFinish(false); }} className="mr-2 px-3 py-1 bg-[#6c9f43] text-white rounded">Extend 5 min</button>
              <button onClick={() => { onToggleComplete(mini._id); setShowFinish(false); }} className="px-3 py-1 bg-[#78c85d] text-white rounded">Mark Done</button>
            </div>
          </div>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[#fff9e6] rounded-3xl p-6 w-[400px] border-4 border-[#e3d2af] shadow-2xl flex flex-col items-center">
            <h3 className="text-[18px] font-bold text-[#5b3925] text-center mb-6 leading-snug">
              Kya tu maggie ki kasam khati hai ki ye task complete hai? 🍜
            </h3>
            <div className="flex gap-4 w-full">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-[#67b84f] hover:bg-[#78c85d] text-white font-bold py-3 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                Completed
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-[#d45d7a] hover:bg-[#e26a88] text-white font-bold py-3 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBoard;