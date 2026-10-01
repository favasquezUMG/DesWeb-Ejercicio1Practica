function Tarjeta({ titulo, descripcion }) {
  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default Tarjeta;