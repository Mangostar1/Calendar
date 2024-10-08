/* 
  Description:
  This object manages the language settings for the entire application. 
  To change the language, simply replace 'languageHandler.es' with 'languageHandler.en' 
  (or any other language handler you need).

  Usage:
  This object is referenced in the following files and lines:

    - index.js:
      Lines: 108, 109, 194, 195, 196, 211, 212, 222, 223, 264, 265, 266, 291, 292, 
             293, 312, 313, 329, 330, 357, 358

    - DayComponent.js:
      Line: 70

    - WeekComponent.js:
      Line: 12

    - MonthComponent.js:
      Line: 32

    - YearComponent.js:
      Line: 12 
      (Note: Do not modify lines 14 and 15)

  Important:
  Ensure you update all necessary instances where the language handler is used if 
  you decide to change the language setting.
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
