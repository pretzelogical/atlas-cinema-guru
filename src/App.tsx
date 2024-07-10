import './App.scss';
// import Dashboard from './routes/dashboard/Dashboard';
import router from './router';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
