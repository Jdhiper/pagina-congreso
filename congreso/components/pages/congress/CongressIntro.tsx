import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CongressIntro() {
  return (
    <section className="bg-[#F2F2F1] py-24">

      <Container>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Información */}

          <div>

            <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
              III Jornadas Iberoamericanas
            </span>

            <h2 className="mt-5 font-playfair text-4xl leading-tight text-[#1B2126] md:text-5xl">
              Un encuentro académico que conecta a Iberoamérica alrededor del Derecho Procesal Penal.
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              Las III Jornadas Iberoamericanas de Derecho Procesal Penal,
              con énfasis en Inteligencia Artificial, reúnen magistrados,
              jueces, fiscales, docentes, investigadores, abogados y
              estudiantes de diferentes países para analizar los principales
              retos que enfrenta la justicia penal en la actualidad.

            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">

              Durante el congreso se desarrollarán conferencias, paneles y
              espacios de diálogo académico con expertos provenientes de
              Alemania, Argentina, Brasil, Chile, Colombia, Ecuador,
              España, Estados Unidos, México y Perú.

            </p>

            <Button
              href="/programacion"
              className="mt-10"
            >
              Ver programación
            </Button>

          </div>

          {/* Cifras */}

          <div className="space-y-10">

            {[
              ["90+", "Ponentes nacionales e internacionales"],
              ["3", "Sedes presenciales"],
              ["15", "Ejes temáticos"],
              ["10.000+", "Participantes en ediciones anteriores"],
              ["500", "Cupos presenciales en Pasto"],
            ].map(([number, text]) => (

              <div
                key={text}
                className="border-b border-[#D9B471]/30 pb-6"
              >

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