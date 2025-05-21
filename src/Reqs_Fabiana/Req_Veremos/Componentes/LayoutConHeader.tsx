// Reqs_Fabiana/LayoutConHeader.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Ajusta ruta si está en otro lugar

function LayoutConHeader() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}

export default LayoutConHeader;
