import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

export const Landing = () => {

  const navigate = useNavigate()

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentials) => {
          navigate("/home")
        }}
        onError={() => console.log("ERROR")}
        auto_select={true}
      />
    </div>
  );
};
