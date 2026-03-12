import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDonation from "./pages/PostDonation";
import MyDonations from "./pages/MyDonations";
import AvailableDonations from "./pages/AvailableDonations";
import NgoHistory from "./pages/NgoHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import NgoDashboard from "./pages/dashboard/NgoDashboard";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === "restaurant" ? (
                <RestaurantDashboard />
              ) : (
                <NgoDashboard />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-donation"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <PostDonation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-donations"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <MyDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/available-donations"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <AvailableDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo-history"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <NgoHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;