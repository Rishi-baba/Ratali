import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
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

import deadImg from "../assets/hero/dead.png";
import health10Img from "../assets/hero/health_10.png";
import health20Img from "../assets/hero/health_20.png";
import health40Img from "../assets/hero/health_40_to_30.png";
import health50Img from "../assets/hero/health_50.png";
import health100to50Img from "../assets/hero/health_100to50.png";
import bathImg from "../assets/hero/bath.png";
import eatingBambooImg from "../assets/hero/eatingbamboo.png";
import pizzaEatImg from "../assets/hero/pizzaEat.png";
import sleepingImg from "../assets/hero/sleeping.png";
import watermelonEatImg from "../assets/hero/watermelonEat.png";


import API from "../api/axios";
import { Link } from "react-router-dom";

const PandaZone = () => {
  const { user, setUser } = useAuthStore();
  const [currentHealth, setCurrentHealth] = useState(100);
  const [tempAction, setTempAction] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (!user) return;
    if (user.pandaDead) {
      setCurrentHealth(0);
      return;
    }

    const calcHealth = () => {
      const lastUpdate = new Date(user.lastHealthUpdate).getTime();
      const now = Date.now();
      const diff = now - lastUpdate;
      
      if (diff > 0) {
        const decayAmount = diff * (100 / (24 * 60 * 60 * 1000));
        let newHealth = user.pandaHealth - decayAmount;
        if (newHealth <= 0) newHealth = 0;
        setCurrentHealth(newHealth);
      } else {
        setCurrentHealth(user.pandaHealth);
      }
    };

    calcHealth();
    const id = setInterval(calcHealth, 10000);
    return () => clearInterval(id);
  }, [user]);

  let activeImage = health100to50Img;

  if (currentHealth <= 0 || user?.pandaDead) {
    activeImage = deadImg;
  } else if (tempAction === 'bath') activeImage = bathImg;
  else if (tempAction === 'eatingbamboo') activeImage = eatingBambooImg;
  else if (tempAction === 'pizzaEat') activeImage = pizzaEatImg;
  else if (tempAction === 'sleeping') activeImage = sleepingImg;
  else if (tempAction === 'watermelonEat') activeImage = watermelonEatImg;
  else {
    if (currentHealth >= 51) activeImage = health100to50Img;
    else if (currentHealth >= 50) activeImage = health50Img;
    else if (currentHealth >= 30) activeImage = health40Img;
    else if (currentHealth >= 20) activeImage = health20Img;
    else activeImage = health10Img;
  }

  const handleAction = (action) => {
    setTempAction(action);
    setTimeout(() => {
      setTempAction(null);
    }, 30000); // 30 seconds
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative">
      <Link
        to="/"
        className="absolute top-6 left-8 z-50 text-[#82d85f] font-extrabold text-3xl tracking-widest drop-shadow-lg hover:text-[#a0ea83] transition-all duration-300 italic"
      >
        Ratali
      </Link>

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
          <DailyCareCard onAction={handleAction} />
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
          <PandaHero pandaImage={activeImage} currentHealth={currentHealth} />
        </div>

        <div className="absolute top-[49%] left-[15%] w-[42%] h-[32%] z-20 ">
          <FeedSection onAction={handleAction} />
        </div>     

        <div className="absolute top-[49%] left-[59%] w-[21%] h-[32%] z-20">
          <ChillActivities onAction={handleAction} />
        </div>

        <div className="absolute top-[83%] left-[15%] w-[65%] h-[15%] z-20">
          <UnlockSection />
        </div>

      </div>

    </div>
  );
};

export default PandaZone;
