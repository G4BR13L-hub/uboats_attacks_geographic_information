window.abiertoDesdeEnciclopedia = false;

export const eventosHistoricos = [
  { 
    fechaStr: "1939-09-03", 
    titulo: "Comienza la Batalla", 
    texto: "Gran Bretaña y Francia declaran la guerra a Alemania. El Almirante Dönitz envía sus primeros submarinos al Atlántico Norte para asfixiar las rutas de suministro." 
  },
  { 
    fechaStr: "1939-10-14", 
    titulo: "Infiltración en Scapa Flow", 
    texto: "El U-47 de Günther Prien burla las defensas de la inexpugnable base naval británica de Scapa Flow y hunde el acorazado HMS Royal Oak. Una victoria propagandística masiva." 
  },
  { 
    fechaStr: "1940-06-22", 
    titulo: "Los Primeros 'Tiempos Felices'", 
    texto: "Francia se rinde. Los U-Boats ganan acceso a las inmensas bases del Golfo de Vizcaya (Lorient, St. Nazaire), ahorrándose el peligroso viaje por el Mar del Norte." 
  },
  { 
    fechaStr: "1941-05-09", 
    titulo: "El Secreto de Enigma", 
    texto: "¡Desastre para la Kriegsmarine! El destructor británico HMS Bulldog captura el U-110 intacto, haciéndose con una máquina Enigma y sus códigos secretos." 
  },
  { 
    fechaStr: "1941-12-11", 
    titulo: "EE.UU. Entra en Guerra", 
    texto: "Tras el ataque a Pearl Harbor, Hitler declara la guerra a Estados Unidos. Dönitz prepara inmediatamente a sus U-Boats de largo alcance para cruzar el Atlántico." 
  },
  { 
    fechaStr: "1942-01-13", 
    titulo: "Operación Paukenschlag", 
    texto: "Los 'Segundos Tiempos Felices'. Los U-Boats atacan la costa este de EE.UU. Masacran a cientos de mercantes silueteados por las luces de las ciudades costeras." 
  },
  { 
    fechaStr: "1942-10-30", 
    titulo: "El Código Triton Descifrado", 
    texto: "Bletchley Park logra romper la nueva máquina Enigma M4 de 4 rotores de los submarinos, permitiendo a los Aliados volver a esquivar las manadas de lobos." 
  },
  { 
    fechaStr: "1943-05-24", 
    titulo: "El 'Mayo Negro'", 
    texto: "El punto de inflexión. Radares centimétricos aliados y nuevas tácticas aéreas diezman la flota alemana (43 submarinos hundidos este mes). Dönitz ordena la retirada." 
  },
  { 
    fechaStr: "1944-06-06", 
    titulo: "Día D: Operación Overlord", 
    texto: "Invasión aliada de Europa. Las inmensas bases de submarinos en Francia quedan bajo asedio, forzando a los U-Boats a retirarse a las costas de Noruega y Alemania." 
  },
  { 
    fechaStr: "1945-05-04", 
    titulo: "Operación Regenbogen", 
    texto: "Ante la inminente rendición incondicional, Dönitz ordena a los comandantes hundir sus propios submarinos. Más de 200 U-Boats son echados a pique por sus tripulaciones." 
  }
];

