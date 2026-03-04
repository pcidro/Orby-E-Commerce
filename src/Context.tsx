import React, { type PropsWithChildren } from "react";

type iUiContext = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const ContextUi = React.createContext<iUiContext | null>(null);

export const Context = () => {
  const context = React.useContext(ContextUi);
  if (!context) throw new Error("useContext deve estar dentro do Provider");
  return context;
};

export const UiContextProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = React.useState("");

  return (
    <ContextUi.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </ContextUi.Provider>
  );
};

export default Context;
