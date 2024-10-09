/*--------------------------------------------------------------------------*/
/* 
  Description:
  This URL is used to send a request to the server, which will return the 
  scheduling data stored in the database.

  Details:
  - The specified endpoint in this URL must be properly configured to handle 
    requests related to retrieving scheduling information.

  Note:
  Make sure the server is running and that the endpoint here matches the API 
  configuration in the backend.
*/
/*--------------------------------------------------------------------------*/


const URL = `https://mangostar1.github.io/Calendar/basicStructure.json`;

export default URL;

//<-- Main URL, JSON https://mangostar1.github.io/Calendar/basicStructure.json
//<-- https://calendar-servidor-production.up.railway.app

/*

  DEV URL API SERVER: 

    1.- http://localhost:5001 <-- main url, nada especial aca 

    2.- http://localhost:5001/schedule <-- url para GET de la info del calendario y para el POST

*/