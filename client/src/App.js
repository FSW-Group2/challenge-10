import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListPlayer from "./pages/ListPlayer";
import List from "./pages/ListGame";
import Games from "./pages/Games";
import AuthContext from "./context/AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./config/firebase";
import AuthMiddleware from "./middlewares/Auth";
import BasicGrid from "./pages/ProfilePages";
import Leaderboard from "./pages/Leaderboard";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // setAuthenticatedUser(user);
      setisAuthenticated(user);
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={isAuthenticated}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/listplayer"
            element={
              <AuthMiddleware>
                <ListPlayer />
              </AuthMiddleware>
            }
          />
          <Route path="/listgame" element={<List />} />

          <Route
            path="/games"
            element={
              <AuthMiddleware>
                <Games />
              </AuthMiddleware>
            }
          />
          <Route path="/profile" element={<BasicGrid />} />
          <Route
            path="/leaderboard"
            element={
              <AuthMiddleware>
                <Leaderboard />
              </AuthMiddleware>
            }
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
