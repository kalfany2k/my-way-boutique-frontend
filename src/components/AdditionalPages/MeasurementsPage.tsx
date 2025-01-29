import React from "react";

const MeasurementsPage = () => {
  return (
    <div className="mb-4 flex h-fit min-h-page-height flex-col items-center">
      <div className="flex h-fit w-1/2 flex-col items-center rounded-b-md p-3 ring-1 ring-gray-700">
        <span className="w-full text-center font-helvetica-thin text-4xl">
          Ghid de marimi
        </span>
        <span className="mt-2 w-full font-nunito-regular">
          Tabelul nostru de dimensiuni serveste ca ghid de referinta. Copiii de
          aceeasi varsta pot avea dimensiuni foarte diferite, asa ca inainte de
          a plasa comanda, va rugam sa tineti cont de urmatoarele:
        </span>
        <ul className="mt-2 w-full list-disc px-8">
          <li className="">
            <span>
              Masurati copilul si consultati tabelul nostru pentru a identifica
              marimea potrivita.
            </span>
          </li>
          <li className="mt-1">
            <span>
              Luati in considerare varsta pe care o va avea copilul la eveniment
              - micutii cresc rapid in greutate si inaltime, asa ca alegeti
              marimea optima pentru momentul respectiv.
            </span>
          </li>
          <li className="mt-1">
            <span>
              La masurarea copilului, lasati un mic spatiu de lejeritate
              (aproximativ un centimetru) pentru ca hainutele sa nu fie prea
              stramte.
            </span>
          </li>
        </ul>
        <span className="mt-2 w-full">
          Pentru orice alte informatii si clarificari, nu ezitati sa ne
          contactati.
        </span>
      </div>
      <div className="mt-8 flex h-fit w-1/2 flex-col items-center rounded-t-md p-3 ring-1 ring-gray-700">
        <span className="font-helvetica-thin text-4xl">Cum masor?</span>
        <span>...</span>
      </div>
    </div>
  );
};

export default MeasurementsPage;
