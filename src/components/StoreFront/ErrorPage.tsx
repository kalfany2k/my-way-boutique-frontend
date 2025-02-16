import { SearchX, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex min-h-page-height flex-col items-center justify-center">
      <div className="flex flex-row items-center">
        <span className="font-helvetica-medium text-7xl">404</span>
        <SearchX size={72} />
      </div>
      <span className="font-helvetica text-3xl">Resursa nu a fost gasita</span>
      <Link
        className="mt-2 flex flex-row items-center gap-x-1 rounded-md bg-rose-200 px-2 py-1 outline-double outline-gray-700"
        draggable="false"
        to="/"
      >
        <span className="font-helvetica text-2xl">Intoarce-te</span>
        <Undo2 size={32} />
      </Link>
    </div>
  );
};

export default ErrorPage;
