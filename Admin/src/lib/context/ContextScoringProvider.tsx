import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

// Define props for the Context provider
type ContextProps = {
  children: ReactNode;
};

// Define the type for the context state
type TextType = {
  label: string;
  description: string;
};

// Define the context value type
type ContextType = {
  text: TextType;
  setText: React.Dispatch<SetStateAction<TextType>>;
};

// Create the context with a default null value
const stateContext = createContext<ContextType | null>(null);

// Define the provider component
export const ContextScoring: React.FC<ContextProps> = ({ children }) => {
  // Set up state for the context
  const [text, setText] = useState<TextType>({
    label: "",
    description: "",
  });

  return (
    // Provide state and setState to the context consumers
    <stateContext.Provider value={{ text, setText }}>
      {children}
    </stateContext.Provider>
  );
};
