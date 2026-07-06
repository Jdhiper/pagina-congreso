import Container from "@/components/ui/Container";

const topics = [
  "Inteligencia Artificial y Justicia",
  "Dogmática y Proceso Penal",
  "Justicia Restaurativa y Víctimas",
  "Régimen Probatorio",
  "Allanamientos, Negociaciones y Reparación Integral",
  "Derechos Fundamentales",
  "Control de Constitucionalidad y Convencionalidad",
  "Casación Penal",
  "Perspectiva de Género",
  "Enfoques Diferenciales",
  "Jueces en los Estados Constitucionales",
  "Cooperación Judicial Internacional",
];

export default function CongressTopics() {
  return (
    <section className="bg-[#F8F8F7] py-24">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
            Contenido académico
          </span>

          <h2 className="mt-5 font-playfair text-4xl text-[#1B2126] md:text-5xl">
            Ejes temáticos del Congreso
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Durante las diferentes jornadas se desarrollarán conferencias,
            paneles y espacios académicos orientados a fortalecer el análisis
            del Derecho Procesal Penal desde una perspectiva nacional e
            internacional.
          </p>

        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-x-16 gap-y-8 md:grid-cols-2">

          {topics.map((topic) => (

            <div
              key={topic}
              className="border-b border-[#D9B471]/25 pb-6"
            >

              <div className="flex items-start gap-4">

                <div className="mt-3 h-2 w-2 rounded-full bg-[#AF8428]" />

                <h3 className="text-xl font-medium leading-8 text-[#1B2126]">
                  {topic}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}