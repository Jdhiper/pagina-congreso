export interface Speaker {
  id: string;

  name: string;

  position: string;

  country: string;

  countryCode: string;

  image: string;

  featured?: boolean;

  phase?: ("Pasto" | "Envigado" | "Guadalajara")[];

  bio?: string;

  linkedin?: string;

  website?: string;

  x?: string;
}

export const speakers: Speaker[] = [
  {
    id: "miguel-polo-rosero",
    name: "Miguel Polo Rosero",
    position: "Magistrado Corte Constitucional",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/miguel-polo.jpg",
    featured: true,
    phase: ["Pasto"],
    website: "https://www.corteconstitucional.gov.co/noticia.php?miguel-polo-rosero-se-posesiona-como-nuevo-magistrado-de-la-corte-constitucional-9967="
  },

  {
    id: "sergio-ivan-estrada-velez",
    name: "Sergio Iván Estrada Veléz",
    position:
      "Profesor de Teoría del Derecho, Derecho Constitucional, Principialística y Hermenéutica Jurídica",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Estrada.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "ingo-bott",
    name: "Ingo Bott",
    position: "Abogado",
    country: "🇩🇪 Alemania",
    countryCode: "Alemania",
    image: "/images/speakers/Bott.webp",
    featured: true,
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "jose-luis-alvarez-pulido",
    name: "José Luis Álvarez Pulido",
    position: "Presidente Tribunal de Jalisco",
    country: "🇲🇽 México",
    countryCode: "México",
    image: "/images/speakers/alvarez.jpg",
    featured: true,
    phase: ["Pasto", "Guadalajara"],
    linkedin: ""
  },

  {
    id: "franco-solarte-portilla",
    name: "Franco Solarte Portilla",
    position:
      "Magistrado Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Solarte.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "diego-alejandro-palacios-parra",
    name: "Diego Alejandro Palacios Parra",
    position: "Docente Universidad de Nariño",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Palacios.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "guillermo-martinez-montes",
    name: "Guillermo Martínez Montes",
    position:
      "Juez Tercero Penal Municipal con Función de Control de Garantías de Itagüí",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Martinez.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "leonardo-efrain-ceron",
    name: "Leonardo Efraín Cerón",
    position:
      "Magistrado Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Ceron.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "alvaro-hernando-ramirez-montufar",
    name: "Álvaro Hernando Ramírez Montúfar",
    position: "Doctor en Derecho · Docente Universidad CESMAG",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Ramirez.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "elsa-guerra-rodriguez",
    name: "Elsa Guerra Rodríguez",
    position: "Docente · PhD",
    country: "🇪🇨 Ecuador",
    countryCode: "Ecuador",
    image: "/images/speakers/Guerra.webp",
    phase: ["Pasto"],
    linkedin: ""
  },
    {
    id: "fernando-bolanos-palacios",
    name: "Fernando Bolaños Palacios",
    position: "Magistrado Sala Penal Corte Suprema de Justicia",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/bolanos.jpg",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "blanca-lidia-arellano-moreno",
    name: "Blanca Lidia Arellano Moreno",
    position:
      "Magistrada Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Arellano.jpg",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "mirtha-lucia-ceballos-valencia",
    name: "Mirtha Lucía Ceballos Valencia",
    position:
      "Magistrada Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Ceballos.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "ana-lucia-paz-casanova",
    name: "Ana Lucía Paz Casanova",
    position: "Docente Universidad Mariana",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Paz.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "wilson-danilo-ibarra-rosero",
    name: "Wilson Danilo Ibarra Rosero",
    position: "Docente Universidad Cooperativa de Colombia",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Ibarra.webp", 
    /* encontrar imagen*/
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "omar-alfonso-cardenas-caycedo",
    name: "Omar Alfonso Cárdenas Caycedo",
    position: "Docente Universidad de Nariño",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Cardenas.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "jose-joaquin-urbano-martinez",
    name: "José Joaquín Urbano Martínez",
    position: "Magistrado Sala Penal Corte Suprema de Justicia",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/urbano.jpg",
    featured: true,
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "diego-eduardo-lopez-medina",
    name: "Diego Eduardo López Medina",
    position: "Docente Universidad de los Andes",
    country: "🇨🇴 Colombia",
    countryCode: "Colombia",
    image: "/images/speakers/Lopez.webp",
    phase: ["Pasto"],
    linkedin: ""
  },

  {
    id: "juez-mexicana",
    name: "Ponente por confirmar",
    position: "Representante del Poder Judicial de México",
    country: "🇲🇽 México",
    countryCode: "México",
    image: "/images/speakers/default.webp",
    phase: ["Pasto"],
    linkedin: ""
  },
];