export const uboatSpecs = {
  IA: {
    nombre: "Tipo IA (Prototipo Oceánico)",
    img: "/src/U-25.jpg",
    desc: "Un diseño oceánico inicial del que solo se fabricaron dos unidades (U-25 y U-26). Aunque resultaron ser pesados, lentos en la inmersión y difíciles de maniobrar, sentaron las bases técnicas y estructurales para los letales submarinos oceánicos del Tipo IX. [Unidades construidas: 2]",
    peso: "862 tons",
    largo: "72.4 m",
    velSup: "17.8 nudos",
    velSub: "8.3 nudos",
    alcance: "7,900 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  IIA: {
    nombre: "Tipo IIA (Canoa Costera)",
    img: "/src/U-1.jpg",
    desc: "La primera variante de las famosas 'canoas' costeras. Eran submarinos muy ágiles y podían sumergirse en apenas 25 segundos, pero su ínfimo radio de acción y falta de espacio vital obligó a relegarlos casi exclusivamente al Báltico para entrenar a las futuras élites de la Kriegsmarine. [Unidades construidas: 6]",
    peso: "254 tons",
    largo: "40.9 m",
    velSup: "13.0 nudos",
    velSub: "6.9 nudos",
    alcance: "1,600 millas",
    tubos: "3 (proa)",
  },
  IIB: {
    nombre: "Tipo IIB (Canoa Mejorada)",
    img: "/src/U-17.jpg",
    desc: "Versión alargada del Tipo IIA con mayor capacidad de combustible, lo que les permitió operar intensamente en el Mar del Norte y tener un papel crucial en la campaña de Noruega (Operación Weserübung) antes de ser retirados para actuar como buques escuela. [Unidades construidas: 20]",
    peso: "279 tons",
    largo: "42.7 m",
    velSup: "13.0 nudos",
    velSub: "7.0 nudos",
    alcance: "3,100 millas",
    tubos: "3 (proa)",
  },
  IIC: {
    nombre: "Tipo IIC (Costero Extendido)",
    img: "/src/U-60.jpg",
    desc: "Incorporó un sistema de radio mejorado, equipo de escucha direccional y periscopios adicionales. Aunque se construyeron pocos, sirvieron como banco de pruebas táctico para testear los futuros equipos electrónicos y de comunicación de la flota. [Unidades construidas: 8]",
    peso: "291 tons",
    largo: "43.9 m",
    velSup: "12.0 nudos",
    velSub: "7.0 nudos",
    alcance: "3,800 millas",
    tubos: "3 (proa)",
  },
  IID: {
    nombre: "Tipo IID (Costero Definitivo)",
    img: "/src/U-141.jpg",
    desc: "La versión final y más perfecta de las 'canoas'. Se les instalaron tanques de combustible externos (saddle tanks) que aumentaron drásticamente su autonomía. Demostraron ser tan fiables que algunos operaron ininterrumpidamente en el Báltico hasta la rendición en 1945. [Unidades construidas: 16]",
    peso: "314 tons",
    largo: "44.0 m",
    velSup: "12.7 nudos",
    velSub: "7.4 nudos",
    alcance: "5,650 millas",
    tubos: "3 (proa)",
  },
  VIIA: {
    nombre: "Tipo VIIA (Primer Caballo de Batalla)",
    img: "/src/U-33.jpg",
    desc: "Introdujo el exitoso diseño del 'tanque de silla de montar' para almacenar combustible fuera del casco de presión. Sin embargo, tenía un grave defecto táctico: su único tubo lanzatorpedos de popa estaba montado en el exterior, obligando a recargarlo en superficie. [Unidades construidas: 10]",
    peso: "626 tons",
    largo: "64.5 m",
    velSup: "17.0 nudos",
    velSub: "8.0 nudos",
    alcance: "6,200 millas",
    tubos: "5 (4 proa, 1 popa ext.)",
  },
  VIIB: {
    nombre: "Tipo VIIB (Atacante Oceánico)",
    img: "/src/U-52.jpg",
    desc: "Mejoró radicalmente la agilidad, movió el tubo de popa al interior y añadió mucha más autonomía. Es una clase legendaria: Günther Prien usó un VIIB (U-47) para su infiltración en Scapa Flow, y Otto Kretschmer logró sus increíbles récords a bordo del U-99 (otro VIIB). [Unidades construidas: 24]",
    peso: "753 tons",
    largo: "66.5 m",
    velSup: "17.9 nudos",
    velSub: "8.0 nudos",
    alcance: "8,700 millas",
    tubos: "5 (4 proa, 1 popa)",
  },
  VIIC: {
    nombre: "Tipo VIIC (El Rey del Atlántico)",
    img: "/src/U-97.jpg",
    desc: "El submarino más icónico y producido de la historia naval. Formó la espina dorsal de las temibles 'manadas de lobos' de Dönitz y es la clase que protagoniza la famosa película 'Das Boot'. Durante la guerra se les fue añadiendo más blindaje antiaéreo (Flak) y detectores de radar (Metox). [Unidades construidas: 568]",
    peso: "769 tons",
    largo: "67.1 m",
    velSup: "17.7 nudos",
    velSub: "7.6 nudos",
    alcance: "8,500 millas",
    tubos: "5 (4 proa, 1 popa)",
  },
  "VIIC/41": {
    nombre: "Tipo VIIC/41 (Blindaje Mejorado)",
    img: "/src/U-995.jpg",
    desc: "Una mejora crítica del VIIC. Se diseñó con un casco de presión de acero endurecido más grueso, sacrificando peso en otras áreas para permitirle sumergirse a más de 250 metros de profundidad, la única forma de escapar de las letales y mejoradas cargas de profundidad aliadas. [Unidades construidas: 91]",
    peso: "759 tons",
    largo: "67.1 m",
    velSup: "17.7 nudos",
    velSub: "7.6 nudos",
    alcance: "8,500 millas",
    tubos: "5 (4 proa, 1 popa)",
  },
  VIID: {
    nombre: "Tipo VIID (Sembrador de Minas)",
    img: "/src/U-214.jpg",
    desc: "Una variante alargada del Tipo VII diseñada específicamente como minador. Añadía una sección adicional de 10 metros justo detrás de la torreta con 5 pozos verticales, capaces de soltar 15 mortíferas minas magnéticas SMA sin necesidad de usar los tubos torpederos. [Unidades construidas: 6]",
    peso: "965 tons",
    largo: "76.9 m",
    velSup: "16.7 nudos",
    velSub: "7.3 nudos",
    alcance: "11,200 millas",
    tubos: "5 (más 15 minas magnéticas)",
  },
  VIIF: {
    nombre: "Tipo VIIF (Transporte Torpedos)",
    img: "/src/U-1060.jpg",
    desc: "Eran el 'camión de reparto' de la flota. Inmensos para ser de la clase VII, fueron diseñados para reabastecer de torpedos a otros submarinos en pleno océano. Resultaron ser demasiado lentos, pesados y vulnerables a la aviación aliada mientras transferían su carga en superficie. [Unidades construidas: 4]",
    peso: "1,080 tons",
    largo: "77.6 m",
    velSup: "17.6 nudos",
    velSub: "7.9 nudos",
    alcance: "14,700 millas",
    tubos: "5 (capacidad para 39 torpedos)",
  },
  IXA: {
    nombre: "Tipo IXA (Crucero Oceánico)",
    img: "/src/U-37.jpg",
    desc: "El primer gran diseño de largo alcance de la armada. Su tremenda autonomía permitió a la Kriegsmarine proyectar por primera vez su amenaza en aguas lejanas del Atlántico Sur y el Caribe, donde los mercantes Aliados navegaban sin escolta al no esperar ataques. [Unidades construidas: 8]",
    peso: "1,032 tons",
    largo: "76.5 m",
    velSup: "18.2 nudos",
    velSub: "7.7 nudos",
    alcance: "10,500 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  IXB: {
    nombre: "Tipo IXB (El más letal)",
    img: "/src/U-65.jpg",
    desc: "La variante más exitosa de toda la guerra en promedio de tonelaje hundido por nave. Submarinos legendarios como el U-107 devastaron el tráfico mercante navegando hasta Freetown (África). Tenían el equilibrio perfecto entre autonomía, potencia de fuego y velocidad. [Unidades construidas: 14]",
    peso: "1,051 tons",
    largo: "76.5 m",
    velSup: "18.2 nudos",
    velSub: "7.3 nudos",
    alcance: "12,000 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  IXC: {
    nombre: "Tipo IXC (Paukenschlag)",
    img: "/src/U-505.jpg",
    desc: "Añadió aún más capacidad de combustible. Fueron los grandes protagonistas de la letal 'Operación Paukenschlag' (Toque de Timbal) a principios de 1942, masacrando a docenas de buques silueteados contra las luces nocturnas a lo largo de la costa este de Estados Unidos. [Unidades construidas: 54]",
    peso: "1,120 tons",
    largo: "76.7 m",
    velSup: "18.3 nudos",
    velSub: "7.3 nudos",
    alcance: "13,450 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  "IXC/40": {
    nombre: "Tipo IXC/40 (Oceánico Estándar)",
    img: "/src/U-534.jpg",
    desc: "La versión definitiva del Tipo IX. Eliminó el tercer periscopio (que demostró ser inútil en combate) para optimizar el espacio y amplió las reservas de fuel. Se convirtió en el lobo solitario de larga distancia estándar de Alemania hasta el final del conflicto. [Unidades construidas: 87]",
    peso: "1,144 tons",
    largo: "76.7 m",
    velSup: "19.0 nudos",
    velSub: "7.3 nudos",
    alcance: "13,850 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  IXD1: {
    nombre: "Tipo IXD1 (Transporte Rápido)",
    img: "/src/U-180.jpg",
    desc: "Un experimento fallido. Se les equipó con veloces motores de lancha torpedera que resultaron desastrosos: se averiaban constantemente y echaban un humo blanco muy delator. Fueron desarmados y usados casi como cargueros secretos para misiones de transporte vital a Japón. [Unidades construidas: 2]",
    peso: "1,610 tons",
    largo: "87.6 m",
    velSup: "15.8 nudos",
    velSub: "6.9 nudos",
    alcance: "14,000 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  IXD2: {
    nombre: "Tipo IXD2 (Gigante del Índico)",
    img: "/src/U-861.jpg",
    desc: "Monstruos de los océanos. Estaban equipados con dos motores diésel de crucero extra. Operaron como el temido 'Grupo Monzón' en el lejano Océano Índico, compartiendo bases secretas de reparación en Penang (Malasia) e Indonesia junto a la Armada Imperial Japonesa. [Unidades construidas: 28]",
    peso: "1,616 tons",
    largo: "87.6 m",
    velSup: "19.2 nudos",
    velSub: "6.9 nudos",
    alcance: "23,700 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  "IXD/42": {
    nombre: "Tipo IXD/42 (Oceánico Final)",
    img: "/src/U-883.jpg",
    desc: "Una modernización de última hora del masivo IXD2 con una electrónica de combate mucho más avanzada y espacio rediseñado. Solo se completó una única unidad (el U-883) antes de que las fuerzas terrestres aliadas tomaran los astilleros alemanes. [Unidades construidas: 1]",
    peso: "1,616 tons",
    largo: "87.6 m",
    velSup: "19.2 nudos",
    velSub: "6.9 nudos",
    alcance: "31,500 millas",
    tubos: "6 (4 proa, 2 popa)",
  },
  XB: {
    nombre: "Tipo XB (Minador Pesado)",
    img: "/src/U-234.jpg",
    desc: "El coloso de la Kriegsmarine. Eran minadores gigantescos, los más pesados de la guerra (más que un destructor). Debido a su extremo tamaño eran sumamente torpes al sumergirse, sufriendo bajas masivas. El U-234 se rindió llevando uranio y planos secretos a Japón. [Unidades construidas: 8]",
    peso: "1,763 tons",
    largo: "89.8 m",
    velSup: "17.0 nudos",
    velSub: "7.0 nudos",
    alcance: "18,450 millas",
    tubos: "2 (popa) + 66 Minas",
  },
  XIV: {
    nombre: "Tipo XIV (Milchkuh / Vaca Lechera)",
    img: "/src/U-459.jpg",
    desc: "Fueron los únicos U-Boats desarmados (no llevaban torpedos ofensivos). Su único objetivo era surtir de combustible, comida y repuestos a otros submarinos en alta mar para prolongar sus patrullas. Al descifrar Enigma, los Aliados los convirtieron en su objetivo prioritario número uno. [Unidades construidas: 10]",
    peso: "1,688 tons",
    largo: "67.1 m",
    velSup: "14.9 nudos",
    velSub: "6.2 nudos",
    alcance: "12,350 millas",
    tubos: "0 (Aprovisionamiento)",
  },
  XVIIA: {
    nombre: "Tipo XVIIA (Turbina Walter)",
    img: "/src/U-793.jpg",
    desc: "Pioneros absolutos propulsados por revolucionarias turbinas de peróxido de hidrógeno ideadas por el ingeniero Hellmuth Walter. Podían alcanzar los increíbles 25 nudos bajo el agua (algo inaudito en la IIGM), aunque solo operaron como delicados prototipos experimentales. [Unidades construidas: 4]",
    peso: "277 tons",
    largo: "39.3 m",
    velSup: "8.5 nudos",
    velSub: "25.0 nudos",
    alcance: "3,000 millas",
    tubos: "2 (proa)",
  },
  XVIIB: {
    nombre: "Tipo XVIIB (Turbina Walter Mejorada)",
    img: "/src/U-1406.jpg",
    desc: "Evolución de combate del diseño Walter. Aunque su velocidad sumergida era de ciencia ficción en 1944, el altísimo consumo de peróxido de hidrógeno resultó ser logísticamente imposible, altamente inestable, tóxico y un peligro de incendio constante para la tripulación. [Unidades construidas: 3]",
    peso: "312 tons",
    largo: "41.4 m",
    velSup: "8.5 nudos",
    velSub: "25.0 nudos",
    alcance: "3,000 millas",
    tubos: "2 (proa)",
  },
  XXI: {
    nombre: "Tipo XXI (Elektroboot)",
    img: "/src/U-3009.jpg",
    desc: "Un salto cuántico que cambió el diseño naval mundial para siempre. Fue el primer submarino real de la historia (diseñado para operar siempre sumergido, no como un buque de superficie que se esconde). Tenía aire acondicionado, recarga hidráulica de torpedos y baterías inmensas. [Unidades construidas: 118]",
    peso: "1,621 tons",
    largo: "76.7 m",
    velSup: "15.6 nudos",
    velSub: "17.2 nudos",
    alcance: "15,500 millas",
    tubos: "6 (proa, carga rápida)",
  },
  XXIII: {
    nombre: "Tipo XXIII (Cazador Costero)",
    img: "/src/U-2363.jpg",
    desc: "El letal hermano menor del Tipo XXI. Un cazador furtivo costero puramente eléctrico con un casco tan hidrodinámico que podía sumergirse en apenas 9 segundos de emergencia. Operaron en las costas británicas en 1945 hundiendo mercantes casi sin poder ser detectados por el Asdic. [Unidades construidas: 61]",
    peso: "234 tons",
    largo: "34.7 m",
    velSup: "9.7 nudos",
    velSub: "12.5 nudos",
    alcance: "2,600 millas",
    tubos: "2 (proa)",
  },
};

