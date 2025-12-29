import { Routes, Route } from "react-router-dom";
import Location from "./pages/Location";
import JobLayout from "./pages/JobLayout";
import Personal from "./pages/Personal";
import Position from "./pages/Position";
import Final from "./pages/Final";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import ProtectedStep from "./components/ProtectedStep";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <div
          className="
            w-16
            hover:w-48
            transition-all
            duration-300
            bg-black"
        >
          <Navbar />
        </div>

        <div className="flex flex-1 bg-[#FFFFFF]">
          <Routes>
            <Route path="/" element={<ProfilePage />} />

            <Route path="jobApply" element={<JobLayout />}>
            
              <Route index element={<Location />} />
              <Route
                path="position"
                element={
                  <ProtectedStep step="position">
                    <Position />
                  </ProtectedStep>
                }
              />

            
              <Route
                path="personal"
                element={
                  <ProtectedStep step="personal">
                    <Personal />
                  </ProtectedStep>
                }
              />

              <Route
                path="final"
                element={
                  <ProtectedStep step="final">
                    <Final />
                  </ProtectedStep>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
