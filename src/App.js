import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";

import { SendInvites } from "./pages/SendInvites/SendInvites";
import { Card } from "./pages/Card/Card";
import { Profile } from "./pages/Profile/Profile";
import { Settings } from "./pages/Settings/Settings";

import { SignUp } from "./pages/Signup/Signup";

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
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div />;
  }

  console.log("user", user);
  console.log("loading", loading);
  console.log("error", error);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<SignUp />} />
        <Route exact path="/app" element={<ProtectedRoute user={user} />}>
          <Route exact path="/app/invite" element={<SendInvites />} />
          <Route exact path="/app/card" element={<Card />} />
          <Route exact path="/app/profile" element={<Profile />} />
          <Route exact path="/app/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
