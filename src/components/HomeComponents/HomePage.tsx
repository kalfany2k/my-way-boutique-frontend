import DashedLine from "../Utility/DashedLine";
import HomeProductGrid from "./HomeProductGrid";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <div className="z-0">
      <HeroSection />
      <HomeProductGrid
        name="Trusouri botez"
        categories="botez"
        type="trusou"
        path="/produse/trusouri"
      />
      <DashedLine />
      <HomeProductGrid
        name="Prosoape brodate"
        categories="brodate"
        type="prosop"
        path="/produse/prosoape"
      />
      <DashedLine />
    </div>
  );
};

export default HomePage;
