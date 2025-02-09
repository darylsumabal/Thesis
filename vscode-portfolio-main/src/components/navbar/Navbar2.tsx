import { NavLink } from "react-router-dom";
import { data } from "../../constant/navbarData";

type dataItem = {
  id: number;
  slug: string;
  image: string;
  filename: string;
  alt: string;
};

const Navbar2 = () => {
  return (
    <nav className="flex items-center gap-2 text-[0.9rem]">
      <div className="carousel">
        {data.map((item: dataItem) => (
          <div className="carousel-item" key={item.id}>
            <NavLink
              to={item.slug}
              className={({ isActive }) =>
                isActive
                  ? "bg-base-300 text-base-content border-b-4 border-secondary "
                  : "text-gray-400"
              }
            >
              <div key={item.id} className="flex gap-2 px-6 py-2">
                <img src={item.image} alt={item.alt} className="w-5" />
                {item.filename}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar2;
