import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 p-10 mt-10">
      <aside>
        <h6 className="footer-title text-4xl font-bold">প্ল্যান্ট এইড</h6>
        <p className="text-3xl font-bold">গ্রিন স্পার্ক</p>
      </aside>
      <nav>
        <h6 className="footer-title text-2xl">সোশ্যাল</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.facebook.com/Md.Nur9211/" target="_blank">
            <FaFacebook className="w-7 h-7" />
          </a>
          <a href="https://www.linkedin.com/in/mdnur9211/" target="_blank">
            <FaLinkedin className="w-7 h-7" />
          </a>
          <a href="https://x.com/MdNur9211" target="_blank">
            <FaTwitter className="w-7 h-7" />
          </a>
        </div>
      </nav>
      
    </footer>
  );
};

export default Footer;
