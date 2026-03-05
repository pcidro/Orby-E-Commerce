import RoutePage from "./RoutePage";
import { UiContextProvider } from "./Context";
import "./css/App.css";

const App = () => {
  return (
    <UiContextProvider>
      <RoutePage />
    </UiContextProvider>
  );
};

export default App;
