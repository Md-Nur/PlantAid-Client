import Title from "@/components/Title";
import agronomists from "./data";
import { FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const Agronomists = () => {
  return (
    <section>
      <Title>কৃষিবিদ</Title>
      <div className="flex gap-5 max-w-7xl mx-auto justify-center flex-wrap">
        {agronomists?.map((agronomist, index) => (
          <div key={index} className="card bg-secondary w-72">
            <div className="card-body">
              <h2 className="card-title">{agronomist?.name}</h2>
              <p>{agronomist?.designation}</p>
              {agronomist?.batch && <p>ব্যাচঃ {agronomist?.batch}</p>}
              <div className="card-actions justify-end items-center">
                <a href={`tel:${agronomist?.mobile}`}>
                  <FaPhone className="w-5 h-5" />
                </a>
                <a href={`mailto:${agronomist?.email}`}>
                  <MdMail className="w-7 h-7" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Agronomists;
