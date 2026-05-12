import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PandaZone from "./pages/PandaZone";
import TasksPage from "./pages/TasksPage";
import FocusPage from "./pages/FocusPage";
import GlobalAudio from "./components/GlobalAudio";

function App() {
  return (
    <BrowserRouter>
      <GlobalAudio />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/panda-zone" element={<PandaZone />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/focus" element={<FocusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;