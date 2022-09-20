

function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
    .setTitle("Generador de informes")
    .setFaviconUrl("https://freepngimg.com/download/telephone/13-2-telephone-free-download-png.png");
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
  let folder = DriveApp.getFolderById("1E2uXbB_HdbWiqcbd-V7Vl5e570SF8K9A");
  let createFile = folder.createFile(file);
  return createFile.getId();

}



function Escribir(id, nodo, direccion, zona, pisos, dptos, url, tituloarmado, contacto, permiso, competencia, local, propuestas, ObsPropuesta) {




  let fechaActual = obtenerFecha();
  let loc = "";
  let locCant = 0;
  let titulo;
  let solucionPorpuesta = "";

  //------------ crea una copia de informe test y reemplaza los campos ------------------
  let docActual = DriveApp.getFileById("1GxtZQJd-WdtK3jUPpUgXb4gBkfQsJn4hBwtO-g6ypA0");
  let docNuevo = docActual.makeCopy("copia");
  let idDocNuevo = docNuevo.getId();
  let doc = DocumentApp.openById(idDocNuevo);

  if (local > 0) {
    loc = "SI";
    locCant = local;
  }
  else {
    loc = "NO";
    locCant = 0;
  }


  switch (tituloarmado) {
    case "1": titulo = "INFORME DE PROPUESTA PARA ARMADO DE EDIFICIO"; break;
    case "2": titulo = "INFORME DE PREFACTIBILIDAD PARA ARMADO DE EDIFICIO"; break;
    case "3": titulo = "INFORME DE INCUMPLIMIENTO DE EDIFICIO"; break;
    case "4": titulo = "INFORME DE PREFACTIBILIDAD PARA RECONVERSION DE EDIFICIO"; break;
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
  doc.getBody().replaceText("<<permiso>>", permiso);
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



  if (url != "0") {

    let imagenn = DriveApp.getFileById(url);
    let imageninsertar2 = doc.getBody().appendImage(imagenn.getBlob()).setHeight(500).setWidth(500);

  }


  doc.getBody().insertParagraph(30, "TEXTO INSERTADO EN LA POSICION 30");
  //doc.getBody().insertTable(20, tabla);
  //doc.getBody().insertTable(30).appendTable().appendTableRow().appendTableCell().appendImage(imagen7.getBlob()).setHeight(280).setWidth(280);
  //doc.getBody().insertTable(30, [['Test Text']]);


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

  let r = dia + "/" + mes + "/" + anio;
  return (r);
}



function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()

}

