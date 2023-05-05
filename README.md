# Calendar

Este calendario que tiene como fin, poder ser utilizado para agendar y consultar eventos que nosotros le ingresemos.

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
    }
]
```

Cabe destacar que este proyecto no utiliza dependencias de NPM, librerías ni frameworks, y está desarrollado completamente en Javascript vanilla.

## Uso

Este calendario cuenta con un selector que permite elegir una de cuatro opciones o vistas, las cuales son: vista diaria, vista semanal, vista mensual y vista anual.

Cada vista cuenta con dos botones los cuales permiten navegar entre las fechas del calendario y un h1 que permite visualizar la fecha actual.

Al estar conectado a una API que le pase eventos, estos serán visualizados en el calendario de dos maneras, inicialmente se podrá ver un botón con un breve título en el año, mes, día y hora del evento, que al ser presionado abrirá una ventana modal que mostrara más detalles del evento como el título, la descripción del evento, la hora y fecha de inicio y fin.

Además, es posible agregar eventos simplemente haciendo click al día en el que se quiere agregar el evento. Hacer esto abrirá una ventana modal en la cual se podrá poner los detalles de este evento.

## Requisitos

lorem