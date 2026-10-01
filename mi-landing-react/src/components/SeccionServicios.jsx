import { useState, useEffect } from "react";
import Tarjeta from "./Tarjeta";

function SeccionServicios() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarClientes() {
      try {
        const respuesta = await fetch("https://desweb-ejercicio1practica.onrender.com/api/customer");

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const datos = await respuesta.json();
        setClientes(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarClientes();
  }, []);

  if (cargando) return <p>Cargando servicios...</p>;
  if (error) return <p>No se pudieron cargar los servicios: {error}</p>;

  return (
    <section id="servicios" className="servicios">
      <h2>Lista de Clientes</h2>
      <div className="tarjetas-container">
        {clientes.map((cliente) => (
          <Tarjeta
            key={cliente.id}
            titulo={`${cliente.nombre} ${cliente.apellido}`}
            descripcion={`Correo: ${cliente.correo} | Teléfono: ${cliente.telefono}`}
          />
        ))}
      </div>
    </section>
  );
}

export default SeccionServicios;