import { useState } from "react";
import ActivityItem from "./ActivityItem";
import useAuthStore from "../store/authStore";
import API from "../api/axios";

const activities = [
  {
    id: 1,
    title: "Watch YT Shorts",
    cost: 50,
    duration: 10,
    happiness: 10,
    actionName: "yt",
    image: "https://cdn-icons-png.flaticon.com/128/1384/1384060.png",
  },
  {
    id: 2,
    title: "Talk to RJ",
    cost: 0,
    happiness: 5,
    actionName: "rj",
    image: "https://cdn-icons-png.flaticon.com/128/3659/3659784.png",
  },
  {
    id: 3,
    title: "Buy Maggie",
    cost: 200,
    happiness: 20,
    actionName: "maggie",
    image: "https://cdn-icons-png.flaticon.com/128/2927/2927347.png",
  },
  {
    id: 4,
    title: "Buy Momos",
    cost: 200,
    happiness: 20,
    actionName: "momos",
    image: "https://cdn-icons-png.flaticon.com/128/742/742920.png",
  },
  {
    id: 5,
    title: "Buy Pizza",
    cost: 500,
    happiness: 50,
    actionName: "pizzaEat",
    image: "https://cdn-icons-png.flaticon.com/128/628/628324.png",
  },
];

const ChillActivities = ({ onAction }) => {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleActionClick = async (activity) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await API.post("/users/action", { 
        action: activity.actionName, 
        cost: activity.cost, 
        healthAmount: activity.happiness 
      });
      setUser(res.data);
      if (onAction) onAction(activity.actionName);
    } catch (err) {
      alert(err.response?.data?.message || `Failed to perform ${activity.title}`);
    } finally {
      setLoading(false);
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
        flex-col
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div className="mb-2 ml-2 shrink-0">

        <h2
          className="
            text-[1.3vw]
            font-bold
            text-[#5b3925]
            leading-none
          "
        >
          Chill Activities
        </h2>

        <p
          className="
            text-[1vw]
            text-[#7a5a32]
            mt-1
          "
        >
          Do fun things together!
        </p>

      </div>

      {/* SCROLLABLE LIST */}
      <div
        className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          pr-1
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex flex-col">

          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              image={activity.image}
              title={activity.title}
              happiness={activity.happiness}
              duration={activity.duration}
              cost={activity.cost}
              onClick={() => handleActionClick(activity)}
            />
          ))}

        </div>
      </div>

    </div>
  );
};

export default ChillActivities;