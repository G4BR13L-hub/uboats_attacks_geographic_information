import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import {
  iniciarInterfaz,
  iniciarEnciclopedia,
  eventosHistoricos,
} from "./database.js";
import { leerCSV, leerCSVCrudo } from "./data-loader.js";

iniciarInterfaz();
iniciarEnciclopedia();

function LatLonToXYZ(lat, lon, radio) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radio * Math.sin(phi) * Math.cos(theta));
  const z = radio * Math.sin(phi) * Math.sin(theta);
  const y = radio * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const cartelFecha = document.getElementById("cartel-fecha");
const infoBox = document.getElementById("info-box");
const sliderTiempo = document.getElementById("slider-tiempo");
const tooltipFecha = document.getElementById("slider-tooltip");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.copy(LatLonToXYZ(50, 10, 20));

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.15,
  0.1,
  0.9
);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const textureLoader = new THREE.TextureLoader();
const dayTexture = textureLoader.load("/src/dia.jpg");
const flareTexture = textureLoader.load(
  "https://threejs.org/examples/textures/sprites/spark1.png"
);

const globeGeometry = new THREE.SphereGeometry(5, 64, 64);
const globeMaterial = new THREE.MeshStandardMaterial({
  map: dayTexture,
  roughness: 0.3,
  metalness: 0.15,
});
const earth = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(earth);

const starsTexture = textureLoader.load("/src/stars.jpg");
const skydomeGeo = new THREE.SphereGeometry(200, 64, 64);
const skydomeMat = new THREE.MeshBasicMaterial({
  map: starsTexture,
  side: THREE.BackSide,
});
const skydome = new THREE.Mesh(skydomeGeo, skydomeMat);
scene.add(skydome);

const haloUniforms = {
  time: { value: 0.0 },
  color: { value: new THREE.Color(0x38bdf8) },
};

