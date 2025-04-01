import "./index.css";
import Header from "./components/HeaderComponents/Header";
import Footer from "./components/Footer";
import Categories from "./components/HomeComponents/Categories";
import { OverlayProvider } from "./contexts/OverlayContext";
import { UserProvider } from "./contexts/UserContext";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { ApiProvider } from "./contexts/ApiContext";
import Overlay from "./components/Utility/Overlay";

const App = () => {
  return (
    <CurrencyProvider>
      <CartProvider>
        <OverlayProvider>
          <UserProvider>
            <ApiProvider>
              <div className="z-header flex h-screen min-h-screen w-screen flex-col">
                <Header />
                <div
                  id="scrollable-div"
                  className="mt-total-header flex-grow overflow-y-auto scroll-smooth lg:mt-total-header"
                >
                  <Categories />
                  <Outlet />
                  <Footer />
                </div>
              </div>
            </ApiProvider>
          </UserProvider>
        </OverlayProvider>
      </CartProvider>
    </CurrencyProvider>
  );
};

export default App;
