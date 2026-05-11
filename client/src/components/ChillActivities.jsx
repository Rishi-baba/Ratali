import ActivityItem from "./ActivityItem";

const activities = [
  {
    id: 1,
    title: "Watch Fireflies",
    happiness: 10,
    duration: 10,
    image:
      "https://cdn-icons-png.flaticon.com/128/869/869869.png",
  },
  {
    id: 2,
    title: "Listen to Music",
    happiness: 8,
    duration: 10,
    image:
      "https://cdn-icons-png.flaticon.com/128/3659/3659784.png",
  },
  {
    id: 3,
    title: "Bubble Bath",
    happiness: 15,
    duration: 15,
    image:
      "https://cdn-icons-png.flaticon.com/128/2927/2927347.png",
  },
  {
    id: 4,
    title: "Nap Time",
    happiness: 12,
    duration: 20,
    image:
      "https://cdn-icons-png.flaticon.com/128/742/742920.png",
  },
  {
    id: 5,
    title: "Forest Walk",
    happiness: 18,
    duration: 25,
    image:
      "https://cdn-icons-png.flaticon.com/128/628/628324.png",
  },
];

const ChillActivities = () => {
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
            />
          ))}

        </div>
      </div>

    </div>
  );
};

export default ChillActivities;