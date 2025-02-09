import { Link } from "react-router-dom";
import Information from "../components/info/Information";
import { contactData } from "../constant/data";

const ContactPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 py-4">
      <div className="flex w-full">
        <Information data={contactData} />
      </div>
      <div className="w-1 bg-secondary" />
      <div className="flex w-full">
        <section className="flex flex-col w-full gap-8">
          <h1 className="text-xl font-medium">Or Fill Out This Form</h1>

          <form className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block  text-sm uppercase mb-2 text-white"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className=" p-3 outline-none w-full bg-neutral focus:outline-1 focus:outline-secondary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block  uppercase mb-2 text-sm text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className=" p-3 outline-none w-full focus:outline-1 bg-neutral  focus:outline-secondary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="uppercase text-sm text-white">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full p-3 mt-2 outline-none bg-neutral  focus:outline-1 focus:outline-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="uppercase  text-sm text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full resize-none mt-2 outline-none bg-neutral  focus:outline-1 focus:outline-secondary p-2"
                rows={5}
              ></textarea>
            </div>
            <div className="text-left bg-secondary w-[76px] px-3 py-2 uppercase font-semibold text-sm  text-white border-none">
              <Link to={"/email"}>Submit</Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
