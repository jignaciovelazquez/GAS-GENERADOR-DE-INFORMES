function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
    .setTitle("Generador de informes")
    .setFaviconUrl("https://cdn-icons-png.flaticon.com/512/281/281760.png");
  return html

}

function buscarID(id) {
  const libro = SpreadsheetApp.openById("1iyba6EH-qooC6mA3jMy1NDFpf42bwcx1Uip-tGwsvT4");
  const Hoja = libro.getSheetByName("GESTIONES");
  const Hoja2 = libro.getSheetByName("Online");

  var UltimaFila1 = Hoja.getLastRow();
  var UltimaFila2 = Hoja2.getLastRow();

  for (i = 1; i <= UltimaFila1; i++) {
    if (Hoja.getRange(i, 1).getValue() == id) {
      let dir = Hoja.getRange(i, 3).getValue();
      let nod = Hoja.getRange(i, 2).getValue();
      return [nod, dir];
    }
  }
  for (i = 1; i <= UltimaFila2; i++) {
    if (Hoja2.getRange(i, 3).getValue() == id) {
      let dir = Hoja2.getRange(i, 5).getValue();
      let nod = Hoja2.getRange(i, 4).getValue();
      return [nod, dir];
    }
  }
  return ["", ""]
}


function uploadFiles(obj) {

  let file = Utilities.newBlob(obj.bytes, obj.mimeType, obj.filename);
  let folder = DriveApp.getFolderById("1yqqspPI_fys2D6TUcBUf2f9AfI4eKIg6");
  let createFile = folder.createFile(file);
  return createFile.getId();

}

function uploadFiles2(obj) {

  let file = Utilities.newBlob(obj.bytes, obj.mimeType, obj.filename);
  let folder = DriveApp.getFolderById("1yqqspPI_fys2D6TUcBUf2f9AfI4eKIg6");
  let createFile = folder.createFile(file);
  return createFile.getId();

}



