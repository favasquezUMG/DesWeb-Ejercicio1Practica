import Header from "./components/Header";
import Hero from "./components/Hero";
import SeccionServicios from "./components/SeccionServicios";
import FormularioContacto from "./components/FormularioContacto";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SeccionServicios />
        <FormularioContacto />
      </main>
      <Footer />
    </>
  );
}

export default App;