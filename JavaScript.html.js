
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//Variables

var IDPARAMONTAR = "0";
var opciones = [];
var cont = 0;
var flagImagen = 0;

//--------------------  Eventos  -------------------------------------

document.getElementById("BUSCARID").addEventListener('click', () => {

  if (document.getElementById("ID").value == "") {
    window.alert("Debes ingresar un numero de ID");
    return
  }
  let ID = document.getElementById("ID").value;
  google.script.run.withSuccessHandler(function (output) {
    document.getElementById("DIRECCION").value = output[1];
    document.getElementById("NODO").value = output[0];
    if ((document.getElementById("DIRECCION").value == "") && (document.getElementById("NODO").value == "")) {
      window.alert(`El ID: ${ID} no fue ubicado dentro de la Planilla de Produccion`);
      return
    }
  }).buscarID(ID);
})

document.getElementById("LOCAL").addEventListener("change", () => {

  if ((document.getElementById("LOCAL").value == "NO")) {
    document.getElementById("LOCALCANT").value = "";
    document.getElementById("LOCALCANT").disabled = true;
  }
  else {
    document.getElementById("LOCALCANT").disabled = false;
  }

})

document.getElementById("switchPropuestas").addEventListener("change", () => {

  let ObsPropuesta = document.getElementById("OBS");
  let checks = document.querySelectorAll(".form-check-input");


  checks.forEach((e, index) => {

    if (e.checked == true) {
      opciones[index] = e.value;
    }
    else {
      opciones[index] = 0;
    }
  });

  opciones.forEach((e) => {
    if (e > 0) {
      cont++;
    }
  });
  ObsPropuesta.value = "";
  opciones.forEach((e) => {
    switch (e) {
      case "1": ObsPropuesta.value += "  • Se propone armado por exterior del edificio distribuyendo los equipos en la terraza del mismo respetando la prolijidad de los cables desde el ingreso hasta los equipos e instalando uno o más conjuntos para minimizar la cantidad y el recorrido de cables por la terraza, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      case "2": ObsPropuesta.value += "  • Se propone armado por montante del edificio distribuyendo los equipos en las bocas de inspección de los pisos respetando la prolijidad de los cables desde el ingreso hasta los equipos, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      case "3": ObsPropuesta.value += "  • Se propone armado por exterior del edificio distribuyendo los equipos en la terraza del mismo respetando la prolijidad de los cables de fibra óptica desde el ingreso hasta los equipos e instalando uno o más conjuntos para minimizar la cantidad y el recorrido de cables por la terraza, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      case "4": ObsPropuesta.value += "  • Se propone armado por montante del edificio respetando la prolijidad de los cables de fibra óptica  desde el ingreso hasta la caja principal y distribuyendo a las cajas secundarias ubicadas dentro o fuera de las bocas de inspección de los pisos, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      default: break;
    }

  });

})


document.getElementById("RangoPisos").addEventListener("mousemove", () => {
  document.getElementById("PISOS").value = document.getElementById("RangoPisos").value;
})

document.getElementById("RangoDPTOS").addEventListener("mousemove", () => {
  document.getElementById("DPTOS").value = document.getElementById("RangoDPTOS").value;
})



