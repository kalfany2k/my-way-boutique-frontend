import "./index.css";
import Header from "./components/HeaderComponents/Header";
import Footer from "./components/Footer";
import { OverlayProvider } from "./contexts/OverlayContext";
import { UserProvider } from "./contexts/UserContext";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { ApiProvider } from "./contexts/ApiContext";
import Banner from "./components/HeaderComponents/Banner";

const App = () => {
  return (
    <CurrencyProvider>
      <CartProvider>
        <OverlayProvider>
          <UserProvider>
            <ApiProvider>
              <div
                className="relative flex h-screen min-h-screen w-screen flex-col overflow-y-auto overflow-x-hidden scroll-smooth"
                id="scrollable-div"
              >
                <Banner />
                <Header />
                <div className="min-h-page-height flex-grow">
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
