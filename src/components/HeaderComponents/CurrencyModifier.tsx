import { useState } from "react";
import { useCurrency } from "../../contexts/CurrencyContext";
import { CircleHelp } from "lucide-react";

const CurrencyModifier = () => {
  const { currency, setCurrency } = useCurrency();
  const [detailsHovered, setDetailsHovered] = useState<boolean>(false);

  return (
    <div className="hidden flex-row lg:flex">
      <button
        className={`${currency === "RON" && "underline"} mr-2`}
        onClick={() => {
          setCurrency("RON");
          localStorage.setItem("currency_preference", "RON");
        }}
      >
        <span>RON</span>
      </button>
      <button
        className={`${currency === "EUR" && "underline"} mr-2`}
        onClick={() => {
          setCurrency("EUR");
          localStorage.setItem("currency_preference", "EUR");
        }}
      >
        <span>EUR</span>
      </button>
      <div
        className="relative"
        onMouseEnter={() => setDetailsHovered(true)}
        onMouseLeave={() => setDetailsHovered(false)}
      >
        <CircleHelp />
        <div
          className={`absolute left-1/2 flex -translate-x-1/2 rounded-lg border border-gray-500/50 bg-white/30 p-2 backdrop-blur-sm ${detailsHovered ? "opacity-100" : "invisible opacity-0"} mt-1 transition-all duration-300 ease-in-out`}
        >
          <span className="text-center">
            Aici poti selecta moneda cu care iti faci cumparaturile
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyModifier;
