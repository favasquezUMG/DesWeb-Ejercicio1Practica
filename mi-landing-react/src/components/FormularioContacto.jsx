import { useState } from "react";

function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensajeEstado, setMensajeEstado] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (nombre.trim().length < 2) {
      setMensajeEstado("El nombre es muy corto.");
      return;
    }

    if (!email.includes("@")) {
      setMensajeEstado("Ingresa un correo válido.");
      return;
    }

    setMensajeEstado(`¡Gracias, ${nombre}! Te contactaremos a ${email}.`);
    setNombre("");
    setEmail("");
  }

  return (
    <section id="contacto" className="contacto">
      <form onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar</button>
      <p>{mensajeEstado}</p>
    </form>
    </section>
  );
}

export default FormularioContacto;