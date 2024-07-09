import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from './routes/auth/Authentication';
import HomePage from "./routes/dashboard/HomePage";
import Favorites from "./routes/dashboard/Favorites";
import WatchLater from "./routes/dashboard/WatchLater";
import NotFound from "./routes/error/NotFound";


const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
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
    path: '/watchlater',
    element: <Dashboard activePage="Watch later"><WatchLater /></Dashboard>
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  // Paths for home, favorites, and watch later will be added here
]);

export default router;
