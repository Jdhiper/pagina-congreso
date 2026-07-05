import Button from "../ui/Button";
import Container from "../ui/Container";

const topics = [
  "Inteligencia Artificial",
  "Dogmática y Proceso Penal",
  "Justicia Restaurativa y Víctimas",
  "Régimen Probatorio",
  "Allanamientos y Negociaciones",
  "Derechos Fundamentales",
  "Casación Penal",
  "Perspectiva de Género",
];

export default function Topics() {
  return (
    <section className="bg-white py-20">

  <Container>

    <div className="mx-auto max-w-3xl text-center">

      <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
        Programación Académica
      </span>

      <h2 className="mt-4 font-playfair text-4xl text-[#1B2126]">
        Ejes Temáticos
      </h2>

    </div>

    <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-4">

      {topics.map((topic) => (

        <button
          key={topic}
          className="
            rounded-full
            border
            border-[#D9B471]
            bg-white
            px-7
            py-4
            text-[#1B2126]
            transition-all
            duration-300
            hover:bg-[#AF8428]
            hover:text-white
            hover:border-[#AF8428]
          "
        >
          {topic}
        </button>

      ))}

    </div>

    <div className="mt-12 text-center">

      <Button href="/programacion">
        Ver programación completa
      </Button>

    </div>

  </Container>

</section>
  );
}