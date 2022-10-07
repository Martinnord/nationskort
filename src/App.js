import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { SendInvites } from "./pages/SendInvites/SendInvites";
import { Card } from "./pages/Card/Card";
import { Profile } from "./pages/Profile/Profile";
import { Settings } from "./pages/Settings/Settings";
import { Feedback } from "./pages/Feedback/Feedback";
import { SignUp } from "./pages/Signup/Signup";
import { useUserData } from "./lib/hooks";
import { UserContext } from "./lib/UserContext";

const ProtectedRoute = (props) => {
  if (!props.user) {
    return <Navigate to="/not-found" />;
  } else {
    return <Outlet />;
  }
};

const NotFound = () => {
  return <h1>Sorry bro</h1>;
};

function App() {
  const user = useUserData();

  if (user.loading) {
    return <div />;
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/app/card" element={<Card />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
