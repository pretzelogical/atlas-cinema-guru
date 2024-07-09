import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from './routes/auth/Authentication';
import HomePage from "./routes/dashboard/HomePage";
import Favorites from "./routes/dashboard/Favorites";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/home",
    element: <Dashboard activePage="Home"><HomePage /></Dashboard>
  },
  {
    path: "/favorites",
    element: <Dashboard activePage="Favorites"><Favorites /></Dashboard>
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  // Paths for home, favorites, and watch later will be added here
]);

export default router;
