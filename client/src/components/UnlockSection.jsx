import UnlockItem from "./UnlockItem";

const items = [
  {
    id: 1,
    title: "Hammock",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400",
  },
  {
    id: 2,
    title: "Water Fountain",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=400",
  },
  {
    id: 3,
    title: "Cozy Tent",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400",
  },
  {
    id: 4,
    title: "Bamboo Chair",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=400",
  },
  {
    id: 5,
    title: "Lantern Lights",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400",
  },
  {
    id: 6,
    title: "Flower Garden",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400",
  },
];

const UnlockSection = () => {
  return (
    <div
      className="
        h-full
        w-full
        px-3
        py-2
        flex
        items-center
        gap-3
        overflow-hidden
      "
    >

      {/* LEFT CTA */}
      <div className="shrink-0 ml-3 mt-1 w-36.25">

        <h2
          className="
            text-[14px]
            font-bold
            text-[#5b3925]
            leading-none
          "
        >
          Unlock More Fun!
        </h2>

        <p
          className="
            text-[10px]
            text-[#7a5a32]
            mt-1
            leading-snug
          "
        >
          Upgrade your Panda's room and unlock new items!
        </p>

        <button
          className="
            mt-3
            bg-[#4fa63f]
            hover:bg-[#5ab748]
            text-white
            px-5
            py-1.5
            rounded-2xl
            text-[12px]
            font-bold
            shadow-md
            transition-all
            duration-300
          "
        >
          Visit Shop
        </button>

      </div>

      {/* ITEMS */}
      <div
        className="
          flex
          gap-2
          overflow-x-auto
          overflow-y-hidden
          flex-1
          pb-1
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>

        {items.map((item) => (
          <UnlockItem
            key={item.id}
            title={item.title}
            image={item.image}
          />
        ))}

      </div>

    </div>
  );
};

export default UnlockSection;