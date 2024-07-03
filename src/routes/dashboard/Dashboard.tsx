import Header from "../../components/navigation/Header";


export type DashboardProps = {
  username: string;
  setIsLoggedIn: (x: boolean) => void;
};


export default function Dashboard({
  username,
  setIsLoggedIn
}: DashboardProps) {
  return (
    <div className="dashboard-container">
      <Header
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  )
}