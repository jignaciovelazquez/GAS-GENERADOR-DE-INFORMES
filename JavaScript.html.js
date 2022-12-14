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


//Star
window.addEventListener("DOMContentLoaded", () => {
  const toast = new bootstrap.Toast(document.getElementById("liveToast"));
  toast.show();
})

//Variables

var IDPARAMONTAR = "0";
var IDPARAMONTAR2 = "0";
var opciones = [];
var cont = 0;
var flagImagen = 0;
var Pie1 = "0";
var Pie2 = "0";

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

document.getElementById("BORRAR").addEventListener('click', () => {
  location.reload()
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


document.getElementById("TIPOINFO").addEventListener("change", () => {

  mostrarOpciones();
  document.getElementById("OBS1").value = "";
  document.getElementById("PIE1").value = "";

  if ((document.getElementById("TIPOINFO").value == "2")) {
    document.getElementById("inlineCheckbox1").disabled = false;
    document.getElementById("inlineCheckbox2").disabled = false;
    document.getElementById("inlineCheckbox3").disabled = false;
    document.getElementById("inlineCheckbox4").disabled = false;
    document.getElementById("OBS").disabled = false;
  }

  if ((document.getElementById("TIPOINFO").value == "3")) {
    document.getElementById("inlineCheckbox1").disabled = true;
    document.getElementById("inlineCheckbox2").disabled = true;
    document.getElementById("inlineCheckbox3").disabled = true;
    document.getElementById("inlineCheckbox4").disabled = true;
    document.getElementById("OBS").disabled = true;
  }

  if ((document.getElementById("TIPOINFO").value == "4")) {
    document.getElementById("inlineCheckbox1").disabled = false;
    document.getElementById("inlineCheckbox2").disabled = false;
    document.getElementById("inlineCheckbox3").disabled = false;
    document.getElementById("inlineCheckbox4").disabled = false;
    document.getElementById("OBS").disabled = false;
  }

  if ((document.getElementById("TIPOINFO").value == "5")) {
    document.getElementById("inlineCheckbox1").disabled = true;
    document.getElementById("inlineCheckbox2").disabled = true;
    document.getElementById("inlineCheckbox3").disabled = true;
    document.getElementById("inlineCheckbox4").disabled = true;
    document.getElementById("OBS").disabled = true;
    document.getElementById("OBS1").value = "Motivos de Cierre en VTs: ";
    document.getElementById("PIE1").value = "Fuente: comentario ETAD ";
    ocultarOpciones();
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
      case "1": ObsPropuesta.value += "  ??? Se propone armado por exterior del edificio distribuyendo los equipos en la terraza del mismo respetando la prolijidad de los cables desde el ingreso hasta los equipos e instalando uno o m??s conjuntos para minimizar la cantidad y el recorrido de cables por la terraza, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      case "2": ObsPropuesta.value += "  ??? Se propone armado por montante del edificio distribuyendo los equipos en las bocas de inspecci??n de los pisos respetando la prolijidad de los cables desde el ingreso hasta los equipos, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      case "3": ObsPropuesta.value += "  ??? Se propone armado por exterior del edificio distribuyendo los equipos en la terraza del mismo respetando la prolijidad de los cables de fibra ??ptica desde el ingreso hasta los equipos e instalando uno o m??s conjuntos para minimizar la cantidad y el recorrido de cables por la terraza, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      case "4": ObsPropuesta.value += "  ??? Se propone armado por montante del edificio respetando la prolijidad de los cables de fibra ??ptica  desde el ingreso hasta la caja principal y distribuyendo a las cajas secundarias ubicadas dentro o fuera de las bocas de inspecci??n de los pisos, garantizando la correcta cobertura de los futuros abonados dentro del edificio.\n"; break;
      default: break;
    }

  });

})

