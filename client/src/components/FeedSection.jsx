import { useState } from "react";
import FoodItem from "./FoodItem";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

const foods = [
  { id: 1, name: "Bamboo Stick", amount: 10, image: "https://cdn-icons-png.flaticon.com/128/2909/2909767.png" },
  { id: 2, name: "Apple", amount: 20, image: "https://cdn-icons-png.flaticon.com/128/415/415733.png" },
  { id: 3, name: "Peach", amount: 30, image: "https://cdn-icons-png.flaticon.com/128/3194/3194766.png" },
  { id: 4, name: "Carrot", amount: 15, image: "https://cdn-icons-png.flaticon.com/128/2224/2224301.png" },
  { id: 5, name: "Honey Bowl", amount: 50, image: "https://cdn-icons-png.flaticon.com/128/2674/2674505.png" },
  { id: 6, name: "Sushi Roll", amount: 80, image: "https://cdn-icons-png.flaticon.com/128/1047/1047711.png" },
  { id: 7, name: "Golden Bamboo", amount: 100, image: "https://cdn-icons-png.flaticon.com/128/590/590685.png" },
];

const FeedSection = ({ onAction }) => {
  const { user, setUser } = useAuthStore();
  const [selectedFoodId, setSelectedFoodId] = useState(1);
  const [isFeeding, setIsFeeding] = useState(false);

  const selectedFood = foods.find(f => f.id === selectedFoodId);

  const handleFeed = async () => {
    if (!selectedFood || isFeeding) return;
    setIsFeeding(true);
    try {
      const res = await API.post("/users/feed", { healthAmount: selectedFood.amount, cost: selectedFood.amount });
      setUser(res.data);
      if (onAction) onAction("eatingbamboo");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to feed panda");
    } finally {
      setIsFeeding(false);
    }
  };

  return (
    <div className="h-full w-full px-4 py-3 flex flex-col overflow-hidden">

      {/* top */}
      <div className="flex items-start justify-between mb-3">

        <div>
          <h2
            className="
              text-[1.4vw]
              font-bold
              mt-1
              ml-1
              text-[#5b3925]
              leading-none
            "
          >
            Feed Your Panda
          </h2>

          <p
            className="
              text-[0.9vw]
              mt-1
              ml-1
              text-[#7a5a32]
              
            "
          >
            Delicious food makes Panda super happy!
          </p>
        </div>

        {/* health */}
        <div className="flex flex-row items-center gap-2">

          

          <div className="text-right mt-1 mr-2 bg-[#f7e9c9]/90 rounded-xl px-3 py-2 flex">
            <p className="text-[1vw]  font-semibold text-[#5b3925]">
             ❤️ Total Fed -
            </p>

            <p className="text-[0.9vw] text-[#5b3925] mt-0.5 ml-1">
              {user?.totalHealthFed || 0}
            </p>
          </div>

        </div>

      </div>

      {/* food row */}
      <div
        className="
          flex
          flex-nowrap
          gap-2
          overflow-x-auto
          overflow-y-hidden
          w-full
          pb-2
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {foods.map((food) => (
          <div key={food.id} onClick={() => setSelectedFoodId(food.id)}>
            <FoodItem
              image={food.image}
              name={food.name}
              amount={food.amount}
              selected={food.id === selectedFoodId}
            />
          </div>
        ))}
      </div>

      {/* bottom */}
      <div className="mt-1 flex items-center justify-around">

        {/* tip */}
        <div
          className="
            bg-[#f7e9c9]/90
            rounded-xl
            px-3
            py-2
            text-[0.9vw]
            text-[#7a5a32]
            whitespace-nowrap
          "
        >
          🐼 Tip: Keep your panda happy to get focus boost!
        </div>

        {/* feed button */}
        <button
          onClick={handleFeed}
          disabled={isFeeding}
          className="
            bg-[#4fa63f]
            hover:bg-[#5ab748]
            text-white
            px-8
            py-2
            rounded-2xl
            font-bold
            text-[1vw]
            shadow-lg
            transition-all
            duration-300
            whitespace-nowrap
            disabled:opacity-50
          "
        >
          {isFeeding ? "Feeding..." : `Feed (Cost: ${selectedFood?.amount || 0} 🎋)`}
        </button>

      </div>

    </div>
  );
};

export default FeedSection;