const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const featuredProjects = [
  {
    id: "protumaco",
    titulo: "Consorcio Protumaco",
    inicio: "2024-01-30",
    fin: null,
    estado: "finalizado",
    descripcion: "Mejoramiento y mantenimiento de la vía de acceso (puentes El Morro, El Pindo y Aguaclara), del puerto de Tumaco (Nariño).",
    imagen: "assets/proyectos/protumaco.jpg"
  },
  {
    id: "conexion20",
    titulo: "Conexión 20",
    inicio: "2021-12-17",
    fin: "2025-01-15",
    estado: "finalizado",
    descripcion: "Proyecto Conexión 20 (según portafolio).",
    imagen: "assets/proyectos/conexion-20.jpg"
  },
  {
    id: "juan-amarillo",
    titulo: "Parque Juan Amarillo",
    inicio: "2019-08-23",
    fin: "2021-01-30",
    estado: "finalizado",
    descripcion: "Obra de espacio público: Parque Juan Amarillo.",
    imagen: "assets/proyectos/parque-juan-amarillo.jpg"
  },
  {
    id: "pablo-vi",
    titulo: "Mega Colegio Pablo VI",
    inicio: "2019-05-15",
    fin: null,
    estado: "finalizado",
    descripcion: "Proyecto Mega Colegio Pablo VI (según portafolio).",
    imagen: "assets/proyectos/mega-colegio-pablo-vi.png"
  },
  {
    id: "calima14",
    titulo: "C. Comercial Calima La 14",
    inicio: "2009-04-17",
    fin: "2010-10-24",
    estado: "finalizado",
    descripcion: "Construcción asociada al Centro Comercial Calima La 14.",
    imagen: "assets/proyectos/calima-la-14.png"
  },
  {
    id: "boyaca-suba",
    titulo: "Pte Av. Boyacá Suba",
    inicio: "2004-06-01",
    fin: "2005-07-01",
    estado: "finalizado",
    descripcion: "Proyecto puente Av. Boyacá – Suba (según portafolio).",
    imagen: "assets/proyectos/puente-boyaca-suba.png"
  }
];

const services = [
  { titulo: "Excavación y retiro de material", detalle: "Movimiento de tierras, retiro y disposición según requerimientos del proyecto." },
  { titulo: "Suministro de materiales de cantera", detalle: "Agregados y materiales para obra (según especificaciones)." },
  { titulo: "Cimentaciones", detalle: "Cimentación y preparación de base estructural." },
  { titulo: "Estructura", detalle: "Ejecución de elementos estructurales y armado." },
  { titulo: "Superestructura", detalle: "Componentes superiores y continuidad de estructura." },
  { titulo: "Mampostería y pañete", detalle: "Acabados de mampostería y pañete." },
  { titulo: "Espacio público", detalle: "Intervenciones urbanas, andenes, parques, zonas comunes." },
  { titulo: "Afinado de pisos", detalle: "Preparación y afinado de superficies." },
  { titulo: "Instalación de juntas de puentes", detalle: "Montaje y ajuste de juntas." },
  { titulo: "Reforzamiento en fibra de carbono", detalle: "Refuerzo estructural con materiales compuestos (según diseño)." }
];

const recordObras = [
  { empresa: "Consorcio Protumaco", proyecto: "Mejoramiento y mantenimiento vía de acceso (Tumaco, Nariño)", inicio: "2024-01-30", fin: "" },
  { empresa: "Consorcio Conexión 20", proyecto: "Conexión 20", inicio: "2021-12-17", fin: "" },
  { empresa: "Consorcio Juan Amarillo JMC", proyecto: "Parque Juan Amarillo", inicio: "2019-08-23", fin: "2021-01-30" },
  { empresa: "Arco Constructores SAS", proyecto: "Mega Colegio Pablo VI", inicio: "2019-05-15", fin: "" },

  { empresa: "SAINC Ingenieros", proyecto: "Construcción Centro Comercial Calima la 14", inicio: "2009-04-17", fin: "2010-10-24" },
  { empresa: "Consorcio Alianza Suba", proyecto: "Infraestructura y superestructura 6 puentes (Av. Suba con Av. Boyacá)", inicio: "2004-06-01", fin: "2005-07-01" },

  { empresa: "JMV Ingenieros", proyecto: "Ampliación de la Cra. 7ª (Vía a La Caro)", inicio: "1994-01-01", fin: "1995-08-01" },
];

