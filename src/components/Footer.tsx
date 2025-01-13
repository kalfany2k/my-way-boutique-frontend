import { Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { text: "Gaseste-mi marimea", path: "/ghid-marimi" },
    { text: "Termeni si conditii", path: "/termeni-si-conditii" },
    { text: "Contact", path: "/contact" },
    { text: "Contul meu", path: "/contul-meu" },
    { text: "Povestea noastra", path: "/povestea-noastra" },
    { text: "ANPC", path: "/anpc" },
    { text: "Confidentialitate", path: "/confidentialitate" },
    { text: "Comenzi si plata", path: "/comenzi-si-plata" },
    { text: "Livrare", path: "/livrare" },
    { text: "Retur", path: "/retur" },
  ];

  return (
    <footer className="mt-6 w-full bg-rosy-nude-200 px-2 pb-24 pt-6 lg:mt-8 lg:px-12 lg:pb-6">
      <div className="mx-auto max-w-[90%] lg:max-w-[80%]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          {/* First column */}
          <div className="h-18 flex items-center justify-center lg:h-full">
            <h1 className="font-ethereal-bold text-7xl">MWB</h1>
          </div>

          {/* Middle section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-md w-fit place-self-center border-b-[1px] border-taupe-nude-900 px-2 text-center font-signika-medium transition duration-150 ease-in-out hover:text-gray-900 lg:text-xl"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Last column */}
          <div className="flex h-fit flex-col items-center justify-center font-signika-light text-base lg:h-full">
            <span className="font-signika-light text-xl">
              Contacteaza-ne aici
            </span>
            <div className="mt-1 flex flex-row items-center">
              <Phone className="size-6" strokeWidth={1.5} />
              <h1 className="ml-[6px]">- 07XX XXX XXX</h1>
            </div>

            <div className="mt-1 flex flex-row items-center">
              <Mail className="size-6" strokeWidth={1.5} />
              <h1 className="ml-[6px]">- xxxx@gmail.com</h1>
            </div>
            <div className="mt-1 flex flex-row items-center">
              <Clock className="size-6" strokeWidth={1.5} />
              <h1 className="ml-2">- XX:XX - XX:XX</h1>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
