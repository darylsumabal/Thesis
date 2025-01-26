import React, {
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  createContext,
} from "react";

type Context = {
  children: ReactNode;
};

type UserType = {
  name: string;
  email: string;
};

type ContextType = {
  user: UserType;
  setUser: React.Dispatch<SetStateAction<UserType>>;
  token: string | null;
  setToken: (token: string | null) => void;
};
const stateContext = createContext<ContextType | null>(null);

export const ContextProvider: React.FC<Context> = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token: string | null) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <stateContext.Provider value={{ user, token, setToken, setUser }}>
      {children}
    </stateContext.Provider>
  );
};

export const useContextUser = () => {
  const context = useContext(stateContext);

  if (!context) {
    throw new Error("Context must be used within a PokemonProvider");
  }
  return context;
};
