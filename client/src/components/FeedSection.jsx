import FoodItem from "./FoodItem";

const foods = [
  {
    id: 1,
    name: "Bamboo",
    amount: 15,
    image:
      "https://cdn-icons-png.flaticon.com/128/2909/2909767.png",
  },
  {
    id: 2,
    name: "Apple",
    amount: 10,
    image:
      "https://cdn-icons-png.flaticon.com/128/415/415733.png",
  },
  {
    id: 3,
    name: "Peach",
    amount: 12,
    image:
      "https://cdn-icons-png.flaticon.com/128/3194/3194766.png",
  },
  {
    id: 4,
    name: "Carrot",
    amount: 8,
    image:
      "https://cdn-icons-png.flaticon.com/128/2224/2224301.png",
  },
  {
    id: 5,
    name: "Cookies",
    amount: 7,
    image:
      "https://cdn-icons-png.flaticon.com/128/1047/1047711.png",
  },
  {
    id: 6,
    name: "Honey",
    amount: 10,
    image:
      "https://cdn-icons-png.flaticon.com/128/2674/2674505.png",
  },
  {
    id: 7,
    name: "Berry",
    amount: 5,
    image:
      "https://cdn-icons-png.flaticon.com/128/590/590685.png",
  },
];

const FeedSection = () => {
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
             ❤️ Health Rest -
            </p>

            <p className="text-[0.9vw] text-[#5b3925] mt-0.5 ml-1">
              12
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
          <FoodItem
            key={food.id}
            image={food.image}
            name={food.name}
            amount={food.amount}
            selected={food.id === 1}
          />
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
          "
        >
          Feed ❤️
        </button>

      </div>

    </div>
  );
};

export default FeedSection;