/*
document.getElementById("RangoPisos").addEventListener("mousemove", () => {
  document.getElementById("PISOS").value = document.getElementById("RangoPisos").value;
})

document.getElementById("RangoDPTOS").addEventListener("mousemove", () => {
  document.getElementById("DPTOS").value = document.getElementById("RangoDPTOS").value;
})
*/

document.getElementById("PIE1").addEventListener("change", () => {
  Pie1 = document.getElementById("PIE1").value;
})
document.getElementById("PIE2").addEventListener("change", () => {
  Pie2 = document.getElementById("PIE2").value;
})



document.getElementById("FORMULARIO").addEventListener('submit', () => {

  if ((document.getElementById("ID").value == "") || (document.getElementById("NODO").value == "") || (document.getElementById("DIRECCION").value == "") || (document.getElementById("ZONA").value == "") || (document.getElementById("PISOS").value == "") || (document.getElementById("DPTOS").value == "") || (document.getElementById("TIPOINFO").value == "")) {
    alert("Debe completar todos los campos 1")
    return
  }

  if ((document.getElementById("TIPOINFO").value != "5") && ((document.getElementById("TELEFN1").value == "") || (document.getElementById("TELEF11").value == "") || (document.getElementById("TELEF12").value == "") || (document.getElementById("TELEF13").value == "") || (document.getElementById("LOCAL").value == "") || (document.getElementById("COMPETENCIA").value == ""))) {
    alert("Debe completar todos los campos 2")
    return
  } else {
    if (flagImagen == 0) {
      alert("!Debe completar al menos una imagen adjunta de la nota de incumplimiento??");
      return
    }
    if (document.getElementById("OBS1").value == "Motivos de Cierre en VTs: ") {
      alert("!Debe completar el numero de VT donde se describe el incumplimiento??");
      return
    }

  }



  //-------------------------- obligatoriedad de Propuesta de Armado -------------------------------

  if ((document.getElementById("TIPOINFO").value != "3") && (document.getElementById("TIPOINFO").value != "5")) {

    if (cont == 0) {
      alert("Debe ingresar al menos una Propuesta de Armado para la gestion")
      return
    }
  }

  //-------------------------- obligatoriedad de Observacion Adicional si carga una imagen -------------------------------
  if (flagImagen != 0) {
    if ((document.getElementById("OBS1").value == "")) {
      alert("!indicar la observacion adicional de la imagen adjunta??");
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

  let Titulo = "";
  let Permisoenviar = "";
  let CampoID = document.getElementById("ID").value;
  let CampoNodo = document.getElementById("NODO").value.toUpperCase();
  let CampoDireccion = document.getElementById("DIRECCION").value.toUpperCase();
  let CampoZona = document.getElementById("ZONA").value.toUpperCase();
  let CampoPisos = document.getElementById("PISOS").value;
  let CampoDptos = document.getElementById("DPTOS").value;
  let ObsPropuesta = document.getElementById("OBS").value;
  let ObsGeneral = document.getElementById("OBS1").value;
  Pie1 = document.getElementById("PIE1").value;
  Pie2 = document.getElementById("PIE2").value;
  let Competenciaenviar = "";
  let Contact = "";
  let localesEnviar = 0;


  Titulo = document.getElementById("TIPOINFO").value;

  /*
    switch (document.getElementById("PERMISO").value) {
      case "1": Permisoenviar = "Permite armado por exterior y tiene ca??er??a destinada para CATV (montante)."; break;
      case "2": Permisoenviar = "No permite armado por exterior, tiene ca??er??a destinada para CATV(montante)."; break;
      case "3": Permisoenviar = "Permite armado por exterior, no tiene ca??er??a destinada para CATV(montante)."; break;
      case "4": Permisoenviar = "No tiene permiso, ingreso como una VT de instalaci??n."; break;
      default: break;
    }
  
  */

  if (Titulo != "5") {

    switch (document.getElementById("COMPETENCIA").value) {
      case "1": Competenciaenviar = "Las competencias se encuentran armadas por Exterior y ofrecen servicios de internet y cable."; break;
      case "2": Competenciaenviar = "Las competencias se encuentran armadas por Montante y ofrecen servicios de internet y cable."; break;
      case "3": Competenciaenviar = "Las competencias se encuentran armadas por Exterior y Montante y ofrecen servicios de internet y cable."; break;
      case "4": Competenciaenviar = "El Edificio no posee otras empresas instaladas."; break;
      default: break;
    }

    //-------------------------- Formato para el Campo de multiples contactos -------------------------------

    Contact = multiContactos();

    //-------------------------- Locales -------------------------------

    if ((document.getElementById("LOCAL").value == "SI")) {

      if ((document.getElementById("LOCALCANT").value == "")) {
        alert("!indicar que SI existen locales tomando del Edif requiere que indique la cantidad de los mismos??")
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

  } else {
    Competenciaenviar = "";
    Contact = "";
    localesEnviar = 0;
    ObsPropuesta = "";
  }


  google.script.run.withSuccessHandler(abrirNuevoTab).Escribir(CampoID, CampoNodo, CampoDireccion, CampoZona, CampoPisos, CampoDptos, IDPARAMONTAR, IDPARAMONTAR2, Titulo, Contact, Permisoenviar, Competenciaenviar, localesEnviar, opciones, ObsPropuesta, ObsGeneral, Pie1, Pie2);

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
  CampoContacto = `???   ${objContacto1.tipo}: ${objContacto1.nombre}      Tel??fono: ${objContacto1.telf}      Mail: ${objContacto1.Mail}\n`;

  if ((document.getElementById("TELEFN2").value != "") || (document.getElementById("TELEF21").value != "") || (document.getElementById("TELEF22").value != "") || (document.getElementById("TELEF23").value != "")) {
    if ((document.getElementById("TELEFN2").value == "") || (document.getElementById("TELEF21").value == "") || (document.getElementById("TELEF22").value == "") || (document.getElementById("TELEF23").value == "")) {
      alert("!Debe completar todos los campos del segundo contacto\n ( - = No Indica)??")
      return
    }
    else {
      let objContacto2 = {
        tipo: document.getElementById("TELEFN2").value,
        nombre: document.getElementById("TELEF21").value,
        telf: document.getElementById("TELEF22").value,
        Mail: document.getElementById("TELEF23").value
      }
      CampoContacto += `\n???   ${objContacto2.tipo}: ${objContacto2.nombre}      Tel??fono: ${objContacto2.telf}      Mail: ${objContacto2.Mail}\n`;
    }
  }

  if ((document.getElementById("TELEFN3").value != "") || (document.getElementById("TELEF31").value != "") || (document.getElementById("TELEF32").value != "") || (document.getElementById("TELEF33").value != "")) {
    if ((document.getElementById("TELEFN3").value == "") || (document.getElementById("TELEF31").value == "") || (document.getElementById("TELEF32").value == "") || (document.getElementById("TELEF33").value == "")) {
      alert("!Debe completar todos los campos del Tercer contacto\n ( - = No Indica)??")
      return
    }
    else {
      let objContacto3 = {
        tipo: document.getElementById("TELEFN3").value,
        nombre: document.getElementById("TELEF31").value,
        telf: document.getElementById("TELEF32").value,
        Mail: document.getElementById("TELEF33").value
      }
      CampoContacto += `\n???   ${objContacto3.tipo}: ${objContacto3.nombre}      Tel??fono: ${objContacto3.telf}      Mail: ${objContacto3.Mail}\n`;
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

const ocultarOpciones = () => {
  document.getElementById("OPCIONESVARIAS").classList.remove("d-block");
  document.getElementById("OPCIONESVARIAS").classList.add("d-none");
}

const mostrarOpciones = () => {
  document.getElementById("OPCIONESVARIAS").classList.add("d-block");
  document.getElementById("OPCIONESVARIAS").classList.remove("d-none");
}