export const commandersSpecs = {
  "Otto Kretschmer": {
    nombre: "Otto Kretschmer",
    apodo: "Silent Otto",
    img: "/src/Otto_Kretschmer.jpg",
    desc: "El 'As de Ases'. El comandante más exitoso de la guerra por tonelaje. Famoso por su táctica de infiltrarse en la superficie de noche dentro de los convoyes aliados.",
    patrullas: "16 patrullas",
    hundimientos: "47 buques",
    tonelaje: "274,333 GRT",
    uboats: "U-35, U-23, U-99",
    destino: "Capturado (Marzo 1941)",
  },
  "Wolfgang Lüth": {
    nombre: "Wolfgang Lüth",
    apodo: "Navegante de Larga Distancia",
    img: "/src/Wolfgang_Luth.jpg",
    desc: "El segundo más exitoso. Llevó a cabo patrullas extremadamente largas, llegando a aterrorizar el Océano Índico.",
    patrullas: "15 patrullas",
    hundimientos: "46 buques",
    tonelaje: "225,204 GRT",
    uboats: "U-9, U-138, U-43, U-181",
    destino: "Fallecido (Mayo 1945)",
  },
  "Erich Topp": {
    nombre: "Erich Topp",
    apodo: "El Diablo Rojo",
    img: "/src/Erich_Topp.jpg",
    desc: "Tercer comandante más exitoso. Su U-552 llevaba pintado un diablo rojo sonriente. Sobrevivió a la guerra y se convirtió en almirante en la Alemania Occidental.",
    patrullas: "13 patrullas",
    hundimientos: "35 buques",
    tonelaje: "197,460 GRT",
    uboats: "U-57, U-552, U-2513",
    destino: "Sobrevivió (Falleció 2005)",
  },
  "Günther Prien": {
    nombre: "Günther Prien",
    apodo: "El Toro de Scapa Flow",
    img: "/src/Günther_Prien.jpg",
    desc: "Se convirtió en una leyenda viva tras infiltrarse en la base naval de Scapa Flow y hundir el HMS Royal Oak en 1939. Su emblema personal era un toro resoplando.",
    patrullas: "10 patrullas",
    hundimientos: "31 buques",
    tonelaje: "191,919 GRT",
    uboats: "U-47",
    destino: "Desaparecido (Marzo 1941)",
  },
  "Joachim Schepke": {
    nombre: "Joachim Schepke",
    apodo: "Su Majestad el Apuesto",
    img: "/src/JoachimSchepke.jpg",
    desc: "Uno de los tres grandes 'Ases' originales. Murió aplastado en el puente de su submarino tras ser embestido en la superficie por el destructor HMS Vanoc.",
    patrullas: "14 patrullas",
    hundimientos: "37 buques",
    tonelaje: "155,882 GRT",
    uboats: "U-3, U-19, U-100",
    destino: "Muerto en combate (Marzo 1941)",
  },
};

