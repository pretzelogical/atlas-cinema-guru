import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import './dashboard.scss';
import { useLoadUserFromServer } from "../../userState";


export default function Dashboard() {
  const [isLoading] = useLoadUserFromServer();

  return (
    <div className="dashboard-container">
      <Header />
      <SideBar />
      <div className="dashboard-content">
        <h1>Test Content</h1>
        <p>ijfaeifaeiofaiofhawiohf</p>
        <p>{isLoading ? 'Loading...' : 'Loaded'}</p>
      </div>
    </div>
  )
}