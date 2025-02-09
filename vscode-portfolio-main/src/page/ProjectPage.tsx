import { useState } from "react";
import { dataBox, dataTitle } from "../constant/boxData";
import Image from "../components/image/Image";
const ProjectPage = () => {
  const [hover, setHover] = useState<string | null>(null);

  const handleMouseHover = (id: string) => {
    setHover(id);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <div className="h-full ">
      <section className="flex flex-col pb-4  gap-4">
        <div className="mt-4">
          {dataTitle.map((title) => (
            <span key={title.id} className="text-xl font-bold">
              {title.title}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-10  flex-1 ">
          {dataBox.map((items) => (
            <div
              key={items.id}
              className="bg-neutral rounded-3xl flex flex-col"
            >
              <div className="space-y-4">
                <Image
                  loading="lazy"
                  path={`portfolio/${items.image}`}
                  alt={items.image}
                  className="rounded-t-3xl object-cover w-full  h-44 2xl:h-80"
                  lqip={{ active: true, quality: 10 }}
                />

                <div className="flex flex-col">
                  <div className="space-y-2 px-4">
                    <h1 className="text-xl">{items.title}</h1>
                    <article className="text-sm text-accent">
                      {items.description}
                    </article>
                    <div>
                      <a
                        href={items.slug}
                        target="_blank"
                        className="text-sm ease-in-out duration-150 border-b-2 border-accent px-1 hover:bg-accent hover:border-none hover:text-white"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4  p-4">
                    {items.stack.map((items) => (
                      <button
                        key={items.id}
                        className="rounded-full text-white text-xs px-2 py-1 border-2 cursor-pointer"
                        style={{
                          borderColor: items.color,
                          backgroundColor:
                            hover === items.id
                              ? items.color + "40"
                              : "transparent",
                        }}
                        onMouseEnter={() => handleMouseHover(items.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {items.language}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