export function categorizarUboat(tipoExacto) {
  if (!tipoExacto) return "VIIC";
  if (uboatSpecs[tipoExacto]) return tipoExacto;
  if (tipoExacto.startsWith("II") || tipoExacto === "IA") return "IIB";
  if (tipoExacto.startsWith("VII")) return "VIIC";
  if (tipoExacto.startsWith("IX") || tipoExacto.startsWith("X")) return "IXC";
  if (tipoExacto.startsWith("XXIII")) return "XXIII";
  if (tipoExacto.startsWith("XX") || tipoExacto.startsWith("XVII"))
    return "XXI";
  return "VIIC";
}

export function iniciarInterfaz() {
  window.abrirPanelUboat = function (tipoExacto, desdeEnciclopedia = false) {
    window.cerrarPanelComandante();
    window.abiertoDesdeEnciclopedia = desdeEnciclopedia;
    const clave = categorizarUboat(tipoExacto);
    const specs = uboatSpecs[clave] || uboatSpecs["VIIC"];

    document.getElementById(
      "panel-titulo"
    ).innerText = `${specs.nombre} (${tipoExacto})`;
    document.getElementById("panel-img").src = specs.img || "/src/U-97.jpg";
    document.getElementById("panel-desc").innerText = specs.desc;
    document.getElementById("spec-peso").innerText = specs.peso;
    document.getElementById("spec-largo").innerText = specs.largo;
    document.getElementById("spec-vel-sup").innerText = specs.velSup;
    document.getElementById("spec-vel-sub").innerText = specs.velSub;
    document.getElementById("spec-alcance").innerText = specs.alcance;
    document.getElementById("spec-tubos").innerText = specs.tubos;
    document.getElementById("panel-uboat").classList.add("abierto");
  };

  window.cerrarPanelUboat = function () {
    document.getElementById("panel-uboat").classList.remove("abierto");
    if (window.abiertoDesdeEnciclopedia) {
      window.abrirEnciclopedia();
      window.abiertoDesdeEnciclopedia = false;
    }
  };

  window.abrirPanelComandante = function (claveNombre) {
    window.cerrarPanelUboat();
    window.abiertoDesdeEnciclopedia = true;
    const specs = commandersSpecs[claveNombre];

    document.getElementById("panel-com-titulo").innerText = specs.nombre;
    document.getElementById("panel-com-img").src = specs.img;
    document.getElementById("panel-com-desc").innerText = specs.desc;
    document.getElementById("spec-apodo").innerText = `"${specs.apodo}"`;
    document.getElementById("spec-patrullas").innerText = specs.patrullas;
    document.getElementById("spec-hundimientos").innerText = specs.hundimientos;
    document.getElementById("spec-tonelaje").innerText = specs.tonelaje;
    document.getElementById("spec-uboats").innerText = specs.uboats;
    document.getElementById("spec-destino").innerText = specs.destino;

    document.getElementById("panel-comandante").classList.add("abierto");
  };

  window.cerrarPanelComandante = function () {
    document.getElementById("panel-comandante").classList.remove("abierto");
    if (window.abiertoDesdeEnciclopedia) {
      window.abrirEnciclopedia();
      window.abiertoDesdeEnciclopedia = false;
    }
  };
}

