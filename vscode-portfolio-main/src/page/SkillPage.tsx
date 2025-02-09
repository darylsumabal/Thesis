import Image from "../components/image/Image";
import { skill } from "../constant/skillData";

const SkillPage = () => {
  return (
    <div className="w-full py-4">
      <section className="space-y-10">
        <h1 className="text-xl font-bold">Skills Offered</h1>
        <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  md:gap-14  2xl:grid-cols-5 ">
          {skill.map((skills) => (
            <div
              key={skills.id}
              className="p-2 bg-neutral  shadow-lg rounded-md shadow-primary w-24 md:w-40 xl:w-52 2xl:w-56 ease-in-out duration-150 hover:shadow-accent hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center gap-4 ">
                <Image
                  loading="lazy"
                  path={`portfolio/${skills.image}`}
                  alt={skills.image}
                  lqip={{ active: true, quality: 10 }}
                  className="w-20 md:w-32  h-20 md:h-32"
                />
                <span className="font-semibold text-sm md:text-base text-accent">
                  {skills.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SkillPage;
