
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




function Escribir(id, nodo, direccion, zona, pisos, dptos, url, titulo, permiso, competencia) {


  let fechaActual = obtenerFecha();

  //------------------------------------------------------------

  //informe test
  let docActual = DriveApp.getFileById("1GxtZQJd-WdtK3jUPpUgXb4gBkfQsJn4hBwtO-g6ypA0");

  let docNuevo = docActual.makeCopy("copia");

  let idDocNuevo = docNuevo.getId();

  let doc = DocumentApp.openById(idDocNuevo);

  //reemplazar los datos \

  doc.getBody().replaceText("<<ID>>", id);
  doc.getBody().replaceText("<<NODO>>", nodo);
  doc.getBody().replaceText("<<DIRECCION>>", direccion);
  doc.getBody().replaceText("<<ZONA>>", zona);
  doc.getBody().replaceText("<<pisos>>", pisos);
  doc.getBody().replaceText("<<UF>>", dptos);
  doc.getBody().replaceText("<<FECHA>>", fechaActual);
  doc.getBody().replaceText("<<TITULO>>", titulo);
  doc.getBody().replaceText("<<permiso>>", permiso);
  doc.getBody().replaceText("<<competencia>>", competencia);

  doc.getBody().replaceText("<<contactos>>", `Administración: Cecilia       	Teléfono: 11 2723-4058          Mail: cygbroker@gmail.com\n
Administración: Cecilia       	Teléfono: 11 2723-4058          Mail: cygbroker@gmail.com`);

  console.log("ENTRO");


  //------------- imagenes ----------------------------------------------
  let imagen = DriveApp.getFileById("1J3robW_RbVrrJjVydo9iizzXerxmyzij");
  let imageninsertar = doc.getBody().appendImage(imagen.getBlob());

  let imageH = imageninsertar.setHeight(300);
  let imageW = imageninsertar.setWidth(300);


  let imagen2 = DriveApp.getFileById(url);
  let imageninsertar2 = doc.getBody().appendImage(imagen2.getBlob());

  let imageH2 = imageninsertar2.setHeight(500);
  let imageW2 = imageninsertar2.setWidth(500);



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
