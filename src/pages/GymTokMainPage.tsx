import React from "react";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const GymTokMainPage: React.FC = () => {
  return (
      <div className="flex w-screen h-screen overflow-hidden bg-[#1E1E1E] text-white">
        <Sidebar />
        <main className="flex-grow flex justify-center items-center overflow-hidden">
          <VideoCard />
        </main>
      </div>
  );
};

export default GymTokMainPage;
