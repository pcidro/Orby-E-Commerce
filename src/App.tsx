import RoutePage from "./RoutePage";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./css/App.css";
import { OrderProvider } from "./Contextos/OrderContext";
import ScrollToTop from "./Components/ScroltoTop";
import { AuthProvider } from "./Contextos/AuthContext";
import { CartProvider } from "./Contextos/CartContext";
import { SearchProvider } from "./Contextos/SearchContext";

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <OrderProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    border: "1px solid #E2E8F0",
                    minWidth: "fit-content",
                    maxWidth: "450px",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "16px 24px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    color: "#1A202C",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: "#10B981",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    duration: 4000,
                    style: {
                      border: "1px solid #EF4444",
                    },
                    iconTheme: {
                      primary: "#EF4444",
                      secondary: "#fff",
                    },
                  },
                }}
              />
              <RoutePage />
            </OrderProvider>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
