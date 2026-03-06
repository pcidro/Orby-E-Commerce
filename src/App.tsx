import RoutePage from "./RoutePage";
import { UiContextProvider } from "./Context";
import "./css/App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UiContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RoutePage />
    </UiContextProvider>
  );
};

export default App;
