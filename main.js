const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const featuredProjects = [
  {
    id: "protumaco",
    titulo: "Consorcio Protumaco",
    inicio: "2024-01-30",
    fin: null,
    estado: "en-curso",
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
    estado: "en-curso",
    descripcion: "Proyecto Mega Colegio Pablo VI (según portafolio).",
    imagen: "assets/proyectos/mega-colegio-pablo-vi.jpg"
  },
  {
    id: "calima14",
    titulo: "C. Comercial Calima La 14",
    inicio: "2009-04-17",
    fin: "2010-10-24",
    estado: "finalizado",
    descripcion: "Construcción asociada al Centro Comercial Calima La 14.",
    imagen: "assets/proyectos/calima-la-14.jpg"
  },
  {
    id: "boyaca-suba",
    titulo: "Pte Av. Boyacá Suba",
    inicio: "2004-06-01",
    fin: "2005-07-01",
    estado: "finalizado",
    descripcion: "Proyecto puente Av. Boyacá – Suba (según portafolio).",
    imagen: "assets/proyectos/puente-boyaca-suba.jpg"
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
  { src: "assets/galeria/galeria-1.jpg", alt: "Galería 1" },
  { src: "assets/galeria/galeria-2.jpg", alt: "Galería 2" },
  { src: "assets/galeria/galeria-3.jpg", alt: "Galería 3" },
  { src: "assets/galeria/galeria-4.jpg", alt: "Galería 4" },
  { src: "assets/galeria/galeria-5.jpg", alt: "Galería 5" },
  { src: "assets/galeria/galeria-6.jpg", alt: "Galería 6" },
  { src: "assets/galeria/galeria-7.jpg", alt: "Galería 7" },
  { src: "assets/galeria/galeria-8.jpg", alt: "Galería 8" },
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
function renderServices(){
  const wrap = $("#servicesAccordion");
  wrap.innerHTML = services.map((s, idx) => `
    <div class="accItem reveal" data-acc="${idx}">
      <button class="accBtn" type="button" aria-expanded="false">
        <span>${s.titulo}</span>
        <span class="accChevron">▾</span>
      </button>
      <div class="accPanel">${s.detalle}</div>
    </div>
  `).join("");

  $$(".accItem", wrap).forEach(item => {
    const btn = $(".accBtn", item);
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  setupReveal();
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
