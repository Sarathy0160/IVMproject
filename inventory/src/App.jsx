import { useState } from "react";
import "./App.css";
import Profile from "./Profile";
import AdminDashboard from "./AdminDashboard";
import Inventory from "./Inventory";
import Stock from "./Stock";
import Low from "./Low";
import Login from "./Login";
import History from "./History";
import {BrowserRouter,Routes,Route,Link,Navigate,NavLink ,} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* nav bar after login login work on role based   */}
      {user && (
        <nav>
          <ul className="list">
             <li>
              <NavLink  id="b"   className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              to="/profile">👤Profile</NavLink >
            </li>
            <li>
              <NavLink  id="b"   className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              to="/admin">Dashboard</NavLink >
            </li>

            <li>
              <NavLink  id="b"   className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              to="/inventory">Inventory</NavLink >
            </li>

            {/* for manager*/}
            {user.role === "manager" && (
              <>
                <li>
                  <NavLink  id="b"   className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              to="/stock">Stock</NavLink >
                </li>
                <li>
                  <NavLink  id="b"   className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              to="/lowalert">Low Stock</NavLink >
                </li>
                <li>
                  <NavLink  id="b"   className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              to="/history">History</NavLink >
                </li>
              </>
            )}
          </ul>

          <button id="log" onClick={logout}>Logout</button>
        </nav>
      )}

      <Routes>

        {/* login page */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/admin" /> : <Login setUser={setUser} />
          }
        />

        {/* dashboard */}
        <Route
          path="/admin"
          element={
            user ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* INVENTORY (BOTH CAN ACCESS) */}
        <Route id="b"
          path="/inventory"
          element={
            user ? <Inventory /> : <Navigate to="/" />
          }
        />

        {/* STOCK (ONLY MANAGER) */}
        <Route id="b"
          path="/stock"
          element={
            user?.role === "manager" ? (
              <Stock />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        {/* LOW STOCK (ONLY MANAGER) */}
        <Route id="b"
          path="/lowalert"
          element={
            user?.role === "manager" ? (
              <Low />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route id="b"
          path="/profile"
          element={
            user ? <Profile user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/history"
          element={
            user?.role === "manager"
              ? <History />
              : <Navigate to="/admin" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;