document.getElementById("FORMULARIO").addEventListener('submit', () => {

  if ((document.getElementById("ID").value == "") || (document.getElementById("NODO").value == "") || (document.getElementById("DIRECCION").value == "") || (document.getElementById("ZONA").value == "") || (document.getElementById("PISOS").value == "") || (document.getElementById("DPTOS").value == "") || (document.getElementById("TIPOINFO").value == "") || (document.getElementById("TELEFN1").value == "") || (document.getElementById("TELEF11").value == "") || (document.getElementById("TELEF12").value == "") || (document.getElementById("TELEF13").value == "") || (document.getElementById("LOCAL").value == "") || (document.getElementById("COMPETENCIA").value == "")) {
    alert("Debe completar todos los campos")
    return
  }



  //-------------------------- obligatoriedad de Propuesta de Armado -------------------------------
  if (cont == 0) {
    alert("Debe ingresar al menos una Propuesta de Armado para la gestion")
    return
  }

  //-------------------------- obligatoriedad de Observacion Adicional si carga una imagen -------------------------------
  if (flagImagen != 0) {
    if ((document.getElementById("OBS1").value == "")) {
      alert("!indicar la observacion adicional de la imagen adjunta¡");
      document.getElementById("OBS1").focus;
      return
    }
  }

  //-------------------------- Envio de info para generar el Docs -------------------------------

  document.getElementById("GENERAR").disabled = true;

  /*
    setTimeout(function () {
      document.getElementById("GENERAR").disabled = false;
    }, 15000);
    */

  let Titulo;
  let Permisoenviar;
  let Competenciaenviar;


  CampoID = document.getElementById("ID").value;
  CampoNodo = document.getElementById("NODO").value.toUpperCase();
  CampoDireccion = document.getElementById("DIRECCION").value.toUpperCase();
  CampoZona = document.getElementById("ZONA").value.toUpperCase();
  CampoPisos = document.getElementById("PISOS").value;
  CampoDptos = document.getElementById("DPTOS").value;
  let ObsPropuesta = document.getElementById("OBS").value;
  let ObsGeneral = document.getElementById("OBS1").value;


  Titulo = document.getElementById("TIPOINFO").value;

  /*
    switch (document.getElementById("PERMISO").value) {
      case "1": Permisoenviar = "Permite armado por exterior y tiene cañería destinada para CATV (montante)."; break;
      case "2": Permisoenviar = "No permite armado por exterior, tiene cañería destinada para CATV(montante)."; break;
      case "3": Permisoenviar = "Permite armado por exterior, no tiene cañería destinada para CATV(montante)."; break;
      case "4": Permisoenviar = "No tiene permiso, ingreso como una VT de instalación."; break;
      default: break;
    }
  
  */
  switch (document.getElementById("COMPETENCIA").value) {
    case "1": Competenciaenviar = "Las competencias se encuentran armadas por Exterior y ofrecen servicios de internet y cable."; break;
    case "2": Competenciaenviar = "Las competencias se encuentran armadas por Montante y ofrecen servicios de internet y cable."; break;
    case "3": Competenciaenviar = "Las competencias se encuentran armadas por Exterior y Montante y ofrecen servicios de internet y cable."; break;
    case "4": Competenciaenviar = "El Edificio no posee otras empresas instaladas."; break;
    default: break;
  }

  //-------------------------- Formato para el Campo de multiples contactos -------------------------------

  let Contact = multiContactos();

  //-------------------------- Locales -------------------------------

  if ((document.getElementById("LOCAL").value == "SI")) {

    if ((document.getElementById("LOCALCANT").value == "")) {
      alert("!indicar que SI existen locales tomando del Edif requiere que indique la cantidad de los mismos¡")
      return
    }
    else {
      localesEnviar = document.getElementById("LOCALCANT").value;
    }
  }

  if ((document.getElementById("LOCAL").value == "NO")) {
    localesEnviar = 0;
  }

  //--------------------------  -------------------------------



  google.script.run.withSuccessHandler(abrirNuevoTab).Escribir(CampoID, CampoNodo, CampoDireccion, CampoZona, CampoPisos, CampoDptos, IDPARAMONTAR, Titulo, Contact, Permisoenviar, Competenciaenviar, localesEnviar, opciones, ObsPropuesta, ObsGeneral);

})



//-------------------------------------  Funciones  -------------------------------------

function dePrueba(c) {

  console.log("RETORNO " + c);

}

function multiContactos() {

  let objContacto1 = {
    tipo: document.getElementById("TELEFN1").value,
    nombre: document.getElementById("TELEF11").value,
    telf: document.getElementById("TELEF12").value,
    Mail: document.getElementById("TELEF13").value
  }
  CampoContacto = `•   ${objContacto1.tipo}: ${objContacto1.nombre}      Teléfono: ${objContacto1.telf}      Mail: ${objContacto1.Mail}\n`;

  if ((document.getElementById("TELEFN2").value != "") || (document.getElementById("TELEF21").value != "") || (document.getElementById("TELEF22").value != "") || (document.getElementById("TELEF23").value != "")) {
    if ((document.getElementById("TELEFN2").value == "") || (document.getElementById("TELEF21").value == "") || (document.getElementById("TELEF22").value == "") || (document.getElementById("TELEF23").value == "")) {
      alert("!Debe completar todos los campos del segundo contacto\n ( - = No Indica)¡")
      return
    }
    else {
      let objContacto2 = {
        tipo: document.getElementById("TELEFN2").value,
        nombre: document.getElementById("TELEF21").value,
        telf: document.getElementById("TELEF22").value,
        Mail: document.getElementById("TELEF23").value
      }
      CampoContacto += `\n•   ${objContacto2.tipo}: ${objContacto2.nombre}      Teléfono: ${objContacto2.telf}      Mail: ${objContacto2.Mail}\n`;
    }
  }

  if ((document.getElementById("TELEFN3").value != "") || (document.getElementById("TELEF31").value != "") || (document.getElementById("TELEF32").value != "") || (document.getElementById("TELEF33").value != "")) {
    if ((document.getElementById("TELEFN3").value == "") || (document.getElementById("TELEF31").value == "") || (document.getElementById("TELEF32").value == "") || (document.getElementById("TELEF33").value == "")) {
      alert("!Debe completar todos los campos del Tercer contacto\n ( - = No Indica)¡")
      return
    }
    else {
      let objContacto3 = {
        tipo: document.getElementById("TELEFN3").value,
        nombre: document.getElementById("TELEF31").value,
        telf: document.getElementById("TELEF32").value,
        Mail: document.getElementById("TELEF33").value
      }
      CampoContacto += `\n•   ${objContacto3.tipo}: ${objContacto3.nombre}      Teléfono: ${objContacto3.telf}      Mail: ${objContacto3.Mail}\n`;
    }
  }
  return (CampoContacto);
}





function abrirNuevoTab(idDoc) {
  // Abrir nuevo tab
  document.getElementById("GENERAR").disabled = false;
  let url = "https://docs.google.com/document/d/" + idDoc + "/edit";
  let win = window.open(url, '_blank');
  win.focus();
  // Cambiar el foco al nuevo tab (punto opcional)
}

