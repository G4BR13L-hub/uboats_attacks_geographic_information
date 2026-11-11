# IIGM U-Boat Operations

Una visualización interactiva de las operaciones submarinas de la Kriegsmarine durante la Segunda Guerra Mundial. Este proyecto transforma miles de registros históricos de ataques navales en un "dashboard" táctico, combinando el renderizado de la Tierra en 3D con líneas de tiempo, métricas en tiempo real y una enciclopedia histórica sobre los u-boats y los más destacados comandantes de la contienda.

---

## Demostración en Vídeo
[![Ver vídeo de demostración](https://img.youtube.com/vi/YMu83_GW1oM/maxresdefault.jpg)](https://youtu.be/YMu83_GW1oM)

## Características Principales

### Globo 3D y Shaders
* **Renderizado WebGL con Three.js:** La Tierra renderizada con controles orbitales suaves (`OrbitControls`), textura de alta resolución y un skydome estelar.
* **Atmósfera Dinámica:** Implementación de un Custom Shader de resplandor, un halo atmosférico con efecto de pulso temporal.
* **Post-procesado (Unreal Bloom):** Los ataques submarinos brillan en la superficie del océano en rojo utilizando efectos de post-procesado integrados.

### Línea de Tiempo
* **Scrubber Interactivo:** Deslizador de tiempo que permite avanzar, retroceder o pausar la campaña. La interfaz detecta si estás arrastrando el ratón e ilumina un tooltip con el día exacto de la simulación.
* **Regla Dinámica y Marcadores:** Generación de los años de la guerra bajo el deslizador. Los eventos clave aparecen como puntos rojos en la barra; al hacer clic, el mapa viaja directamente a esa fecha.
* **Multiplicador de Velocidad:** Menú con `lil-gui` para alterar la velocidad de reproducción, pausar la simulación o reiniciar el motor al 15 de agosto de 1939.

### Bandeja de Eventos Históricos
* **Tarjetas Deslizantes:** Cuando el reloj global cruza fechas clave (Ej: El Mayo Negro, Día D, Paukenschlag), desciende una tarjeta "Alto Secreto" explicando el contexto. Desaparece tras 6 días de simulación o al cerrarla manualmente.
* **Sistema de Notificaciones:** Panel lateral asíncrono. Los eventos descartados se guardan en la "Bandeja de Enigma" (con un globo de recuento de estilo moderno) que permite borrar mensajes leídos y revisar el historial de la guerra sin obstruir el mapa.

### Enciclopedia
* **U-Boats con Especificaciones Tácticas:** Panel con fichas técnicas de todas las clases de submarinos alemanes (Tipos II, VII, IX, XXI, etc.), con fotos envejecidas mediante filtros CSS en sepia y escala de grises.
* **Ases de las Profundidades:** Fichas bibliográficas de los comandantes más destacados, integradas en el mismo menú.

### Procesamiento de Datos
* **Lectura asíncrona:** Integración con `PapaParse` para las miles de líneas CSV y optimizar el rendimiento.
* **Algoritmo de Corrección Espacial:** Lógica avanzada en `data-loader.js` que audita coordenadas erróneas de los archivos históricos originales, corrigiendo inversiones de latitud/longitud en zonas conflictivas (Mar de Barents, Golfo de México, Mar Caribe) antes de proyectarlas al globo.
* **Raycasting:** Detección de colisiones del ratón con las partículas para mostrar tarjetas flotantes con los datos de las naves hundidas, tripulación, supervivientes y bandera.

---

## Arquitectura del Proyecto

El código está refactorizado en módulos puros para garantizar su mantenibilidad:

* `index.html`: La estructura del DOM, estilos unificados (CSS), pantalla de carga, modales, paneles laterales y los controles HUD.
* `main.js`: Inicializa la escena 3D, el bucle de animación, las físicas, colisiones de ratón y coordina los eventos temporales.
* `data-loader.js`: Módulo aislado que obtiene y limpia los archivos CSV.
* `database.js`: Base de datos estática con especificaciones de u-boats, comandantes e hitos históricos, además de inyectar el comportamiento a los menús de la interfaz.

---

## Recursos y Assets Utilizados

**Datos (.csv)**
* `uboat-data.csv`: Astilleros de origen y clasificaciones técnica de cada u-boat, con su nomenclatura y tipo entre otros datos.
* `uboat-target-data.csv`: Registros de hundimientos con fechas, coordenadas, toneladas, bajas, etc.

**Modelos y Texturas**
* `dia.jpg`: Mapa cilíndrico de la Tierra (Color map).
* `stars.jpg`: Fondo estelar para el skydome.
* `spark1.png`: Textura alpha para los puntos de ataque en el renderizador de partículas.
* `uboat-VIIC.glb`: Modelo 3D optimizado que navega por el globo.
  `Submarine by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/dfSQmeuuYt3)`
* Fotografías JPG: Colección de imágenes locales (`U-97.jpg`, `U-505.jpg`, etc.).

**Librerías**
* `three`
* `lil-gui`
* `papaparse`

---

## Desarrollo y uso de Inteligencia Artificial

Este proyecto ha sido desarrollado utilizando el entorno de desarrollo en la nube **CodeSandbox**: [https://codesandbox.io/p/sandbox/uboats-jqrjv6](url)

Adicionalmente, el desarrollo ha contado con el apoyo de herramientas de **Inteligencia Artificial** aplicadas a:
* **Refactorización y arquitectura de software:** Optimización de las funciones matemáticas, refatorización del código.
* **Redacción y revisión histórica:** Escritura, corrección de estilo de los textos descriptivos para la enciclopedia de submarinos, fichas de comandantes y contexto de los eventos históricos.

---
