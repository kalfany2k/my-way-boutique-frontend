import "./index.css";
import Header from "./components/HeaderComponents/Header";
import Footer from "./components/Footer";
import Categories from "./components/HomeComponents/Categories";
import { OverlayProvider } from "./contexts/OverlayContext";
import { UserProvider } from "./contexts/UserContext";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <OverlayProvider>
      <UserProvider>
        <div className="flex h-screen min-h-screen w-screen flex-col">
          <Header />
          <div className="mt-total-header flex-grow overflow-y-auto scroll-smooth lg:mt-total-header">
            <Categories />
            <Outlet />
            <Footer />
          </div>
        </div>
      </UserProvider>
    </OverlayProvider>
  );
};

export default App;
