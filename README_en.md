# Calendar

This calendar aims to enable scheduling and event consultation. With this tool, you can easily add and view the events you want.

[Web](https://mangostar1.github.io/Calendar/)

[GitHub](https://github.com/Mangostar1/Calendar)

## Installation

To install this project, follow these steps:

1. Copy the `src` folder along with its "index.html" file to the root of your project.
2. Open the "UrlToFetch.js" file located at "src/helpers/UrlToFetch.js" and assign your API URL to the `URL` constant. This will allow the calendar to load the events on the screen.

Keep in mind that this project handles events in JSON format, which must follow the following structure:

```
"events": [
    {
        "id": 1,
        "dateStartEvent": "2022-10-17",
        "hourStart": "00:30:00",
        "dateFinishEvent": "2022-10-17",
        "hourFinish": "00:59:00",
        "title": "Example title 1",
        "description": "Example description 1",
        "statusInformation": {
            "statusCode": "001",
            "status": "activo",
            "colorStatus": "green"
        },
        "typeInformation": {
            "type": "0001",
            "colorBackgroundType": "#0096a6",
            "colorType": "white"
        }
    },
]
```

To customize the language of the calendar interface, follow these simple steps:

1. Open the `src/i18n/en-es.js` file in your preferred code editor.
2. Inside the file, you will find an object that contains the language settings.
3. You will also find a detailed comment explaining how to change the language of the interface.
4. By default, the interface is in Spanish, but you can change it to English by following the instructions in the comment.

With this easy setup, you can quickly adapt the tool to your preferred language.

*It is worth noting that this project does not use NPM dependencies, libraries, or frameworks, and is developed entirely in vanilla JavaScript.*

## Usage

The calendar has four available views: daily, weekly, monthly, and yearly. Each view includes two buttons to navigate between calendar dates, as well as an h1 header displaying the current date.

If the calendar is connected to an API that provides events, they will be displayed in two different ways. First, a button with a brief title will be shown on the event's date and time. Clicking on this button will open a modal window displaying detailed information about the event, such as the title, description, start and end time, among others.

Additionally, it is possible to add events directly to the calendar by clicking on the desired day. By doing this, a modal window will open where you can add event details.

## Requirements

To use this calendar, you will need to have a web server installed and a modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft Edge. This project does not rely on NPM dependencies, libraries, or frameworks; it is entirely built with vanilla JavaScript.

## License

This project is licensed under the GNU General Public License (GPLv3), version 3, June 29, 2007. The license establishes the terms and conditions for the use, copying, modification, and distribution of the software, as well as the rights and responsibilities that apply to anyone using it. Please refer to the `LICENSE` file in the project's root for more information.