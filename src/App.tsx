import RoutePage from "./RoutePage";
import { UiContextProvider } from "./Context";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./css/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RoutePage />
      </UiContextProvider>
    </BrowserRouter>
  );
};

export default App;