function Escribir(id, nodo, direccion, zona, pisos, dptos, url, url2, tituloarmado, contacto, permiso, competencia, local, propuestas, ObsPropuesta, ObsGeneral, Pie1, Pie2) {


  let fechaActual = obtenerFecha();
  let loc = "";
  let locCant = 0;
  let titulo;
  let solucionPorpuesta = "";
  let nombreInfo;
  let docActual;
  let docNuevo;
  let idDocNuevo;
  let doc;


  //------------ crea una copia de informe test y reemplaza los campos ------------------

  if (tituloarmado != "5") {
    nombreInfo = `${nodo} - ${direccion} - DISEÑO 1`;
    docActual = DriveApp.getFileById("1GxtZQJd-WdtK3jUPpUgXb4gBkfQsJn4hBwtO-g6ypA0");
    docNuevo = docActual.makeCopy(nombreInfo);
    idDocNuevo = docNuevo.getId();
    doc = DocumentApp.openById(idDocNuevo);
  } else {
    nombreInfo = `${nodo} - ${direccion} - DISEÑO 1`;
    docActual = DriveApp.getFileById("1KTDIG5T2Z1nVv-ew1YVLcpRNxR5B3QgJggwQDI73-6Q");
    docNuevo = docActual.makeCopy(nombreInfo);
    idDocNuevo = docNuevo.getId();
    doc = DocumentApp.openById(idDocNuevo);
  }

  if (local > 0) {
    loc = "SI";
    locCant = local;
  }
  else {
    loc = "NO";
    locCant = 0;
  }


  switch (tituloarmado) {
    case "1":
      titulo = "INFORME DE PROPUESTA PARA ARMADO DE EDIFICIO";
      doc.getBody().replaceText("<<OBJ>>", "Dar a conocer las alternativas para realizar el armado del edificio.");
      break;
    case "2":
      titulo = "INFORME DE PREFACTIBILIDAD PARA ARMADO DE EDIFICIO";
      doc.getBody().replaceText("<<OBJ>>", "Dar a conocer las alternativas para realizar el armado del edificio.");
      break;
    case "3":
      titulo = "INFORME DE INCUMPLIMIENTO DE EDIFICIO";
      doc.getBody().replaceText("<<OBJ>>", "Dar a conocer las razones que impiden realizar el armado del edificio.");
      break;
    case "4":
      titulo = "INFORME DE PREFACTIBILIDAD PARA RECONVERSIÓN DE EDIFICIO";
      doc.getBody().replaceText("<<OBJ>>", "Dar a conocer las alternativas para realizar el cambio de equipos de tecnologia coaxial a los nuevos equipos de fibra optica.");
      break;
    case "5":
      titulo = "INFORME DE INCUMPLIMIENTO DE EDIFICIO";
      break;
    default: break;
  }



  //reemplazar los datos \
  doc.getBody().replaceText("<<ID>>", id);
  doc.getBody().replaceText("<<NODO>>", nodo);
  doc.getBody().replaceText("<<DIRECCION>>", direccion);
  doc.getBody().replaceText("<<ZONA>>", zona);
  doc.getBody().replaceText("<<pisos>>", pisos);
  doc.getBody().replaceText("<<UF>>", dptos);
  doc.getBody().replaceText("<<FECHA>>", fechaActual);
  doc.getBody().replaceText("<<TITULO>>", titulo);
  doc.getBody().replaceText("<<contactos>>", contacto);
  //doc.getBody().replaceText("<<permiso>>", permiso);
  doc.getBody().replaceText("<<locales>>", loc);
  doc.getBody().replaceText("<<localestoman>>", locCant);
  doc.getBody().replaceText("<<competencia>>", competencia);



  propuestas.forEach((e) => {
    switch (e) {
      case "1":
        doc.getBody().appendParagraph("PROPUESTA EXTERIOR-HFC\n");
        let imagen = DriveApp.getFileById("1hOP3MgwZVp7yPEyJoM4A0ggdPXFikeZV");
        let imagen2 = DriveApp.getFileById("1ymokXtLC1c8IHiJGCzRa5mqk22LvUkB7");
        var tabla = doc.getBody().appendTable();
        var fila = tabla.appendTableRow();
        fila.appendTableCell().appendImage(imagen.getBlob()).setHeight(300).setWidth(300);
        fila.appendTableCell().appendImage(imagen2.getBlob()).setHeight(300).setWidth(300);
        var fila = tabla.appendTableRow();
        fila.appendTableCell("Ejemplo equipo a instalar");
        fila.appendTableCell("Ejemplo equipo a instalar");
        break;

      case "2":
        doc.getBody().appendParagraph("PROPUESTA ARMADO MONTANTE-HFC\n");
        let imagen3 = DriveApp.getFileById("1cLpmuCFx0pORyFZ7AlLvBpFuh9xQdFf9");
        let imagen4 = DriveApp.getFileById("1PKiXcNhgpP1ohNYKDcfE89akYwlrtXkU");
        var tabla = doc.getBody().appendTable();
        var fila = tabla.appendTableRow();
        fila.appendTableCell().appendImage(imagen3.getBlob()).setHeight(300).setWidth(300);
        fila.appendTableCell().appendImage(imagen4.getBlob()).setHeight(300).setWidth(300);
        var fila = tabla.appendTableRow();
        fila.appendTableCell("Ejemplo equipo a instalar");
        fila.appendTableCell("Ejemplo equipo a instalar");
        break;

      case "3":
        doc.getBody().appendParagraph("PROPUESTA EXTERIOR-FTTH\n");
        let imagen5 = DriveApp.getFileById("1mISXF-y0wDaqZnT4T_Zj8PVRZg15rtjD");
        let imagen6 = DriveApp.getFileById("1cCE4Aq3pajDc28Rqpt2tPHJoywT9bAOY");
        var tabla = doc.getBody().appendTable();
        var fila = tabla.appendTableRow();
        fila.appendTableCell().appendImage(imagen5.getBlob()).setHeight(300).setWidth(300);
        fila.appendTableCell().appendImage(imagen6.getBlob()).setHeight(300).setWidth(300);
        var fila = tabla.appendTableRow();
        fila.appendTableCell("Ejemplo caja para fibra a instalar");
        fila.appendTableCell("Ejemplo caja para fibra a instalar");
        break;

      case "4":
        doc.getBody().appendParagraph("PROPUESTA MONTANTE-FTTH\n");
        let imagen7 = DriveApp.getFileById("19BWiOhNzefxE5LXKtDCohwMS7v2VuGSG");
        let imagen8 = DriveApp.getFileById("1S_vEYiXA83HUpf3gxJirpp2L58Fb6Dkd");
        let imagen9 = DriveApp.getFileById("1BqYeuI-IEsUYtny7C4W0B4IUcT8mQgzW");
        let imagen10 = DriveApp.getFileById("1Ha6CpZ7nZK6XEvJIoXe7moPi7gUD26Ur");
        var tabla = doc.getBody().appendTable();
        var fila = tabla.appendTableRow();
        fila.appendTableCell().appendImage(imagen7.getBlob()).setHeight(280).setWidth(280);
        fila.appendTableCell().appendImage(imagen8.getBlob()).setHeight(280).setWidth(280);
        var fila = tabla.appendTableRow();
        fila.appendTableCell("Ejemplo caja principal a instalar");
        fila.appendTableCell("Ejemplo cajas secundarias a instalar");
        var fila = tabla.appendTableRow();
        fila.appendTableCell().appendImage(imagen9.getBlob()).setHeight(360).setWidth(300);
        fila.appendTableCell().appendImage(imagen10.getBlob()).setHeight(360).setWidth(300);
        var fila = tabla.appendTableRow();
        fila.appendTableCell("Ejemplo caja principal a instalar");
        fila.appendTableCell("Ejemplo cajas secundarias a instalar");
        break;
    }
  });


  doc.getBody().replaceText("<<PROPUESTA>>", ObsPropuesta);

  if (tituloarmado != "5") {

    if ((ObsGeneral != "") && (url == "0") && (url2 == "0")) {

      //doc.getBody().insertParagraph(35,"").appendPageBreak();
      //doc.getBody().replaceText("<<OBSGENERAL>>", "Observación General");
      doc.getBody().insertParagraph(36, ObsGeneral);
    }


    if (url != "0") {

      let imagenn = DriveApp.getFileById(url);
      doc.getBody().insertParagraph(32, "").appendPageBreak();

      doc.getBody().insertParagraph(35, ObsGeneral);

      doc.getBody().insertImage(37, imagenn.getBlob()).setHeight(300).setWidth(300);
      doc.getBody().insertParagraph(38, Pie1);

    }

    if (url2 != "0") {

      let imagenn2 = DriveApp.getFileById(url2);
      //doc.getBody().insertParagraph(32, "").appendPageBreak();

      doc.getBody().insertImage(39, imagenn2.getBlob()).setHeight(300).setWidth(300);
      doc.getBody().insertParagraph(40, Pie2);

    }
  } else {
    if ((ObsGeneral != "") && (url == "0") && (url2 == "0")) {
      doc.getBody().insertParagraph(20, ObsGeneral);
    }


    if (url != "0") {

      let imagenn = DriveApp.getFileById(url);
      //doc.getBody().insertParagraph(18, "").appendPageBreak();

      doc.getBody().insertParagraph(20, ObsGeneral);

      doc.getBody().insertImage(22, imagenn.getBlob()).setHeight(700).setWidth(600);
      doc.getBody().insertParagraph(23, Pie1);

    }

    if (url2 != "0") {

      let imagenn2 = DriveApp.getFileById(url2);
      doc.getBody().insertParagraph(24, "").appendPageBreak();

      doc.getBody().insertImage(25, imagenn2.getBlob()).setHeight(700).setWidth(600);
      doc.getBody().insertParagraph(26, Pie2);

    }

  }

  return (idDocNuevo);
}


function obtenerFecha() {
  //--------- obtener fecha del dia con el nombre del mes ---------------------------
  let fecha = new Date();
  let dia = fecha.getDate();
  let mesNum = fecha.getMonth();
  let anio = fecha.getFullYear();

  switch (mesNum) {
    case 0: var mes = "Enero"; break;
    case 1: var mes = "Febrero"; break;
    case 2: var mes = "Marzo"; break;
    case 3: var mes = "Abril"; break;
    case 4: var mes = "Mayo"; break;
    case 5: var mes = "Junio"; break;
    case 6: var mes = "Julio"; break;
    case 7: var mes = "Agosto"; break;
    case 8: var mes = "Septiembre"; break;
    case 9: var mes = "Octubre"; break;
    case 10: var mes = "Noviembre"; break;
    case 11: var mes = "Diciembre"; break;
  }

  let r = dia + " de " + mes + " de " + anio;
  return (r);
}



function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()

}