const ingresos = [
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta coche", 1600.0),
];

const egresos = [
  new Egreso("Renta", 900.0),
  new Egreso("Ropa", 500.0)
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngreso();
  cargarEgresos();
};

let totalIngreso = () => {
  let total = 0;
  for (let ingreso of ingresos) {
    total += ingreso.valor;
  }
  return total;
};

let totalEgreso = () => {
  let total = 0;
  for (let egreso of egresos) {
    total += egreso.valor;
  }
  return total;
};

let cargarCabecero = () => {
  let ing = totalIngreso();
  let egr = totalEgreso();
  document.getElementById("ingresos").innerHTML = formatoMoneda(ing);
  document.getElementById("egresos").innerHTML = formatoMoneda(egr);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(
    egr / ing
  );
  document.getElementById("presupuesto").innerHTML = formatoMoneda(ing - egr);
};

const formatoMoneda = (variable) => {
  return variable.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (variable) => {
  return variable.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngreso = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }

  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresosHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
     </div>`;

  return ingresosHTML;
};

const eliminarIngreso = (id) => {
  let indElim = ingresos.findIndex(ingreso => ingreso.id === id);
  ingresos.splice(indElim, 1);
  cargarCabecero();
  cargarIngreso();
  //for (const iterator of object)
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresosHTML = `
      <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${egreso.descripcion}</div>
          <div class="derecha limpiarEstilos">
              <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgreso())}</div>
              <div class="elemento_eliminar">
                  <button class="elemento_eliminar--btn">
                      <ion-icon name="close-circle-outline"
                      onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
                  </button>
              </div>
          </div>
       </div>`;

  return egresosHTML;
};

const eliminarEgreso = (id) => {
  let indElim = egresos.findIndex(egreso => egreso.id === id);
  egresos.splice(indElim, 1);
  cargarCabecero();
  cargarEgresos();
};

let agregarDato = () => {
  let forma = document.forms['forma'];
  let tipo = forma['tipo'];
  let descripcion = forma['descripcion'];
  let valor = forma['valor'];
  if(descripcion.value !== '' && valor.value !== ''){
    if(tipo.value === 'ingreso'){
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngreso();
    }
    else{
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
}
