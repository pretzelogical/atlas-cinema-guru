import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from './routes/auth/Authentication';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Authentication />,
  }
]);

export default router;
