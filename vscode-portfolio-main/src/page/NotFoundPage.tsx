import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 ">
      <div className="text-center space-y-10">
        <div>
          <h1 className="text-8xl lg:text-[12rem] font-black text-primary">
            Oops!
          </h1>
        </div>
        <div>
          <p className="text-xl lg:text-3xl text-white">404-PAGE NOT FOUND</p>
        </div>
      </div>
      <div className="text-base md:w-96  text-center lg:text-lg text-white ">
        <p>
          The page you are looking for might have been removed had its name
          changed or temporarily unavailable
        </p>
      </div>
      <div>
        <Link to={"/home"}>
          <button className="p-2 bg-primary text-white font-medium ease-in duration-150 shadow-md hover:shadow-primary">
            GO TO HOMEPAGE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
