export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "EducationEvent",

    name: "III Jornadas Iberoamericanas de Derecho Procesal Penal",

    description:
      "Congreso internacional de Derecho Procesal Penal con énfasis en Inteligencia Artificial.",

    eventAttendanceMode:
      "https://schema.org/MixedEventAttendanceMode",

    eventStatus:
      "https://schema.org/EventScheduled",

    startDate: "2026-08-13",

    endDate: "2026-11-19",

    image: [
      "https://www.jornadasiberoamericanasdederechoprocesalpenal.com/images/og-image.jpg",
    ],

    url: "https://www.jornadasiberoamericanasdederechoprocesalpenal.com",

    organizer: {
      "@type": "Organization",

      name: "III Jornadas Iberoamericanas de Derecho Procesal Penal",
    },

    location: [
      {
        "@type": "Place",

        name: "Universidad CESMAG",

        address: {
          "@type": "PostalAddress",

          addressLocality: "Pasto",

          addressCountry: "CO",
        },
      },

      {
        "@type": "Place",

        name: "Envigado",

        address: {
          "@type": "PostalAddress",

          addressLocality: "Envigado",

          addressCountry: "CO",
        },
      },

      {
        "@type": "Place",

        name: "Guadalajara",

        address: {
          "@type": "PostalAddress",

          addressLocality: "Guadalajara",

          addressCountry: "MX",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}