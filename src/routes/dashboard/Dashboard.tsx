import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import './dashboard.scss';


export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <SideBar />
      <div className="dashboard-content">
        <h1>Test Content</h1>
        <p>ijfaeifaeiofaiofhawiohf</p>
      </div>
    </div>
  )
}