const haloMaterial = new THREE.ShaderMaterial({
  uniforms: haloUniforms,
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
      float pulse = 0.7 + 0.3 * sin(time * 2.5); 
      gl_FragColor = vec4(color, intensity * pulse);
    }
  `,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  transparent: true,
  depthWrite: false,
});

const haloGeometry = new THREE.SphereGeometry(5.4, 64, 64);
const halo = new THREE.Mesh(haloGeometry, haloMaterial);
scene.add(halo);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 5, 10);
scene.add(dirLight);

let isDragging = false;

function actualizarTooltip() {
  const val = parseFloat(sliderTiempo.value);
  const min = parseFloat(sliderTiempo.min);
  const max = parseFloat(sliderTiempo.max);
  const percent = (val - min) / (max - min);

  const thumbWidth = 16;
  tooltipFecha.style.left = `calc(${percent * 100}% + (${
    0.5 - percent
  } * ${thumbWidth}px))`;

  const d = new Date(val);
  tooltipFecha.innerText = d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

sliderTiempo.addEventListener("mousedown", () => {
  isDragging = true;
  tooltipFecha.style.opacity = "1";
  actualizarTooltip();
});

sliderTiempo.addEventListener("input", (e) => {
  relojGlobal = parseFloat(e.target.value);
  indiceStats = 0;
  toneladasAcumuladas = 0;
  bajasAcumuladas = 0;
  document.getElementById("statTons").innerText = "0";
  document.getElementById("statBajas").innerText = "0";
  document.getElementById("historical-card").classList.remove("show");
  tiempoOcultarEvento = null;

  if (isDragging) actualizarTooltip();
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    tooltipFecha.style.opacity = "0";
  }
});

let relojGlobal = null;
let relojAnterior = null;
let particulasBombas, mallasUboats;
let indiceStats = 0,
  bajasAcumuladas = 0,
  toneladasAcumuladas = 0;

window.toggleNotificaciones = function() {
  window.cerrarPanelUboat();
  window.cerrarPanelComandante();
  const panel = document.getElementById("panel-notificaciones");
  panel.classList.toggle("abierto");
};

const eventosProcesados = eventosHistoricos.map(ev => ({
  ...ev, timestamp: new Date(ev.fechaStr + "T00:00:00").getTime()
}));

window.notificacionesOcultas = new Set();

window.descartarNotificacion = function(timestamp) {
  window.notificacionesOcultas.add(timestamp);
  sincronizarNotificaciones();
};

function sincronizarNotificaciones() {
  const bloqueados = eventosProcesados.filter(e => 
    e.timestamp <= relojGlobal && !window.notificacionesOcultas.has(e.timestamp)
  );
  
  const badge = document.getElementById("notif-badge");
  if (bloqueados.length > 0) {
    badge.style.display = "block";
    badge.innerText = bloqueados.length;
  } else {
    badge.style.display = "none";
  }
  
  const panelLista = document.getElementById("lista-notificaciones");
  panelLista.innerHTML = "";
  
  bloqueados.slice().reverse().forEach(ev => {
    const d = new Date(ev.timestamp);
    const fechaLista = d.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
    
    panelLista.innerHTML += `
      <div class="notif-item">
        <button class="notif-close" onclick="descartarNotificacion(${ev.timestamp})" title="Descartar mensaje">×</button>
        <div class="notif-date">${fechaLista}</div>
        <div class="notif-title">${ev.titulo}</div>
        <div class="notif-text">${ev.texto}</div>
      </div>
    `;
  });
}

// Botones internos de la tarjeta flotante
document.getElementById("btn-close-card").addEventListener("click", () => {
  document.getElementById("historical-card").classList.remove("show");
  tiempoOcultarEvento = null;
});

document.getElementById("btn-min-card").addEventListener("click", () => {
  document.getElementById("historical-card").classList.remove("show");
  tiempoOcultarEvento = null;
});

let tiempoOcultarEvento = null;

function mostrarEventoHistorico(evento) {
  const card = document.getElementById("historical-card");
  document.getElementById("hist-title").innerText = evento.titulo;
  document.getElementById("hist-text").innerText = evento.texto;
  card.classList.add("show");
  
  tiempoOcultarEvento = evento.timestamp + (6 * 86400000);
}

const controles = {
  pausa: false, velocidad: 1, rotacionTierra: 0.0005,
  reiniciar: () => {
    relojGlobal = new Date("1939-08-15T00:00:00").getTime();
    relojAnterior = relojGlobal;
    infoBox.style.display = "none";
    document.getElementById("historical-card").classList.remove("show");
    tiempoOcultarEvento = null;
    
    window.cerrarPanelUboat(); window.cerrarPanelComandante();
    document.getElementById("panel-notificaciones").classList.remove("abierto");
    sincronizarNotificaciones();
    
    indiceStats = 0; bajasAcumuladas = 0; toneladasAcumuladas = 0;
    document.getElementById("statTons").innerText = "0";
    document.getElementById("statBajas").innerText = "0";
    document.getElementById("statActivos").innerText = "0";
  },
};

const gui = new GUI();
const controlPausa = gui.add(controles, "pausa").name(" Pausar (Espacio)");
gui.add(controles, "velocidad", 0.1, 5).name("Días / seg");
gui.add(controles, "rotacionTierra", 0, 0.05).name("Giro Tierra");
gui.add(controles, "reiniciar").name(" Volver 15 Ago 1939");

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    controles.pausa = !controles.pausa;
    controlPausa.updateDisplay();
  }
});

const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.15;
const raton = new THREE.Vector2();
let ratonEnTooltip = false,
  temporizadorOcultar = null,
  puntosMostrados = [];

infoBox.addEventListener("mouseenter", () => {
  ratonEnTooltip = true;
  if (temporizadorOcultar) clearTimeout(temporizadorOcultar);
});

infoBox.addEventListener("mouseleave", () => {
  ratonEnTooltip = false;
  infoBox.style.display = "none";
  puntosMostrados = [];
});

window.addEventListener("mousemove", (evento) => {
  if (!particulasBombas) return;
  if (ratonEnTooltip) return;

  raton.x = (evento.clientX / window.innerWidth) * 2 - 1;
  raton.y = -(evento.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(raton, camera);

  const intersecciones = raycaster.intersectObject(particulasBombas.malla);
  const puntosValidos = [];

  for (let i = 0; i < intersecciones.length; i++) {
    const indice = intersecciones[i].index;
    const ataque = particulasBombas.datos[indice];
    if (
      !ataque.estaOculto &&
      particulasBombas.malla.geometry.attributes.position.getY(indice) !== 0
    ) {
      if (!puntosValidos.includes(ataque)) puntosValidos.push(ataque);
    }
  }

  if (puntosValidos.length > 0) {
    if (temporizadorOcultar) clearTimeout(temporizadorOcultar);
    let esMismoGrupo = false;

    if (puntosMostrados.length > 0) {
      for (let p of puntosValidos) {
        if (puntosMostrados.includes(p)) {
          esMismoGrupo = true;
          break;
        }
      }
    }

    if (!esMismoGrupo) {
      puntosMostrados = [...puntosValidos];
      let htmlTarjeta = "";
      if (puntosMostrados.length > 1) {
        htmlTarjeta += `<div style="background-color: #ff3300; color: white; padding: 6px 8px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size: 11px; position: sticky; top: -5px; z-index: 10;">⚠️ ${puntosMostrados.length} ATAQUES SIMULTÁNEOS (Haz Scroll)</div>`;
      }

      puntosMostrados.forEach((punto, index) => {
        const r = punto.raw;
        const navio = r.ship_name ? r.ship_name : "Navío Desconocido";
        const nacionalidad = r.nationality ? r.nationality : "Desconocida";
        const toneladas = r.tonnage ? r.tonnage : "?";
        const bajas = r.dead ? r.dead : "0";
        const superv = r.survivors ? r.survivors : "0";
        const comandante = r.commander ? r.commander : "Desconocido";
        const tipo = r.loss_type ? r.loss_type : "Hundido";
        const uboat = r.name ? r.name : "U-Boat";
        const astilleroInfo = punto.astillero
          ? punto.astillero
          : "Base Desconocida";
        const tipoUboat = punto.tipoUboat ? punto.tipoUboat : "VII";

        if (index > 0)
          htmlTarjeta += `<hr style="border: 0; border-top: 2px solid #555; margin: 10px 0;">`;

        htmlTarjeta += `
          <h4 style="margin:0 0 4px 0; color:#ffaa00; border-bottom: 1px solid #444; padding-bottom:4px;">
             ${uboat} <span style="color:#aaa; font-size:11px;">(Tipo ${tipoUboat})</span>
            <button class="btn-info" onclick="window.abrirPanelUboat('${tipoUboat}')">ℹ️ Info</button>
          </h4>
          <div style="font-size: 12px; line-height: 1.4;">
            <b>Cmte:</b> ${comandante} | <b>Base:</b> ${astilleroInfo}<br>
            <b>Blanco:</b>  ${navio} (${nacionalidad})<br>
            ${
              punto.coordsFaltantes
                ? `<div style="color:#ff5555; font-size:10px; margin-bottom:2px;">⚠️ Coordenadas perdidas en archivo (Aproximadas)</div>`
                : ""
            }
            <b>Destino:</b> ${tipo} (${toneladas} Tons.)<br>
            <div style="margin-top: 4px; padding: 2px 4px; background: rgba(255,0,0,0.2); border-radius: 3px; font-size: 11px;">
              <b>Bajas:</b> ${bajas} muertos / ${superv} sup.
            </div>
          </div>
        `;
      });

      infoBox.innerHTML = htmlTarjeta;
      infoBox.style.display = "block";
      const anchoCaja = infoBox.offsetWidth;
      const altoCaja = infoBox.offsetHeight;
      let posX = evento.clientX + 15;
      let posY = evento.clientY + 15;

      if (posX + anchoCaja > window.innerWidth)
        posX = evento.clientX - anchoCaja - 15;
      if (posY + altoCaja > window.innerHeight) {
        posY = evento.clientY - altoCaja - 15;
        if (posY < 10) posY = 10;
      }

      infoBox.style.left = posX + "px";
      infoBox.style.top = posY + "px";
    }
    document.body.style.cursor = "pointer";
  } else {
    if (!temporizadorOcultar) {
      temporizadorOcultar = setTimeout(() => {
        if (!ratonEnTooltip) {
          infoBox.style.display = "none";
          puntosMostrados = [];
          document.body.style.cursor = "default";
        }
        temporizadorOcultar = null;
      }, 500);
    }
  }
});

const gltfLoader = new GLTFLoader();
const coordsCiudades = {
  Kiel: { lat: 54.32, lon: 10.13 },
  Bremen: { lat: 53.07, lon: 8.8 },
  "Bremen-Vegesack": { lat: 53.17, lon: 8.62 },
  Lubeck: { lat: 53.86, lon: 10.68 },
  Lübeck: { lat: 53.86, lon: 10.68 },
  Emden: { lat: 53.36, lon: 7.2 },
  Flensburg: { lat: 54.78, lon: 9.43 },
  Danzig: { lat: 54.35, lon: 18.66 },
  Hamburg: { lat: 53.55, lon: 9.99 },
  Wilhelmshaven: { lat: 53.52, lon: 8.1 },
  Rostock: { lat: 54.08, lon: 12.1 },
};

Promise.all([
  leerCSV(
    "/src/uboat-target-data.csv",
    "attack_lat",
    "attack_lo",
    "attack_date"
  ),
  leerCSVCrudo("/src/uboat-data.csv"),
  gltfLoader.loadAsync("/src/uboat-VIIC.glb"),
])
  .then(([datosAtaques, datosUboats, gltfData]) => {
    const tMin = datosAtaques[0].fecha.getTime();
    const tMax = datosAtaques[datosAtaques.length - 1].fecha.getTime();
    const tFinal = tMax + 90 * 86400000;

    sliderTiempo.min = tMin;
    sliderTiempo.max = tFinal;

    const minYear = new Date(tMin).getFullYear();
    const maxYear = new Date(tFinal).getFullYear();
    const ruler = document.getElementById("timeline-ruler");
    ruler.innerHTML = "";

    // 1. GENERAR REGLA DE AÑOS
    for (let y = minYear; y <= maxYear; y++) {
      let tickDate = new Date(`${y}-01-01T00:00:00`).getTime();

      if (tickDate < tMin) tickDate = tMin;
      if (tickDate > tFinal) continue;

      const percent = ((tickDate - tMin) / (tFinal - tMin)) * 100;

      const tick = document.createElement("div");
      tick.className = "ruler-tick";
      tick.style.left = `${percent}%`;
      tick.innerText = y;
      ruler.appendChild(tick);
    }

    eventosProcesados.forEach((ev) => {
      if (ev.timestamp >= tMin && ev.timestamp <= tFinal) {
        const percent = ((ev.timestamp - tMin) / (tFinal - tMin)) * 100;
        const marker = document.createElement("div");
        marker.className = "event-marker";
        marker.style.left = `${percent}%`;
        marker.setAttribute("data-title", ev.titulo);
        
        marker.addEventListener("click", () => {
          relojGlobal = ev.timestamp;
          sliderTiempo.value = relojGlobal;
          indiceStats = 0;
          toneladasAcumuladas = 0;
          bajasAcumuladas = 0;
          document.getElementById("statTons").innerText = "0";
          document.getElementById("statBajas").innerText = "0";
          actualizarTooltip();
          mostrarEventoHistorico(ev);
        });
        
        ruler.appendChild(marker);
      }
    });

    const mapaInfoUboats = {};
    datosUboats.forEach((fila) => {
      if (fila.name) {
        let ciudad = "Desconocida";
        if (fila.shipyard) {
          const partes = fila.shipyard.split(",");
          ciudad = partes[partes.length - 1].trim();
        }
        mapaInfoUboats[fila.name] = {
          astillero: ciudad,
          tipo: fila.type || "Desconocido",
        };
      }
    });

    const geoBombas = new THREE.BufferGeometry();
    const posBombas = new Float32Array(datosAtaques.length * 3);
    const matLinea = new THREE.LineBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.5,
    });
    const lineasRuta = [];

    datosAtaques.forEach((d, i) => {
      d.fechaFin = d.fecha.getTime();
      d.fechaInicio = d.fechaFin - 15 * 86400000;
      const infoExtendida = mapaInfoUboats[d.raw.name] || {
        astillero: null,
        tipo: "VII",
      };
      d.tipoUboat = infoExtendida.tipo;

      if (infoExtendida.astillero && coordsCiudades[infoExtendida.astillero]) {
        d.latInicio = coordsCiudades[infoExtendida.astillero].lat;
        d.lonInicio = coordsCiudades[infoExtendida.astillero].lon;
        d.astillero = infoExtendida.astillero;
      } else {
        d.latInicio = 60.0;
        d.lonInicio = -5.0;
        d.astillero = "Mar del Norte";
      }

      d.rumbo = Math.atan2(d.lon - d.lonInicio, d.lat - d.latInicio);
      d.p3D = LatLonToXYZ(d.lat, d.lon, 5.01);
      d.estaOculto = true;
      posBombas[i * 3] = 0;
      posBombas[i * 3 + 1] = 0;
      posBombas[i * 3 + 2] = 0;

      const geoLinea = new THREE.BufferGeometry();
      const linea = new THREE.Line(geoLinea, matLinea);
      linea.visible = false;
      linea.frustumCulled = false;
      earth.add(linea);
      lineasRuta.push(linea);
    });

    geoBombas.setAttribute("position", new THREE.BufferAttribute(posBombas, 3));
    geoBombas.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 6);

    const matBombas = new THREE.PointsMaterial({
      color: new THREE.Color(1.5, 0.0, 0.0),
      size: 0.35,
      map: flareTexture,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    particulasBombas = {
      malla: new THREE.Points(geoBombas, matBombas),
      datos: datosAtaques,
    };
    earth.add(particulasBombas.malla);

    let submarinoGeometria, submarinoMaterial;
    gltfData.scene.traverse((child) => {
      if (child.isMesh && !submarinoGeometria) {
        submarinoGeometria = child.geometry.clone();
        submarinoMaterial = child.material;
        submarinoGeometria.computeBoundingBox();
        const centro = new THREE.Vector3();
        submarinoGeometria.boundingBox.getCenter(centro);
        submarinoGeometria.translate(-centro.x, -centro.y, -centro.z);
      }
    });

    mallasUboats = {
      malla: new THREE.InstancedMesh(
        submarinoGeometria,
        submarinoMaterial,
        datosAtaques.length
      ),
      lineas: lineasRuta,
    };
    mallasUboats.malla.frustumCulled = false;

    const dummy = new THREE.Object3D();
    dummy.scale.set(0, 0, 0);
    dummy.updateMatrix();
    for (let i = 0; i < datosAtaques.length; i++)
      mallasUboats.malla.setMatrixAt(i, dummy.matrix);
    earth.add(mallasUboats.malla);

    relojGlobal = new Date("1939-08-15T00:00:00").getTime();
    relojAnterior = relojGlobal;

    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 1000);
    }
  })
  .catch((error) => {
    cartelFecha.innerHTML = " Error al cargar. Comprueba la consola (F12)";
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.querySelector("h2").innerText = "ERROR AL CARGAR";
      loadingScreen.querySelector("p").innerText =
        "Revisa los archivos o la conexión.";
      loadingScreen.querySelector(".spinner").style.display = "none";
    }
    console.error(error);
  });

function animate() {
  requestAnimationFrame(animate);

  if (relojGlobal && !controles.pausa) {
    earth.rotation.y += controles.rotacionTierra;
    skydome.rotation.y += 0.0001;
    haloUniforms.time.value += 0.015;
    const avanceMilisegundos = (controles.velocidad / 60) * 86400000;
    relojGlobal += avanceMilisegundos;

    if (relojAnterior !== null && !isDragging) {
      if (relojGlobal > relojAnterior) {
        for (let ev of eventosProcesados) {
          if (relojAnterior < ev.timestamp && relojGlobal >= ev.timestamp) {
            mostrarEventoHistorico(ev);
            sincronizarNotificaciones();
          }
        }
      }
    }
    relojAnterior = relojGlobal;

    if (tiempoOcultarEvento && relojGlobal >= tiempoOcultarEvento) {
      document.getElementById("historical-card").classList.remove("show");
      tiempoOcultarEvento = null;
    }

    if (!isDragging) sliderTiempo.value = relojGlobal;
    const fechaActual = new Date(relojGlobal);
    cartelFecha.innerHTML = fechaActual.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (particulasBombas && mallasUboats) {
      while (
        indiceStats < particulasBombas.datos.length &&
        particulasBombas.datos[indiceStats].fecha.getTime() <= relojGlobal
      ) {
        const r = particulasBombas.datos[indiceStats].raw;
        toneladasAcumuladas += parseFloat(r.tonnage) || 0;
        bajasAcumuladas += parseInt(r.dead) || 0;
        indiceStats++;
        document.getElementById("statTons").innerText =
          toneladasAcumuladas.toLocaleString("es-ES");
        document.getElementById("statBajas").innerText =
          bajasAcumuladas.toLocaleString("es-ES");
      }

      const posAttr = particulasBombas.malla.geometry.attributes.position;
      let mallaActualizada = false;
      let bombasActualizadas = false;
      const dummy = new THREE.Object3D();
      const ventanaAtaque = 86400000;
      let uBoatsActivos = 0;

      for (let i = 0; i < particulasBombas.datos.length; i++) {
        const d = particulasBombas.datos[i];
        const linea = mallasUboats.lineas[i];

        if (
          relojGlobal < d.fechaInicio ||
          relojGlobal > d.fechaFin + ventanaAtaque
        ) {
          if (!d.estaOculto) {
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            mallasUboats.malla.setMatrixAt(i, dummy.matrix);
            linea.visible = false;
            posAttr.setXYZ(i, 0, 0, 0);
            d.estaOculto = true;
            mallaActualizada = true;
            bombasActualizadas = true;
          }
          continue;
        }

        d.estaOculto = false;
        mallaActualizada = true;
        if (relojGlobal < d.fechaFin + ventanaAtaque * 0.85) uBoatsActivos++;

        let latActual = d.lat,
          lonActual = d.lon;
        let radioActual = 4.997,
          escalaActual = 0.015,
          progresoViaje = 1,
          hundimientoFinal = 0;

        if (relojGlobal < d.fechaFin) {
          progresoViaje =
            (relojGlobal - d.fechaInicio) / (d.fechaFin - d.fechaInicio);
          latActual = d.latInicio + (d.lat - d.latInicio) * progresoViaje;
          lonActual = d.lonInicio + (d.lon - d.lonInicio) * progresoViaje;
          linea.visible = true;
          posAttr.setXYZ(i, 0, 0, 0);
          bombasActualizadas = true;
        } else {
          linea.visible = false;
          const progresoAtaque = (relojGlobal - d.fechaFin) / ventanaAtaque;
          if (progresoAtaque > 0.85) {
            hundimientoFinal = (progresoAtaque - 0.85) / 0.15;
            radioActual = 4.997 - 0.05 * hundimientoFinal;
            escalaActual = 0.015 * (1 - hundimientoFinal);
          }
          posAttr.setXYZ(i, d.p3D.x, d.p3D.y, d.p3D.z);
          bombasActualizadas = true;
        }

        if (linea.visible) {
          const puntosRuta = [];
          for (let s = 0; s <= 15; s++) {
            const frac = s / 15;
            const latP =
              d.latInicio + (d.lat - d.latInicio) * (progresoViaje * frac);
            const lonP =
              d.lonInicio + (d.lon - d.lonInicio) * (progresoViaje * frac);
            puntosRuta.push(LatLonToXYZ(latP, lonP, 5.002));
          }
          linea.geometry.setFromPoints(puntosRuta);
        }

        const p = LatLonToXYZ(latActual, lonActual, radioActual);
        dummy.position.copy(p);
        dummy.lookAt(0, 0, 0);
        dummy.rotateX(-Math.PI / 2);
        dummy.rotateY(-d.rumbo);
        if (hundimientoFinal > 0)
          dummy.rotateX((-Math.PI / 4) * hundimientoFinal);

        dummy.scale.set(escalaActual, escalaActual, escalaActual);
        dummy.updateMatrix();
        mallasUboats.malla.setMatrixAt(i, dummy.matrix);
      }

      document.getElementById("statActivos").innerText =
        uBoatsActivos.toLocaleString("es-ES");
      if (mallaActualizada)
        mallasUboats.malla.instanceMatrix.needsUpdate = true;
      if (bombasActualizadas) posAttr.needsUpdate = true;
    }
  }
  controls.update();
  composer.render();
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});