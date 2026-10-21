// ============ CONFIGURACIÓN ============
// Número de WhatsApp con código de país (54 = Argentina), sin + ni espacios.
const WHATSAPP = "5491133462060";

// ============ PRODUCTOS ============
// imagen = foto en la carpeta images · color = fondo de la tarjeta · stock = unidades disponibles
const PRODUCTOS = [
  {id:1,  nombre:"Birome azul",               cat:"Escritura",         precio:500,   stock:4,  imagen:"images/biromeazul.jpg", color:"#DCEBF5", desc:"Trazo suave, tinta azul de secado rápido."},
  {id:2,  nombre:"Pack de biromes x6",        cat:"Escritura",         precio:2800,  stock:25, imagen:"images/packx6.jpg", color:"#EADDF0", desc:"Seis colores surtidos para tomar apuntes."},
  {id:3,  nombre:"Lápiz negro HB",            cat:"Escritura",         precio:400,   stock:60, imagen:"images/lapiznegro.jpg", color:"#FDF0C8", desc:"Ideal para escribir, dibujar y escolar."},
  {id:4,  nombre:"Lápices de colores x12",    cat:"Arte",              precio:4500,  stock:30, imagen:"images/lapicesdecolor.jpg", color:"#FDE0E8", desc:"Colores intensos en caja de cartón."},
  {id:5,  nombre:"Goma de borrar",            cat:"Accesorios",        precio:350,   stock:3,  imagen:"images/gomadeborrar.jpg", color:"#F8E6EF", desc:"Borra sin manchar ni dañar el papel."},
  {id:6,  nombre:"Cuaderno tapa dura 48 h",   cat:"Cuadernos y papel", precio:3900,  stock:40, imagen:"images/cuadernotapadura.jpeg", color:"#E4DAF2", desc:"Hojas rayadas con tapa dura resistente."},
  {id:7,  nombre:"Cuaderno espiral A4 80 h",  cat:"Cuadernos y papel", precio:5200,  stock:35, imagen:"images/cuadernotapaduraanillado.jpg", color:"#D7EFE8", desc:"Espiral doble, ideal para materias."},
  {id:8,  nombre:"Carpeta N°3 con anillos",   cat:"Cuadernos y papel", precio:6800,  stock:18, imagen:"images/carpeta.jpg", color:"#FCE3C8", desc:"Carpeta escolar con 3 anillos metálicos."},
  {id:9,  nombre:"Resma A4 500 hojas",        cat:"Cuadernos y papel", precio:9500,  stock:22, imagen:"images/resma.jpg", color:"#F4F1E3", desc:"Papel blanco 75 g para impresión."},
  {id:10, nombre:"Marcadores fluo x4",        cat:"Escritura",         precio:3600,  stock:20, imagen:"images/marcadoresfluo.jpg", color:"#F3F7C9", desc:"Resaltadores en cuatro tonos fluo."},
  {id:11, nombre:"Regla 30 cm",               cat:"Accesorios",        precio:700,   stock:45, imagen:"images/regls.jpg", color:"#E0ECF8", desc:"Regla transparente con graduación nítida."},
  {id:12, nombre:"Tijera escolar",            cat:"Accesorios",        precio:1900,  stock:28, imagen:"images/tijera.jpg", color:"#EADDF0", desc:"Punta redonda y mango ergonómico."},
  {id:13, nombre:"Adhesivo vinílico 40 g",    cat:"Accesorios",        precio:1200,  stock:32, imagen:"images/adhesivo.jpg", color:"#FFF3D6", desc:"Pegamento lavable para papel y cartulina."},
  {id:14, nombre:"Corrector líquido",         cat:"Escritura",         precio:1100,  stock:5,  imagen:"images/corrector.jpg", color:"#EFEFF7", desc:"Cubre rápido y seca en segundos."},
  {id:15, nombre:"Set de geometría",          cat:"Accesorios",        precio:2400,  stock:19, imagen:"images/setgeometria.jpg", color:"#D9F0E9", desc:"Regla, escuadras y transportador."},
  {id:16, nombre:"Notas adhesivas",           cat:"Cuadernos y papel", precio:1800,  stock:50, imagen:"images/notasadhesivas.jpg", color:"#FFF4B8", desc:"Taco de 100 notas para recordatorios."},
  {id:17, nombre:"Cartuchera con cierre",     cat:"Accesorios",        precio:4200,  stock:15, imagen:"images/cartuchera.jpg", color:"#F5D8E8", desc:"Tela resistente con cierre y compartimentos."},
  {id:18, nombre:"Block de dibujo N°5",       cat:"Arte",              precio:2600,  stock:24, imagen:"images/blockdibujo.jpg", color:"#FBE2D2", desc:"24 hojas blancas, ideal para ilustrar."},
  {id:19, nombre:"Fibras de colores x12",     cat:"Arte",              precio:3800,  stock:26, imagen:"images/fibras.jpg", color:"#E2E7FA", desc:"Punta media, tinta lavable."},
  {id:20, nombre:"Sacapuntas doble",          cat:"Accesorios",        precio:450,   stock:6,  imagen:"images/sacapuntas.jpg", color:"#E6F1DC", desc:"Dos medidas y depósito para virutas."}
];