export function iniciarEnciclopedia() {
  const gridSubs = document.getElementById("grid-submarinos");
  gridSubs.innerHTML = "";
  for (const [clave, specs] of Object.entries(uboatSpecs)) {
    const card = document.createElement("div");
    card.className = "card-sub";
    card.innerHTML = `
      <img src="${specs.img || "/src/U-97.jpg"}" alt="${clave}">
      <h4>${clave}</h4>
      <div style="font-size: 11px; color: #888;">${specs.nombre
        .split("(")[0]
        .trim()}</div>
    `;
    card.onclick = () => {
      window.cerrarEnciclopedia();
      window.abrirPanelUboat(clave, true);
    };
    gridSubs.appendChild(card);
  }

  const gridComs = document.getElementById("grid-comandantes");
  gridComs.innerHTML = "";
  for (const [clave, specs] of Object.entries(commandersSpecs)) {
    const card = document.createElement("div");
    card.className = "card-sub";
    card.innerHTML = `
      <img src="${specs.img}" alt="${clave}" style="object-position: top;">
      <h4>${clave}</h4>
      <div style="font-size: 11px; color: #888;">"${specs.apodo}"</div>
    `;
    card.onclick = () => {
      window.cerrarEnciclopedia();
      window.abrirPanelComandante(clave);
    };
    gridComs.appendChild(card);
  }

  window.abrirEnciclopedia = function () {
    document.getElementById("modal-enciclopedia").style.display = "block";
  };
  window.cerrarEnciclopedia = function () {
    document.getElementById("modal-enciclopedia").style.display = "none";
  };
}
