import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    googleLogout();
    navigate("/");
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
