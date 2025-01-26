import { useContextUser } from "@/lib/context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { token } = useContextUser();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
