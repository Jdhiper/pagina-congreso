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

export const schedule = {
  pasto: {
    "13": [
      {
        title: "Jornada de la mañana",
        theme: "Jueces en los Estados Constitucionales de Derecho",

        events: [
          {
            time: "08:00",
            title: "Acto inaugural",
            subtitle:
              "Himnos • Escuela de niños Alcaldía • Presidentes de tres Tribunales",
            type: "opening",
          },

          {
            time: "08:30",
            speaker: "Miguel Polo Rosero",
            position: "Magistrado Corte Constitucional",
            country: "Colombia",
            type: "talk",
          },

          {
            time: "09:10",
            speaker: "Sergio Iván Estrada Veléz",
            position:
              "Profesor de Teoría del Derecho, Derecho Constitucional, Principialística y Hermenéutica Jurídica",
            type: "talk",
          },

          {
            time: "09:50",
            title: "Café",
            type: "coffee",
          },

          {
            time: "10:10",
            speaker: "Ingo Bott",
            position: "Abogado",
            country: "Alemania · Virtual",
            type: "talk",
          },

          {
            time: "10:40",
            speaker: "José Luis Álvarez Pulido",
            position: "Presidente Tribunal de Jalisco",
            country: "México",
            type: "talk",
          },

          {
            time: "11:20",
            speaker: "Franco Solarte Portilla",
            position:
              "Magistrado Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
            country: "Colombia",
            type: "talk",
          },

          {
            time: "12:00",
            title: "Panel de preguntas",
            type: "panel",
          },
        ],
      },

      {
        title: "Jornada de la tarde",
        theme: "Justicia Restaurativa",

        events: [
          {
            time: "14:00",
            speaker: "Diego Alejandro Palacios Parra",
            position: "Docente Universidad de Nariño",
            type: "talk",
          },

          {
            time: "14:40",
            speaker: "Guillermo Martínez Montes",
            position:
              "Juez Tercero Penal Municipal con Función de Control de Garantías de Itagüí",
            type: "talk",
          },

          {
            time: "15:20",
            speaker: "Leonardo Efraín Cerón",
            position:
              "Magistrado Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
            type: "talk",
          },

          {
            time: "16:00",
            speaker: "Álvaro Hernando Ramírez Montúfar",
            position:
              "Doctor en Derecho • Docente Universidad CESMAG",
            type: "talk",
          },

          {
            time: "16:40",
            title: "Panel de preguntas",
            type: "panel",
          },

          {
            time: "17:15",
            title: "Cierre cultural",
            subtitle: "Banda Sinfónica Departamental",
            type: "closing",
          },
        ],
      },
    ],

    "14": [
      {
        title: "Jornada de la mañana",
        theme: "Enfoques Diferenciales",

        events: [
          {
            time: "08:00",
            speaker: "Elsa Guerra Rodríguez",
            position: "Docente • PhD",
            country: "Ecuador",
            type: "talk",
          },

          {
            time: "08:40",
            speaker: "Fernando Bolaños Palacios",
            position: "Magistrado Sala Penal Corte Suprema de Justicia",
            country: "Colombia",
            type: "talk",
          },

          {
            time: "09:20",
            speaker:
              "Blanca Lidia Arellano Moreno · Mirtha Lucía Ceballos Valencia",
            position:
              "Magistradas Sala Penal Tribunal Superior del Distrito Judicial de Pasto",
            type: "talk",
          },

          {
            time: "10:00",
            title: "Café",
            type: "coffee",
          },

          {
            time: "10:20",
            speaker: "Ana Lucía Paz Casanova",
            position: "Docente Universidad Mariana",
            type: "talk",
          },

          {
            time: "11:00",
            speaker: "Juez Mexicana",
            position: "Por confirmar",
            type: "talk",
          },

          {
            time: "11:40",
            title: "Panel de preguntas",
            type: "panel",
          },
        ],
      },

      {
        title: "Jornada de la tarde",
        theme: "Inteligencia Artificial y Justicia",

        events: [
          {
            time: "14:00",
            speaker: "Wilson Danilo Ibarra Rosero",
            position: "Docente Universidad Cooperativa",
            type: "talk",
          },

          {
            time: "14:40",
            speaker: "Omar Alfonso Cárdenas Caycedo",
            position: "Docente Universidad de Nariño",
            type: "talk",
          },

          {
            time: "15:20",
            speaker: "José Joaquín Urbano Martínez",
            position: "Magistrado Sala Penal Corte Suprema de Justicia",
            type: "talk",
          },

          {
            time: "16:00",
            title: "Café",
            type: "coffee",
          },

          {
            time: "16:30",
            speaker: "Diego Eduardo López Medina",
            position: "Docente Universidad de los Andes (Por confirmar)",
            type: "talk",
          },

          {
            time: "17:10",
            title: "Panel de preguntas",
            type: "panel",
          },

          {
            time: "19:00",
            title: "Agenda social",
            subtitle: "Reconocimiento • Cena • Orquesta",
            type: "closing",
          },
        ],
      },
    ],
  },

  envigado: {},

  jalisco: {},
};