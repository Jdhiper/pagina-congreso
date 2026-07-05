import Container from "../ui/Container";
import Button from "../ui/Button";

export default function AboutCongress() {
  return (
    <section className="relative bg-[#F2F2F1] py-24">

      <Container>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Texto */}

          <div>

            <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
              Sobre el Congreso
            </span>

            <h2 className="mt-5 font-playfair text-4xl leading-tight text-[#1B2126] md:text-5xl">

              Un espacio de diálogo académico para fortalecer el Derecho Procesal Penal en Iberoamérica.

            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              Las III Jornadas Iberoamericanas de Derecho Procesal Penal reunirán
              magistrados, jueces, fiscales, docentes, investigadores y
              profesionales de diferentes países para analizar los principales
              desafíos que enfrenta el proceso penal, con un especial énfasis en
              la Inteligencia Artificial y las nuevas dinámicas de la justicia.

            </p>

            <Button
              href="/congreso"
              className="mt-10"
            >
              Conocer el Congreso
            </Button>

          </div>

          {/* Datos */}

            <div className="space-y-10">

            {[
                ["8", "Ejes temáticos"],
                ["3", "Sedes presenciales"],
                ["+10.000", "Asistentes en ediciones anteriores"],
                ["2026", "Nueva edición"],
            ].map(([number, text]) => (

                <div key={text} className="border-b border-[#D9B471]/30 pb-6">

                <p className="font-playfair text-6xl text-[#AF8428]">
                    {number}
                </p>

                <p className="mt-2 text-lg text-gray-600">
                    {text}
                </p>

                </div>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}