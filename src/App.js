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
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<SignUp />} />
          <Route
            exact
            path="/app"
            element={<ProtectedRoute user={user.user} />}
          >
            <Route exact path="/app/invite" element={<SendInvites />} />
            <Route exact path="/app/card" element={<Card />} />
            <Route exact path="/app/profile" element={<Profile />} />
            <Route exact path="/app/settings" element={<Settings />} />
            <Route exact path="/app/feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
