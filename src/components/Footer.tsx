import { ChevronRight, Clock, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { text: "Termeni si conditii", path: "/termeni-si-conditii" },
    { text: "Contact", path: "/contact" },
    { text: "Contul meu", path: "/contul-meu" },
    { text: "Povestea noastra", path: "/povestea-noastra" },
    { text: "ANPC", path: "/anpc" },
    { text: "Confidentialitate", path: "/confidentialitate" },
    { text: "Cookies", path: "/cookies" },
    { text: "Comenzi si plata", path: "/comenzi-si-plata" },
    { text: "Livrare", path: "/livrare" },
    { text: "Retur", path: "/retur" },
  ];

  const [highlightedCategoryIndex, setHighlightedCategoryIndex] =
    useState<number>(-1);

  return (
    <footer className="mt-6 w-full bg-rosy-nude-200 px-2 pb-24 pt-6 lg:mt-8 lg:px-12 lg:pb-10">
      <div className="mx-auto max-w-[90%] lg:max-w-[65%]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          {/* First column */}
          <div className="h-18 flex items-center justify-center lg:h-full">
            <h1 className="font-ethereal-bold text-7xl">MWB</h1>
          </div>

          {/* Middle section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-x-8 text-gray-600">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex w-full flex-row items-center border-b-[1px] border-taupe-nude-900 px-2 py-[6px]"
                >
                  <ChevronRight
                    size={16}
                    className={`${index === highlightedCategoryIndex ? "text-gray-900" : ""} animated-300ms`}
                  />
                  <span
                    className="animated-300ms text-center font-signika-medium text-base hover:text-gray-900"
                    onMouseEnter={() => setHighlightedCategoryIndex(index)}
                    onMouseLeave={() => setHighlightedCategoryIndex(-1)}
                  >
                    {link.text}
                  </span>
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
