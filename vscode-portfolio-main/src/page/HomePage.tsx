import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomePages = () => {
  return (
    <div className="flex h-full ">
      <section className="flex flex-col-reverse justify-center  lg:flex-row  w-full gap-10 lg:gap-0">
        <div className="flex flex-col justify-center items-center lg:items-start w-full relative overflow-hidden ">
          <div className="absolute text-5xl md:text-9xl lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] text-gray-600 opacity-20 tracking-tighter  leading-tight z-10 flex flex-col font-black">
            <div className="flex gap-14">
              <span>I</span>
              <span>BUILD</span>
            </div>
            <span>WEBSITES</span>
          </div>
          <div className="relative lg:left-16 space-y-24 sm:space-y-44 md:space-y-52 lg:space-y-28 z-20">
            <div className="z-10 flex flex-col gap-4">
              <span className="text-2xl md:text-5xl lg:text-7xl tracking-tighter font-bold">
                Daryl R. Sumabal
              </span>
              <TypeAnimation
                sequence={["Web Developer", 1000, "", 500]}
                wrapper="span"
                speed={30}
                className="text-xl md:text-3xl lg:text-[3.75rem] font-light inline-block"
                repeat={Infinity}
              />
            </div>
            <div className="space-x-2 lg:space-x-10 font-sans text-sm md:text-base">
              <button className="p-3.5  border-2 border-transparent font-medium lg:text-2xl bg-secondary text-white ease-in duration-100 hover:shadow-lg hover:shadow-secondary/45 hover:scale-105">
                <Link to={"/project"}>View Work</Link>
              </button>
              <button className="border-2 text-white border-secondary p-3.5 font-medium lg:text-2xl ease-in duration-100 hover:shadow-lg hover:shadow-secondary/45 hover:scale-105">
                <Link to={"/contact"}>Contact Me</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePages;
