import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/layout/LoginPage";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
// import UserDetail from "./components/ui/UserDetails";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/user" element={<User />} /> */}
          <Route path="/user-details/:userId" element={<User />} />
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>{" "}
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
