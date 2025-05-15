import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import ExplorePage from "./ExplorePage";
import UploadPage from "./UploadPage";
import ProfilePage from "./ProfilePage.tsx";

const GymTokMainPage: React.FC = () => {
    return (
        <Router>
            <div className="flex w-screen h-screen overflow-hidden bg-[#1E1E1E] text-white">
                <Sidebar />
                <main className="flex-grow flex justify-center items-center overflow-hidden w-full flex-col">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default GymTokMainPage;
