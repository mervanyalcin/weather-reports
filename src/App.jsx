import { routes } from "./routes.js";
import { useRoutes } from "react-router-dom";
import React from "react";

function App() {
  const showRoutes = useRoutes(routes);

  return <>{showRoutes}</>;
}

export default App;