// ============ UTILIDADES ============
const $ = id => document.getElementById(id);
const plata = n => "$" + n.toLocaleString("es-AR");
let carrito = {};           // { idProducto: cantidad }
let categoriaActiva = "Todos";

function guardar(){ try{ localStorage.setItem("mundopapel_carrito", JSON.stringify(carrito)); }catch(e){} }
function cargar(){
  try{
    const g = JSON.parse(localStorage.getItem("mundopapel_carrito") || "{}");
    Object.keys(g).forEach(id => { if(PRODUCTOS.find(p => p.id == id) && g[id] > 0) carrito[id] = g[id]; });
  }catch(e){}
}
function aviso(texto){
  const t = $("toast"); t.textContent = texto; t.classList.add("ver");
  clearTimeout(aviso.tm); aviso.tm = setTimeout(() => t.classList.remove("ver"), 1800);
}

// ============ CATÁLOGO ============
function dibujarFiltros(){
  const cats = ["Todos", ...new Set(PRODUCTOS.map(p => p.cat))];
  $("filtros").innerHTML = cats.map(c =>
    `<button class="filtro ${c===categoriaActiva?'activo':''}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll(".filtro").forEach(b => b.onclick = () => { categoriaActiva = b.dataset.cat; dibujarFiltros(); dibujarProductos(); });
}
function dibujarProductos(){
  const lista = PRODUCTOS.filter(p => categoriaActiva === "Todos" || p.cat === categoriaActiva);
  $("grilla").innerHTML = lista.map(p => `
    <article class="tarjeta">
      <div class="imagen" style="background:${p.color}">
        ${p.stock <= 5 ? '<span class="aviso">¡Últimas unidades!</span>' : ''}
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      </div>
      <div class="info">
        <span class="cat">${p.cat}</span>
        <h3>${p.nombre}</h3>
        <p class="desc">${p.desc}</p>
        <div class="fila">
          <span class="precio">${plata(p.precio)}</span>
          <button class="agregar" data-id="${p.id}">+ Agregar</button>
        </div>
      </div>
    </article>`).join("");
  document.querySelectorAll(".agregar").forEach(b => b.onclick = () => agregar(Number(b.dataset.id)));
}

// ============ CARRITO ============
function agregar(id){
  const p = PRODUCTOS.find(x => x.id === id);
  const actual = carrito[id] || 0;
  if(actual >= p.stock){ aviso("No hay más stock de " + p.nombre); return; }
  carrito[id] = actual + 1;
  guardar(); dibujarCarrito(); aviso("✓ " + p.nombre + " agregado");
}
function cambiar(id, delta){
  const p = PRODUCTOS.find(x => x.id === id);
  const nueva = (carrito[id] || 0) + delta;
  if(nueva > p.stock){ aviso("Stock máximo: " + p.stock + " unidades"); return; }
  if(nueva <= 0) delete carrito[id]; else carrito[id] = nueva;
  guardar(); dibujarCarrito();
}
function quitar(id){ delete carrito[id]; guardar(); dibujarCarrito(); }

function total(){ return Object.keys(carrito).reduce((s,id) => s + PRODUCTOS.find(p => p.id == id).precio * carrito[id], 0); }
function cantidadTotal(){ return Object.values(carrito).reduce((s,n) => s + n, 0); }

function dibujarCarrito(){
  const ids = Object.keys(carrito);
  $("contador").textContent = cantidadTotal();
  $("total").textContent = plata(total());
  $("pie").style.display = ids.length ? "block" : "none";
  if(!ids.length){
    $("items").innerHTML = `<div class="vacio"><span><svg class="ico" viewBox="0 0 24 24"><path d="M3 4h2l2.4 11h10.2l2-8H6.2"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg></span>Tu carrito está vacío.<br>¡Agregá algunos productos!</div>`;
    return;
  }
  $("items").innerHTML = ids.map(id => {
    const p = PRODUCTOS.find(x => x.id == id), n = carrito[id];
    return `
    <div class="item">
      <div class="item-ico" style="background:${p.color}"><img src="${p.imagen}" alt=""></div>
      <div>
        <h4>${p.nombre}</h4>
        <small>${plata(p.precio)} c/u</small>
        <div class="cant">
          <button onclick="cambiar(${p.id},-1)" aria-label="Quitar uno">−</button>
          <strong>${n}</strong>
          <button onclick="cambiar(${p.id},1)" aria-label="Sumar uno">+</button>
        </div>
      </div>
      <div>
        <div class="sub">${plata(p.precio * n)}</div>
        <button class="quitar" onclick="quitar(${p.id})">Quitar</button>
      </div>
    </div>`;
  }).join("");
}

function abrir(){ $("panel").classList.add("abierto"); $("fondo").classList.add("abierto"); }
function cerrar(){ $("panel").classList.remove("abierto"); $("fondo").classList.remove("abierto"); }

// ============ FINALIZAR POR WHATSAPP ============
function finalizar(){
  if(!cantidadTotal()) return;
  const nombre = $("nombre").value.trim();
  if(!nombre){
    $("campoNombre").classList.add("error"); $("nombre").focus();
    aviso("Escribí tu nombre para continuar"); return;
  }
  $("campoNombre").classList.remove("error");

  let msg = "¡Hola Mundo Papel! Quiero hacer este pedido:\n\n";
  Object.keys(carrito).forEach(id => {
    const p = PRODUCTOS.find(x => x.id == id), n = carrito[id];
    msg += "- " + n + " x " + p.nombre + " — " + plata(p.precio * n) + "\n";
  });
  msg += "\n*TOTAL: " + plata(total()) + "*\n\n";
  msg += "Nombre: " + nombre + "\n";
  msg += "Entrega: " + $("entrega").value + "\n";
  msg += "Pago: " + $("pago").value + "\n";
  const nota = $("nota").value.trim();
  if(nota) msg += "Comentarios: " + nota + "\n";

  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
}

// ============ EVENTOS ============
$("abrirCarrito").onclick = abrir;
$("cerrarCarrito").onclick = cerrar;
$("fondo").onclick = cerrar;
$("finalizar").onclick = finalizar;
$("vaciar").onclick = () => { carrito = {}; guardar(); dibujarCarrito(); };
document.addEventListener("keydown", e => { if(e.key === "Escape") cerrar(); });

// ============ INICIO ============
$("linkWsp").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("¡Hola Mundo Papel! Tengo una consulta.");
$("numVisible").textContent = "11 3346-2060";
cargar(); dibujarFiltros(); dibujarProductos(); dibujarCarrito();