const gallery = [
  { src: "assets/galeria/galeria-1.jpg", alt: "Imagen 1" },
  { src: "assets/galeria/galeria-2.jpg", alt: "Imagen 2" },
  { src: "assets/galeria/galeria-3.jpg", alt: "Imagen 3" },
  { src: "assets/galeria/galeria-4.jpg", alt: "Imagen 4" },
  { src: "assets/galeria/galeria-5.jpg", alt: "Imagen 5" },
  { src: "assets/galeria/galeria-6.jpg", alt: "Imagen 6" },
  { src: "assets/galeria/galeria-7.jpg", alt: "Imagen 7" },
  { src: "assets/galeria/galeria-8.jpg", alt: "Imagen 8" },
  { src: "assets/galeria/galeria-9.jpg", alt: "Imagen 9" },
  { src: "assets/galeria/galeria-10.jpg", alt: "Imagen 10" },
  { src: "assets/galeria/galeria-11.jpg", alt: "Imagen 11" },
  { src: "assets/galeria/galeria-12.jpg", alt: "Imagen 12" },
];

function formatDate(iso){
  if(!iso) return "—";
  const d = new Date(iso);
  if(Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-CO", { year:"numeric", month:"short", day:"2-digit" });
}

function safeImg(imgEl){
  imgEl.onerror = () => { imgEl.remove(); };
}

function openModal(html){
  const modal = $("#modal");
  $("#modalContent").innerHTML = html;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  const modal = $("#modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  $("#modalContent").innerHTML = "";
  document.body.style.overflow = "";
}

/* Proyectos */
function renderProjects(){
  const grid = $("#projectsGrid");
  const q = ($("#projectSearch").value || "").toLowerCase().trim();
  const activeFilter = $(".chip.is-active")?.dataset.filter ?? "todos";

  const filtered = featuredProjects.filter(p => {
    const matchText = (p.titulo + " " + p.descripcion).toLowerCase().includes(q);
    const matchFilter = activeFilter === "todos" ? true : p.estado === activeFilter;
    return matchText && matchFilter;
  });

  grid.innerHTML = filtered.map(p => {
    const badge = p.estado === "en-curso" ? "En curso" : "Finalizado";
    const rango = `${formatDate(p.inicio)} · ${p.fin ? formatDate(p.fin) : "Actual"}`;
    const img = p.imagen ? `<img src="${p.imagen}" alt="${p.titulo}" loading="lazy">` : "";
    return `
      <article class="pcard reveal">
        <div class="pcard__media">
          ${img}
          <div class="pcard__badge">${badge}</div>
        </div>
        <div class="pcard__body">
          <p class="pcard__title">${p.titulo}</p>
          <p class="pcard__meta">${rango}</p>
          <p class="muted">${p.descripcion}</p>
        </div>
        <div class="pcard__actions">
          <button class="btn btn--primary" data-open="${p.id}" type="button">Ver detalle</button>
          <a class="btn" href="#contacto">Cotizar</a>
        </div>
      </article>
    `;
  }).join("");

  $$("img", grid).forEach(safeImg);

  $$("[data-open]", grid).forEach(btn => {
    btn.addEventListener("click", () => {
      const p = featuredProjects.find(x => x.id === btn.dataset.open);
      const media = p.imagen ? `<img src="${p.imagen}" alt="${p.titulo}" loading="lazy">` : "";
      openModal(`
        <div style="display:grid; gap:12px">
          <div>${media}</div>
          <h3 style="margin:0">${p.titulo}</h3>
          <p class="muted" style="margin:0">${formatDate(p.inicio)} · ${p.fin ? formatDate(p.fin) : "Actual"}</p>
          <p class="muted" style="margin:0">${p.descripcion}</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap">
            <a class="btn btn--primary" href="#contacto" onclick="document.getElementById('modal').classList.remove('is-open')">Contactar</a>
            <button class="btn" type="button" data-close>Cerrar</button>
          </div>
        </div>
      `);
      $$("img", $("#modalContent")).forEach(safeImg);
    });
  });

  setupReveal(); // aplicar reveal a nuevas tarjetas
}

/* Servicios */
function serviceIcon(name){
  // Íconos simples (reutilizados). Puedes cambiarlos por los tuyos si quieres.
  const common = {
    build: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M7 21V9l5-3 5 3v12" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M10 21v-6h4v6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>`,
    truck: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 7h11v10H3V7Z" stroke="currentColor" stroke-width="1.8"/>
        <path d="M14 10h4l3 3v4h-7v-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="1.8"/>
        <path d="M18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="1.8"/>
      </svg>`,
    layers: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M3 12l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M3 16l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>`,
    bridge: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M4 18V10c3 0 4-3 8-3s5 3 8 3v8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M7 18v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M17 18v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`
  };

  // Asignación por palabras clave
  const n = name.toLowerCase();
  if(n.includes("material") || n.includes("cantera")) return common.truck;
  if(n.includes("juntas") || n.includes("puente")) return common.bridge;
  if(n.includes("ciment") || n.includes("super") || n.includes("estructura")) return common.layers;
  return common.build;
}

// Versión mejorada del array (puedes dejar tu array actual, pero esto se ve mejor)
const servicesPlus = services.map(s => {
  const t = s.titulo.toLowerCase();
  let sub = "Solución de obra con estándares de calidad.";
  let badges = ["Calidad", "Seguridad", "Cumplimiento"];
  let bullets = ["Planificación y ejecución según requerimientos del proyecto.", "Control de calidad y seguimiento.", "Entrega con soporte y trazabilidad."];

  if(t.includes("excav")){ sub="Movimiento de tierras y retiro controlado."; badges=["Movimiento de tierras","Logística"]; }
  if(t.includes("cantera")){ sub="Suministro y transporte de agregados."; badges=["Suministro","Transporte"]; }
  if(t.includes("ciment")){ sub="Bases y cimentaciones para estructura."; badges=["Estructural","Normativa"]; }
  if(t.includes("mamposter")){ sub="Acabados en mampostería y pañete."; badges=["Acabados","Calidad"]; }
  if(t.includes("espacio")){ sub="Intervenciones urbanas y espacio público."; badges=["Urbano","Espacio público"]; }
  if(t.includes("juntas")){ sub="Instalación y ajuste de juntas de puentes."; badges=["Puentes","Mantenimiento"]; }
  if(t.includes("fibra")){ sub="Reforzamiento estructural especializado."; badges=["Reforzamiento","Especializado"]; }

  return {
    ...s,
    sub,
    badges,
    bullets,
    icon: serviceIcon(s.titulo)
  };
});

function iconForService(title){
  // íconos simples
  const icons = {
    truck: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M14 10h4l3 3v4h-7v-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="1.8"/>
    </svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M3 12l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M3 16l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`,
    build: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M3 21h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M7 21V9l5-3 5 3v12" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M10 21v-6h4v6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`,
    bridge: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M4 18V10c3 0 4-3 8-3s5 3 8 3v8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M7 18v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M17 18v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" stroke-width="1.8"/>
    </svg>`
  };

  const t = title.toLowerCase();
  if(t.includes("material") || t.includes("cantera")) return icons.truck;
  if(t.includes("juntas") || t.includes("puente")) return icons.bridge;
  if(t.includes("espacio")) return icons.pin;
  if(t.includes("ciment") || t.includes("estructura") || t.includes("super")) return icons.layers;
  return icons.build;
}

function serviceMeta(s){
  const t = s.titulo.toLowerCase();

  // categoría + colores por tarjeta (marca + coherencia)
  if(t.includes("excav") || t.includes("material") || t.includes("cantera")){
    return { cat:"tierra", sub:"Movimiento de tierras, retiro y suministro.", a:"#0ea5e9", b:"#F6C343", badges:["Movimiento de tierras","Logística"], bullets:[
      "Retiro y disposición según requerimientos del proyecto.",
      "Coordinación de transporte y tiempos de entrega.",
      "Control y trazabilidad del material."
    ]};
  }

  if(t.includes("ciment") || t.includes("estructura") || t.includes("super")){
    return { cat:"estructura", sub:"Bases, estructura y componentes principales.", a:"#0B6BFF", b:"#2DA9FF", badges:["Estructural","Normativa"], bullets:[
      "Ejecución alineada a especificaciones técnicas.",
      "Control de calidad y seguimiento en obra.",
      "Cumplimiento de seguridad y procedimientos."
    ]};
  }

  if(t.includes("mamposter") || t.includes("pañete") || t.includes("pisos")){
    return { cat:"acabados", sub:"Acabados con detalle y buena terminación.", a:"#F59E0B", b:"#F6C343", badges:["Acabados","Calidad"], bullets:[
      "Terminaciones limpias y consistentes.",
      "Revisión de detalles y ajustes finales.",
      "Orden y control durante la ejecución."
    ]};
  }

  if(t.includes("espacio")){
    return { cat:"urbano", sub:"Intervenciones urbanas y espacio público.", a:"#22c55e", b:"#16a34a", badges:["Urbano","Espacio público"], bullets:[
      "Intervención en andenes, parques y zonas comunes.",
      "Trabajo organizado para minimizar afectaciones.",
      "Cumplimiento de especificaciones del entorno."
    ]};
  }

  // especializado
  return { cat:"especializado", sub:"Soluciones técnicas especializadas.", a:"#a855f7", b:"#6366f1", badges:["Especializado","Técnico"], bullets:[
    "Implementación según diseño y requerimientos.",
    "Acompañamiento y control de ejecución.",
    "Entrega con soporte y trazabilidad."
  ]};
}

function renderServices(){
  const cards = document.getElementById("servicesCards");
  const panel = document.getElementById("servicePanel");
  const search = document.getElementById("serviceSearch");

  let activeCat = "todos";
  let activeId = services[0]?.titulo ?? "";

  const buildData = () => services.map(s => {
    const meta = serviceMeta(s);
    return {
      ...s,
      id: s.titulo,
      icon: iconForService(s.titulo),
      ...meta
    };
  });

  const data = buildData();

  const filteredData = () => {
    const q = (search?.value || "").toLowerCase().trim();
    return data.filter(x => {
      const okCat = activeCat === "todos" ? true : x.cat === activeCat;
      const okText = (x.titulo + " " + x.detalle).toLowerCase().includes(q);
      return okCat && okText;
    });
  };

  const renderPanel = (item) => {
    panel.style.setProperty("--iconA", item.a);
    panel.style.setProperty("--iconB", item.b);

    panel.innerHTML = `
      <div class="panelHead">
        <div class="panelIcon" aria-hidden="true">
          ${item.icon}
        </div>
        <div>
          <h3 class="panelTitle">${item.titulo}</h3>
          <p class="panelDesc">${item.detalle}</p>
        </div>
      </div>

      <div class="panelBadges">
        ${item.badges.map(b => `<span class="badge">${b}</span>`).join("")}
      </div>

      <ul class="panelBullets">
        ${item.bullets.map(li => `<li>${li}</li>`).join("")}
      </ul>

      <div class="panelCta">
        <a class="btn btn--primary" href="#contacto">Cotizar este servicio</a>
        <a class="btn" href="https://wa.me/573144934264" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    `;
  };

  const renderCards = () => {
    const list = filteredData();
    if(list.length === 0){
      cards.innerHTML = `<div class="card"><p class="muted" style="margin:0">No hay resultados para tu búsqueda.</p></div>`;
      panel.innerHTML = `<p class="muted" style="margin:0">Selecciona un servicio para ver el detalle.</p>`;
      return;
    }

    if(!list.some(x => x.id === activeId)) activeId = list[0].id;

    cards.innerHTML = list.map(item => {
      const active = item.id === activeId;
      return `
        <button class="sCard ${active ? "is-active" : ""}" type="button" data-sid="${item.id}"
          style="--iconA:${item.a}; --iconB:${item.b}">
          <div class="sIcon" aria-hidden="true">${item.icon}</div>
          <div class="sText">
            <p class="sTitle">${item.titulo}</p>
            <p class="sSub">${item.sub}</p>
          </div>
        </button>
      `;
    }).join("");

    const activeItem = list.find(x => x.id === activeId) || list[0];
    renderPanel(activeItem);

    document.querySelectorAll(".sCard").forEach(btn => {
      btn.addEventListener("click", () => {
        activeId = btn.dataset.sid;
        renderCards();
      });
    });
  };

  // Chips category
  document.querySelectorAll('[data-scat]').forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll('[data-scat]').forEach(x => x.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeCat = chip.dataset.scat;
      renderCards();
    });
  });

  search?.addEventListener("input", renderCards);

  renderCards();
}


/* Galería con navegación */
let currentGalleryIndex = 0;

function renderGallery(){
  const wrap = $("#galleryGrid");
  wrap.innerHTML = gallery.map((g, i) => `
    <div class="gitem reveal" role="button" tabindex="0" data-g="${i}" aria-label="Abrir ${g.alt}">
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
    </div>
  `).join("");

  $$("img", wrap).forEach(safeImg);

  const openAt = (i) => {
    currentGalleryIndex = i;
    const g = gallery[i];
    openModal(`
      <div style="display:grid; gap:12px">
        <img src="${g.src}" alt="${g.alt}" loading="lazy">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap">
          <p class="muted" style="margin:0">${g.alt}</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn" type="button" id="prevImg">←</button>
            <button class="btn" type="button" id="nextImg">→</button>
            <button class="btn" type="button" data-close>Cerrar</button>
          </div>
        </div>
      </div>
    `);
    $$("img", $("#modalContent")).forEach(safeImg);

    $("#prevImg")?.addEventListener("click", () => openAt((currentGalleryIndex - 1 + gallery.length) % gallery.length));
    $("#nextImg")?.addEventListener("click", () => openAt((currentGalleryIndex + 1) % gallery.length));
  };

  $$(".gitem", wrap).forEach(el => {
    el.addEventListener("click", () => openAt(Number(el.dataset.g)));
    el.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " ") openAt(Number(el.dataset.g));
    });
  });

  setupReveal();
}

/* Récord */
function renderRecord(){
  const q = ($("#recordSearch").value || "").toLowerCase().trim();
  const rows = recordObras.filter(r =>
    (r.empresa + " " + r.proyecto).toLowerCase().includes(q)
  );

  $("#recordCount").textContent = `${rows.length} registro(s)`;
  $("#recordBody").innerHTML = rows.map(r => `
    <tr>
      <td><strong>${r.empresa}</strong></td>
      <td>${r.proyecto}</td>
      <td>${formatDate(r.inicio)}</td>
      <td>${formatDate(r.fin)}</td>
    </tr>
  `).join("");
}

/* Menú */
function setupNav(){
  const btn = $("#menuBtn");
  const menu = $("#menu");
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#menu a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

/* Tema */
function setupTheme(){
  const key = "jmc-theme";
  const saved = localStorage.getItem(key);
  if(saved) document.documentElement.setAttribute("data-theme", saved);

  $("#themeBtn").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "" : "dark";
    if(next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(key, next || "");
  });
}

/* Modal + teclado */
function setupModal(){
  const modal = $("#modal");
  modal.addEventListener("click", (e) => {
    if(e.target.matches("[data-close]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && modal.classList.contains("is-open")) closeModal();

    // navegación en galería si el modal está abierto
    if(modal.classList.contains("is-open")){
      if(e.key === "ArrowLeft") $("#prevImg")?.click();
      if(e.key === "ArrowRight") $("#nextImg")?.click();
    }
  });
}

/* Filtros */
function setupFilters(){
  $$(".chip").forEach(ch => {
    ch.addEventListener("click", () => {
      $$(".chip").forEach(x => x.classList.remove("is-active"));
      ch.classList.add("is-active");
      renderProjects();
    });
  });

  $("#projectSearch").addEventListener("input", renderProjects);
  $("#recordSearch").addEventListener("input", renderRecord);
}

/* Progreso scroll */
function setupScrollProgress(){
  const bar = $("#progressBar");
  if(!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const sc = doc.scrollTop;
    const pct = max > 0 ? (sc / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* Reveal on scroll */
let revealObserver = null;

function setupReveal(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion){
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
    return;
  }

  if(!revealObserver){
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }

  $$(".reveal:not(.is-visible)").forEach(el => revealObserver.observe(el));
}

/* Tilt suave (solo desktop) */
function setupTilt(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion) return;
  if(window.matchMedia("(max-width: 980px)").matches) return;

  const card = $(".visualCard");
  if(!card) return;

  const onMove = (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg)`;
  };
  const reset = () => card.style.transform = "rotateX(0deg) rotateY(0deg)";

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", reset);
}

/* Init */
(function init(){
  $("#year").textContent = new Date().getFullYear();

  setupNav();
  setupTheme();
  setupModal();
  setupFilters();
  setupScrollProgress();

  renderProjects();
  renderServices();
  renderGallery();
  renderRecord();

  setupReveal();
  setupTilt();
})();
