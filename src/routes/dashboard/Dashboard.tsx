import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import './dashboard.scss';
import { useLoadUserFromServer } from "../../userState";

export type DashboardProps = {
  children?: React.ReactNode
};

export default function Dashboard({ children }: DashboardProps) {
  const [isLoading] = useLoadUserFromServer();

  return (
    <div className="dashboard-container">
      <Header />
      <SideBar />
      <div className="dashboard-content">
        {children ? children : <p>Dashboard needs a child</p>}
        <p>{isLoading ? 'Loading...' : 'Loaded'}</p>
      </div>
    </div>
  )
}