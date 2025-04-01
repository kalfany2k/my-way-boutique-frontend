import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

type Currency = "RON" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number) => number;
  toggleCurrency: () => void;
}

const EXCHANGE_RATE = 4.97; // RON to EUR rate
const CURRENCY_FORMATTERS = {
  RON: new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 2,
  }),
  EUR: new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }),
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>("RON");

  useEffect(() => {
    const preferenceValue = localStorage.getItem("currency_preference");
    if (preferenceValue === "RON" || preferenceValue === "EUR")
      setCurrency(preferenceValue);
  }, []);

  const convertPrice = useCallback(
    (amount: number): number => {
      return currency === "EUR" ? amount / EXCHANGE_RATE : amount;
    },
    [currency],
  );

  const formatPrice = useCallback(
    (amount: number): string => {
      const convertedAmount = convertPrice(amount);
      return CURRENCY_FORMATTERS[currency].format(convertedAmount);
    },
    [currency, convertPrice],
  );

  const toggleCurrency = useCallback(() => {
    setCurrency((curr) => (curr === "RON" ? "EUR" : "RON"));
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      convertPrice,
      toggleCurrency,
    }),
    [currency, formatPrice, convertPrice, toggleCurrency],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
