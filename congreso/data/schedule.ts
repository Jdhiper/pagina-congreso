export interface ScheduleEvent {
  time: string;
  title?: string;
  subtitle?: string;
  speaker?: string;
  position?: string;
  country?: string;
  type?: string;
}

export interface ScheduleBlock {
  title: string;
  theme: string;
  events: ScheduleEvent[];
}

export interface ScheduleData {
  pasto: Record<string, ScheduleBlock[]>;
  envigado: Record<string, ScheduleBlock[]>;
  jalisco: Record<string, ScheduleBlock[]>;
}

export const schedule: ScheduleData = {
  pasto: {
    "13": [
      {
        title: "Eje 1",
        theme: "Los jueces en los Estados Constitucionales de Derecho",

        events: [
          {
            time: "08:00",
            title: "Actos de instalación",
            type: "opening",
          },

          {
            time: "08:45",
            speaker: "Ingo Bott",
            position:
              "Abogado y Fundador de la Firma Plan A Kanzlei für Strafrecht",
            country: "Alemania",
            subtitle:
              "Papel del Tribunal en la práctica de la prueba en el proceso penal alemán.",
            type: "talk",
          },

          {
            time: "09:15",
            speaker: "Sergio Iván Estrada Vélez",
            position:
              "Director del Centro de Estudios Constitucionales",
            country: "Colombia",
            subtitle:
              "El juez del Estado Constitucional: la constitucionalización del derecho penal y la tutela contra providencia judicial.",
            type: "talk",
          },

          {
            time: "10:00",
            title: "Receso",
            type: "break",
          },

          {
            time: "10:20",
            speaker: "José Luis Álvarez Pulido",
            position:
              "Presidente del Supremo Tribunal de Justicia del Estado de Jalisco",
            country: "México",
            subtitle:
              "La evolución del juez penal en México: de la legalidad hacia la protección de los derechos humanos.",
            type: "talk",
          },

          {
            time: "10:55",
            speaker: "Franco Solarte Portilla",
            position:
              "Presidente del Tribunal Superior del Distrito Judicial de Pasto",
            country: "Colombia",
            subtitle:
              "El rol del juez en la acción de tutela y en el proceso penal en el marco del Estado Social de Derecho.",
            type: "talk",
          },

          {
            time: "11:30",
            title: "Panel de preguntas",
            subtitle: "11:30 a.m. – 12:10 p.m.",
            type: "panel",
          },

          {
            time: "12:10",
            title: "La solidaridad construye país",
            subtitle:
              "Trae tus donaciones que serán destinadas a los damnificados del terremoto del 10 de agosto de 2026.",
            type: "notice",
          },
        ],
      },

      {
        title: "Eje 2",
        theme: "Justicia Restaurativa",

        events: [
          {
            time: "14:15",
            speaker: "Diego Alejandro Palacios Parra",
            position:
              "Docente de Derecho Penal de la Universidad de Nariño",
            country: "Colombia",
            subtitle:
              "Entre la reparación y la acusación: el acusador privado como puente hacia una justicia penal restaurativa.",
            type: "talk",
          },

          {
            time: "14:50",
            speaker: "Guillermo Martínez Montes",
            position:
              "Juez Tercero Penal Municipal con Función de Control de Garantías de Itagüí",
            country: "Colombia",
            subtitle:
              "Una mirada a la Justicia Restaurativa en el contexto internacional.",
            type: "talk",
          },

          {
            time: "15:25",
            speaker: "Leonardo Efraín Cerón Eraso",
            position:
              "Magistrado Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
            country: "Colombia",
            subtitle:
              "La Justicia Restaurativa en el Sistema Interamericano de Derechos Humanos.",
            type: "talk",
          },

          {
            time: "16:00",
            title: "Receso",
            type: "break",
          },

          {
            time: "16:30",
            speaker: "Álvaro Hernando Ramírez Montúfar",
            position: "Docente de la Universidad CESMAG",
            country: "Colombia",
            subtitle:
              "¿Puede enseñarse la justicia restaurativa? Hacia una teoría de la cultura restaurativa.",
            type: "talk",
          },

          {
            time: "17:05",
            speaker: "Néstor Henrry Gutiérrez Miranda",
            position:
              "Abogado Litigante y Docente Universitario",
            country: "Perú",
            subtitle:
              "Justicia Restaurativa en Perú: Luces y Sombras.",
            type: "talk",
          },
        ],
      },
    ],

    "14": [
      {
        title: "Eje 3",
        theme: "Enfoques Diferenciales",

        events: [
          {
            time: "08:15",
            speaker: "Elsa Guerra Rodríguez",
            position:
              "Docente e Investigadora de la Universidad Andina Simón Bolívar",
            country: "Ecuador",
            subtitle:
              "Enfoques diferenciales y acceso a la justicia.",
            type: "talk",
          },

          {
            time: "08:50",
            speaker: "Fernando Bolaños Palacios",
            position:
              "Magistrado de la Sala de Casación Penal de la Corte Suprema de Justicia",
            country: "Colombia",
            subtitle:
              'Violencias "diferenciales" y algunas cuestiones probatorias.',
            type: "talk",
          },

          {
            time: "09:25",
            speaker: "Blanca Lidia Arellano Moreno",
            position:
              "Presidenta Sala Penal del Tribunal Superior del Distrito Judicial de Pasto",
            country: "Colombia",
            subtitle:
              "Efecto Olimpia: el reto de asumir la violencia digital como delito.",
            type: "talk",
          },

          {
            time: "09:45",
            speaker: "Mirtha Lucía Ceballos Valencia",
            position:
              "Juez Sexta Penal Municipal con Función de Control de Garantías de Pasto",
            country: "Colombia",
            subtitle:
              "El enfoque diferencial: desafíos y perspectivas para la administración de justicia.",
            type: "talk",
          },

          {
            time: "10:05",
            title: "Receso",
            type: "break",
          },

          {
            time: "10:35",
            speaker: "Ana Lucía Paz Casanova",
            position:
              "Docente e Investigadora de la Universidad Mariana",
            country: "Colombia",
            subtitle:
              "Enfoque diferencial y de género en la era de la inteligencia artificial: retos para una justicia sin sesgos.",
            type: "talk",
          },

          {
            time: "11:10",
            speaker: "Miriam Rincón Ochoa",
            position:
              "Magistrada del Supremo Tribunal de Justicia de Jalisco",
            country: "México",
            subtitle:
              "Juzgar con Perspectiva de Género en tiempos de Inteligencia Artificial.",
            type: "talk",
          },

          {
            time: "11:45",
            title: "Panel de preguntas",
            subtitle: "11:45 a.m. – 12:25 p.m.",
            type: "panel",
          },
        ],
      },

      {
        title: "Eje 4",
        theme: "Inteligencia Artificial y Justicia",

        events: [
          {
            time: "14:30",
            speaker: "Wilson Danilo Ibarra Rosero",
            position:
              "Coordinador de Posgrados de la Facultad de Derecho de la Universidad Cooperativa de Colombia, sede Pasto",
            country: "Colombia",
            subtitle:
              "Límites de la inteligencia artificial en la administración de justicia.",
            type: "talk",
          },

          {
            time: "15:05",
            speaker: "Omar Alfonso Cárdenas Caycedo",
            position: "Docente Universidad de Nariño",
            country: "Colombia",
            subtitle:
              "Recomendaciones éticas y técnicas para el uso de la Inteligencia Artificial.",
            type: "talk",
          },

          {
            time: "15:40",
            title: "Receso",
            type: "break",
          },

          {
            time: "16:10",
            speaker: "Aldair José Bueno Atencio",
            position:
              "Abogado y Conferencista en temas penales y derechos humanos",
            country: "Colombia",
            subtitle:
              "Análisis de los retos y responsabilidades del uso e implementación de la IA en el litigio y en la toma de decisiones judiciales.",
            type: "talk",
          },

          {
            time: "16:45",
            title: "Panel de preguntas",
            subtitle: "4:45 – 5:25 p.m.",
            type: "panel",
          },

          {
            time: "17:25",
            title: "Cierre cultural",
            type: "closing",
          },
        ],
      },
    ],
  },

envigado: {
  septiembre: [
    {
      title: "22 de septiembre",
      theme: "Inteligencia Artificial y Derecho",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },

    {
      title: "23 de septiembre",
      theme: "Dogmática y Proceso Penal",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },

    {
      title: "24 de septiembre",
      theme: "Justicia Restaurativa y Víctimas",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },
  ],

  octubre: [
    {
      title: "20 de octubre",
      theme: "Régimen Probatorio en el Sistema Penal",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },

    {
      title: "21 de octubre",
      theme: "Allanamientos, Negociaciones y Reparación Integral",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },

    {
      title: "22 de octubre",
      theme: "Derechos Fundamentales, Convencionalidad y Proceso Penal",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },

    {
      title: "23 de octubre",
      theme: "Casación Penal",
      events: [
        {
          time: "",
          title: "",
          subtitle:
            "",
          type: "info",
        },
      ],
    },
  ],
},
  jalisco: {},
};