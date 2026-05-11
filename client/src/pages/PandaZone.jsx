import React from "react";
import bgImage from "../assets/panda.jpg";
import OverlayCard from "../components/OverlayCard";
import Sidebar from "../components/Sidebar";
import FeedSection from "../components/FeedSection";
import ChillActivities from "../components/ChillActivities";
import MoodCard from "../components/MoodCard";
import DailyCareCard from "../components/DailyCareCard";
import UnlockSection from "../components/UnlockSection";
import midImage from "../assets/mid.jpg";
import bottomImage from "../assets/btm.jpg";
import cutie from "../assets/cutie.jpg";
import last from "../assets/last.jpg";
import PandaHero from "../components/PandaHero";
import pandaHero from "../assets/pandaHero.png";


const PandaZone = () => {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center ">

      <div className="relative w-full max-w-400">

        <img
          src={bgImage}
          alt="Panda Zone"
          className="w-full h-auto object-contain"
        />

        {/* <div className="absolute inset-0 bg-black/25 rounded-3xl"></div> */}

        {/* left sidebar */}

        <div className="absolute top-[4.3%] left-[1%] w-[12%] h-[22%] ">

          <Sidebar></Sidebar>

        </div>


        <div className="absolute top-[67%] left-[1%] w-[12%] h-[16%] rounded-xl">
          <img
            src={cutie}
            alt="bottom"
            className="
              w-full
              h-full
              object-cover
              rounded-2xl
            "
          />
        </div>


        <div className="absolute top-[85%] left-[1%] w-[12%] h-[11%]  rounded-1xl">
          <img
            src={last}
            alt="bottom"
            className="
              w-full
              h-full
              object-cover
              rounded-2xl
            "
          />
        </div>

        {/* right sidebar */}

        {/* mood */}
        <div className="absolute top-[4%] right-[1%] w-[17%] h-[15%] z-20">
          <MoodCard />
        </div>

        {/* daily care */}
        <div className="absolute top-[20%] right-[1%] w-[17%] h-[24%] z-20">
          <DailyCareCard />
        </div>

        
        <div className="absolute h-[17%] rounded-xl top-[46.5%] right-[1.2%] w-[16.6%] z-20 ">

          <img
            src={midImage}
            alt="bottom"
            className="
              w-full
              h-full
              object-cover
              rounded-2xl
            "
          />

        </div>
        
        <div
          className="
            absolute
            top-[66%]
            right-[1%]
            w-[17%]
            h-[32%]
            z-20
            p-2
          "
        >
          <img
            src={bottomImage}
            alt="bottom"
            className="
              w-full
              h-full
              object-cover
              rounded-2xl
            "
          />
        </div>

        {/* middle content */}
        <div
          className="
            absolute
            top-[3%]
            left-[15%]
            w-[65%]
            h-[45%]
            z-20
          "
          >
          <PandaHero pandaImage={pandaHero} />
        </div>

        <div className="absolute top-[49%] left-[15%] w-[42%] h-[32%] z-20 ">
          <FeedSection />
        </div>     

        <div className="absolute top-[49%] left-[59%] w-[21%] h-[32%] z-20">
          <ChillActivities />
        </div>

        <div className="absolute top-[83%] left-[15%] w-[65%] h-[15%] z-20">
          <UnlockSection />
        </div>

      </div>

    </div>
  );
};

export default PandaZone;
