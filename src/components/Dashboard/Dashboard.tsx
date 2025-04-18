import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ProductForm from "./ProductForm";

const Dashboard = () => {
  const [productOpen, setProductOpen] = useState<boolean>(false);

  return (
    <div className="flex h-fit min-h-page-height w-full flex-col">
      <span className="p-4 font-signika text-2xl">
        Bine ai venit la centrul de control!
      </span>

      <div id="adaugare-produs">
        <div
          className="flex cursor-pointer flex-row"
          onClick={() => setProductOpen(!productOpen)}
        >
          <span className="select-none pl-4 font-signika text-xl">
            Pentru a adauga un produs, apasa aici
          </span>
          <ChevronDown
            className={`mt-[2px] size-6 ${productOpen ? "rotate-0" : "rotate-90"} transition-transform duration-300 ease-in-out`}
          />
        </div>
        <div
          className={`-z-10 w-full origin-top-left transition-all duration-300 ease-in-out lg:w-1/2 ${productOpen ? "h-fit scale-x-100 scale-y-100 opacity-100" : "pointer-events-none h-0 scale-x-90 scale-y-50 opacity-0"}`}
        >
          <ProductForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
