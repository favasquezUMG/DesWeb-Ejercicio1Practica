import { useState } from "react";

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="header">
      <div className="logo">Verus CORP</div>
      <button onClick={() => setMenuAbierto(!menuAbierto)}>☰</button>
      <nav className={menuAbierto ? "nav nav-abierto" : "nav"}>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

export default Header;