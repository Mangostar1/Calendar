/* 
  This object controls the language in the entire app. If you need to change it, you just need to replace 'languageHandler.es./' with 'languageHandler.en./'.

  This object is used in:

    index.js --> line: 108, 109, 194, 195, 196, 211, 212, 222, 223, 264. 265. 266, 291, 292, 293, 312, 313, 329, 330, 357, 358.

    DayComponent.js --> line: 70

    WeekComponent.js --> line: 12

    MonthComponent.js --> line: 32

    YearComponent.js --> line: 12 (don't change line 14 and 15)

*/

const languageHandler = {
  es: {
    prep: ["de", "del"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNameShort: [
      { day: "Lun" },
      { day: "Mar" },
      { day: "Mié" },
      { day: "Jue" },
      { day: "Vie" },
      { day: "Sáb" },
      { day: "Dom" },
    ],
    weekAbbreviations: [
      { day: "L" },
      { day: "M" },
      { day: "M" },
      { day: "J" },
      { day: "V" },
      { day: "S" },
      { day: "D" },
    ],
  },
  en: {
    prep: ["in", "of"],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNameShort: [
      { day: "Mon" },
      { day: "Tue" },
      { day: "Wed" },
      { day: "Thu" },
      { day: "Fri" },
      { day: "Sat" },
      { day: "Sun" },
    ],
    weekAbbreviations: [
      { day: "M" },
      { day: "T" },
      { day: "W" },
      { day: "T" },
      { day: "F" },
      { day: "S" },
      { day: "S" },
    ],
  },
};

export default languageHandler;
