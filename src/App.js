import { Layout } from "./Components/Layout/Layout";

import React, { createContext, useState } from 'react';

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('todoList');

  return (
    <ScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};


function App() {

  return (
    <ScreenProvider>
      <Layout />
    </ScreenProvider>
  );
}

export default App;
