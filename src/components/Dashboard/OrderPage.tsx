import { useState } from "react";

const OrderPage = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="flex h-page-height w-full">
      <div className="m-auto flex h-[90%] w-3/4 flex-col rounded-sm ring-1 ring-black">
        <div className="grid h-12 grid-cols-4 divide-x-[1px] divide-black border-b-[1px] border-black font-helvetica-medium text-lg">
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-rose-300 ${currentTab === 0 ? "bg-rose-200" : "bg-rosy-nude-200"}`}
            onClick={() => setCurrentTab(0)}
          >
            <span className="m-auto select-none">Comenzi plasate</span>
          </button>
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-rose-300 ${currentTab === 1 ? "bg-rose-200" : "bg-rosy-nude-200"}`}
            onClick={() => setCurrentTab(1)}
          >
            <span className="m-auto select-none">
              Comenzi in curs de lucrare
            </span>
          </button>
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-rose-300 ${currentTab === 2 ? "bg-rose-200" : "bg-rosy-nude-200"}`}
            onClick={() => setCurrentTab(2)}
          >
            <span className="m-auto select-none">Comenzi livrate</span>
          </button>
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-rose-300 ${currentTab === 3 ? "bg-rose-200" : "bg-rosy-nude-200"}`}
            onClick={() => setCurrentTab(3)}
          >
            <span className="m-auto select-none">Comenzi terminate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
