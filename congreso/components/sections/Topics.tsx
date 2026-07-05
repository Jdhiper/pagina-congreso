import Container from "../ui/Container";
import { topics } from "@/data/topics";
import Button from "../ui/Button";

export default function Topics() {
  return (
    <section className="bg-[#F8F8F7] py-16">

      <Container>

        <div className="mb-10 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            Ejes temáticos
          </span>

          <h2 className="mt-3 font-playfair text-3xl md:text-4xl text-dark">
            Temas principales
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {topics.map((topic) => (

            <div
              key={topic.title}
              className="
                rounded-3xl
                bg-white
                border
                border-[#D9B471]/20
                p-5
              "
            >

              <div className="text-3xl">

                {topic.icon}

              </div>

              <h3 className="mt-4 font-semibold text-dark leading-snug">

                {topic.title}

              </h3>

              <p className="mt-3 text-xs text-gray-500">

                {topic.day}

                <br />

                {topic.session}

              </p>

            </div>

          ))}

        </div>

          <div className = "text-center">
            <Button
                href="/programacion"
                className="mt-10"
            >
                Ver programación
            </Button>
          </div>



      </Container>

    </section>
  );
}