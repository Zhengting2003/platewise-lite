
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Decision from "./pages/Decision";
import Completion from "./pages/Completion";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

function AppContent() {
  const location = useLocation();

  const showNav = [
    "/",
    "/stats",
    "/profile",
  ].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/scan"
          element={<Scan />}
        />

        <Route
          path="/decision"
          element={<Decision />}
        />

        <Route
          path="/completion"
          element={<Completion />}
        />

        <Route
          path="/stats"
          element={<Stats />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>

      {showNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

