import useAuthStore from "../store/authStore";

const UnlockSection = () => {
  const { user } = useAuthStore();

  const inventory = [
    {
      id: "pizza",
      title: "Pizza",
      count: user?.foodInventory?.pizza || 0,
      image: "https://cdn-icons-png.flaticon.com/128/628/628324.png",
    },
    {
      id: "momos",
      title: "Momos",
      count: user?.foodInventory?.momos || 0,
      image: "https://cdn-icons-png.flaticon.com/128/742/742920.png",
    },
    {
      id: "maggie",
      title: "Maggie",
      count: user?.foodInventory?.maggie || 0,
      image: "https://cdn-icons-png.flaticon.com/128/2927/2927347.png",
    },
  ];

  return (
    <div
      className="
        h-full
        w-full
        px-3
        py-2
        flex
        items-center
        gap-6
        overflow-hidden
      "
    >
      {/* LEFT CTA */}
      <div className="shrink-0 ml-3 mt-1 w-36">
        <h2 className="text-[14px] font-bold text-[#5b3925] leading-none">
          Food Inventory
        </h2>
        <p className="text-[10px] text-[#7a5a32] mt-1 leading-snug">
          Count of special treats you bought for the panda!
        </p>
      </div>

      {/* ITEMS */}
      <div
        className="
          flex
          gap-4
          overflow-x-auto
          overflow-y-hidden
          flex-1
          pb-1
          items-center
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {inventory.map((item) => (
          <div key={item.id} className="flex flex-col items-center justify-center bg-[#f4e8cd] rounded-xl border-2 border-[#e3d2af] p-2 w-20 shadow-sm relative transition-transform hover:scale-105">
            <img src={item.image} alt={item.title} className="w-8 h-8 object-contain mb-1 drop-shadow-md" />
            <span className="text-[11px] font-bold text-[#5b3925] text-center leading-none">{item.title}</span>
            <div className="absolute -top-2 -right-2 bg-[#ff5722] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnlockSection;