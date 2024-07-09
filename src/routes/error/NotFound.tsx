import { useNavigate } from "react-router-dom";
import Button from "../../components/general/Button";


export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Page Not Found</h1>
      <Button
        label="Go Home"
        onClick={() => navigate('/home')}
      />
    </div>
  );
}