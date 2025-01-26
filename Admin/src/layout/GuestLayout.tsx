import { useContextUser } from "@/lib/context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
  const { token } = useContextUser();

  if (token) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center  bg-slate-100 ">
        <Outlet />
      </div>
    </section>
  );
};

export default GuestLayout;
