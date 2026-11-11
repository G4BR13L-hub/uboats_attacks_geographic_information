import Papa from "papaparse";

export function leerCSV(url, colLat, colLon, colFecha) {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.text())
      .then((texto) => {
        const datos = [];
        Papa.parse(texto, {
          header: true,
          skipEmptyLines: true,
          step: function (results) {
            const f = results.data;
            let lat = parseFloat(f[colLat]);
            let lon = parseFloat(f[colLon]);
            let coordsFaltantes = false;

            if (isNaN(lat) || isNaN(lon)) {
              lat = 56.0;
              lon = 2.0;
              coordsFaltantes = true;
            }

            if (!coordsFaltantes) {
              // Atlántico Norte (Europa y Norteamérica)
              if (lat > 30 && lat < 75 && lon > 12 && lon < 85) {
                if (lat > 65 && lon > 15) {
                  // Mar de Barents / Rusia
                } else {
                  lon = -lon;
                }
              }
              // Caribe, Golfo de México hasta las Antillas (Hueco de 45 a 55 cerrado)
              else if (lat >= 8 && lat <= 30 && lon > 45 && lon < 98) {
                lon = -lon;
              }
              // Atlántico Medio y África Occidental
              else if (lat > 0 && lat < 30 && lon > 5 && lon <= 45) {
                lon = -lon;
              }
              // Atlántico Sur (Brasil / Argentina)
              else if (lat > -45 && lat <= 0 && lon > 12 && lon < 65) {
                lon = -lon;
              }
              // Golfo de Vizcaya y Península Ibérica
              else if (lat > 30 && lat < 51 && lon > 0 && lon < 10) {
                lon = -lon;
              }
            }

            const fecha = new Date(f[colFecha]);
            if (!isNaN(fecha.getTime())) {
              datos.push({ lat, lon, fecha, raw: f, coordsFaltantes });
            }
          },
          complete: function () {
            datos.sort((a, b) => a.fecha - b.fecha);
            resolve(datos);
          },
        });
      });
  });
}

export function leerCSVCrudo(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.text())
      .then((texto) => {
        Papa.parse(texto, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            resolve(results.data);
          },
        });
      });
  });
}
