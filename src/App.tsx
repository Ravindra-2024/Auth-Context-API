import React from "react";
import { AuthProvider } from "./context/AuthContext";
import DemoAuthComponent from "./DemoAuthComponent";

const App: React.FC = () => (
  <AuthProvider>
    <DemoAuthComponent />
  </AuthProvider>
);

export default App;
