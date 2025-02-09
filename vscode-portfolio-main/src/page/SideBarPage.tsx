import { NavLink } from "react-router-dom";
import { data } from "../constant/navbarData";
import { sideBarNav } from "../constant/sidebarData";

type SvgIcons = {
  svgString: string;
};

const SvgIcon = ({ svgString }: SvgIcons) => {
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

const SideBarPage = () => {
  return (
    <div className="flex ">
      <div>
        <aside className="flex  flex-col justify-between items-center p-3 h-full">
          <div className="space-y-6">
            {sideBarNav.slice(0, 5).map((items) => (
              <div key={items.id}>
                <NavLink
                  to={items.slug}
                  className={({ isActive }) =>
                    isActive
                      ? "fill-secondary"
                      : "fill-[#6A737D] hover:fill-white"
                  }
                >
                  <SvgIcon svgString={items.svg} />
                  <span className="sr-only">{items.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {sideBarNav.slice(5, 7).map((items) => (
              <div key={items.id}>
                <NavLink
                  to={items.slug}
                  className={({ isActive }) =>
                    isActive ? "fill-secondary" : "fill-[#6A737D]"
                  }
                >
                  <SvgIcon svgString={items.svg} />
                  <span className="sr-only">{items.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div>
        <aside className="lg:flex flex-col gap-10 p-2 bg-base-200 h-full  w-48 hidden">
          <div className="flex justify-between items-center mx-5">
            <h1 className="text-gray-400 text-sm">EXPLORER</h1>
            <span className="flex gap-[2px]">
              <div className="p-[2px] rounded-full bg-white"></div>
              <div className="p-[2px] rounded-full bg-white"></div>
              <div className="p-[2px] rounded-full bg-white"></div>
            </span>
          </div>
          <details className="dropdown dropdown-open mx-1" open>
            <summary className="font-semibold cursor-pointer text-sm  select-none">
              PORTFOLIO
            </summary>
            <ul className="space-y-2 p-4 dropdown-content ">
              {data.map((items) => (
                <li
                  key={items.id}
                  className="flex items-center gap-1 hover:text-white "
                >
                  <img src={items.image} alt={items.alt} className="w-5" />
                  <NavLink
                    to={items.slug}
                    className={({ isActive }) =>
                      isActive ? "font-medium" : "text-gray-400"
                    }
                  >
                    {items.filename}
                  </NavLink>
                </li>
              ))}
            </ul>
          </details>
        </aside>
      </div>
    </div>
  );
};

export default SideBarPage;
