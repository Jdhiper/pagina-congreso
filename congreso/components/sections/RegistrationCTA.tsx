import Button from "../ui/Button";
import Container from "../ui/Container";

export default function RegistrationCTA() {
  return (
    <section className="py-16">

      <Container>

        <div
          className="
            overflow-hidden
            rounded-[36px]
            bg-[#1B2126]
            px-8
            py-12
            text-center
            relative
          "
        >

          <div
            className="
              absolute
              left-1/2
              top-0
              h-40
              w-40
              -translate-x-1/2
              rounded-full
              bg-[#D9B471]/20
              blur-3xl
            "
          />

          <div className="relative">

            <span className="text-sm uppercase tracking-[0.35em] text-[#D9B471]">

              Inscripciones

            </span>

            <h2 className="mt-4 font-playfair text-3xl text-white">

              Participe en las III Jornadas

            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-300">

              Inscripción gratuita para asistentes presenciales y virtuales.

            </p>

            <Button
              href="https://forms.cloud.microsoft/r/00RS9Lhvjp?origin=QRCode&qrcodeorigin=presentation"
              className="mt-8"
            >

              Inscribete

            </Button>

          </div>

        </div>

      </Container>

    </section>
  );
}