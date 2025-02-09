import React from "react";

type infoData = {
  id: number;
  title: string;
  socials?: Record<string, string>;
};

type Prop = {
  data: infoData[];
};

const Information: React.FC<Prop> = ({ data }) => {
  return (
    <section>
      {data.map((infoData: infoData) => (
        <div key={infoData.id} className="flex flex-col gap-4">
          <span className="text-lg md:text-xl font-medium">{infoData.title}</span>
          {infoData.socials && (
            <div className="mx-6  list-decimal text-base md:text-xl">
              <ol className="flex flex-col gap-2 mx-4 ">
                <li className="contact__list ">
                  <span className="text-secondary ">.social </span>
                  &#123;
                </li>
                {Object.entries(infoData.socials).map(([key, value]) => (
                  <li key={key} className="contact__list text-base md:text-xl">
                    <span className="text-white c">{key}:</span>
                    <a
                      href={value}
                      target="_blank"
                      className="text-secondary hover:underline"
                    >
                      Reach Out
                    </a>
                  </li>
                ))}
                <li className="contact__list">&#125;</li>
              </ol>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Information;
