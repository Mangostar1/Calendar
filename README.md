# Calendar

Este calendario tiene como objetivo permitir la programación y consulta de eventos. Con esta herramienta, podrás agregar y visualizar fácilmente los eventos que desees.

[Web](https://mangostar1.github.io/Calendar/)

[GitHub](https://github.com/Mangostar1/Calendar)

## Instalacion

Para instalar este proyecto, sigue los siguientes pasos:

1. Copia la carpeta "src" junto con su archivo "index.html" en la raíz de tu proyecto.
2. Abre el archivo "UrlToFetch.js" ubicado en "src/helpers/UrlToFetch.js" y asigna la URL de tu API a la constante `URL`. Esto permitirá que el calendario cargue los eventos en pantalla.

Ten en cuenta que este proyecto maneja los eventos en formato JSON, el cual debe seguir el siguiente formato:

```
"events": [
    {
        "id": 1,
        "dateStartEvent": "2022-10-17",
        "hourStart": "00:30:00",
        "dateFinishEvent": "2022-10-17",
        "hourFinish": "00:59:00",
        "title": "Ejemplo de titulo 1",
        "description": "Ejemplo de descripcion 1",
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

Para personalizar el idioma de la interfaz del calendario, siga estos pasos sencillos:

1. Abra el archivo `src/i18n/en-es.js` en su editor de código preferido.
2. Dentro del archivo, encontrará un objeto que contiene las configuraciones de idioma.
3. También encontrará un comentario detallado que explica cómo cambiar el idioma de la interfaz.
4. De manera predeterminada, la interfaz está en español, pero puede cambiarla al inglés siguiendo las instrucciones del comentario.

Con esta fácil configuración, puede adaptar rápidamente la herramienta a su idioma preferido.

*Cabe destacar que este proyecto no utiliza dependencias de NPM, librerías ni frameworks, y está desarrollado completamente en Javascript vanilla.*

## Uso

El calendario cuenta con cuatro vistas disponibles: diaria, semanal, mensual y anual. Cada vista incluye dos botones para navegar entre las fechas del calendario, así como un encabezado (h1) que muestra la fecha actual.

Si el calendario está conectado a una API que suministre eventos, éstos se visualizarán en el calendario de dos formas diferentes. En primer lugar, se mostrará un botón con un título breve en la fecha y hora del evento. Al hacer clic en este botón, se abrirá una ventana modal que mostrará información detallada sobre el evento, como el título, la descripción, la hora de inicio y finalización, entre otros.

Además, es posible agregar eventos directamente en el calendario haciendo clic en el día deseado. Al hacer esto, se abrirá una ventana modal en la que se podrán agregar los detalles del evento.

## Requisitos

Para utilizar este calendario, necesitarás tener instalado un servidor web y un navegador web moderno como Google Chrome, Mozilla Firefox o Microsoft Edge. Este proyecto no hace uso de dependencias NPM, librerías ni frameworks, está todo construido en Javascript vanilla.

## Licencia

Este proyecto está bajo la Licencia Pública General de GNU (GPLv3), versión 3, 29 de junio de 2007. La licencia establece los términos y condiciones para el uso, la copia, la modificación y la distribución del software, así como los derechos y responsabilidades que se aplican a cualquier persona que lo utilice. Consulte el archivo `LICENSE` en la raíz del proyecto para obtener más información.