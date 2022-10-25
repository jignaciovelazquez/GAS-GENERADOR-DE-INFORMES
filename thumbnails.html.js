//----------------- vista previa de las imagenes --------------------------------

//----------------------------------- imagen 1 -----------------------------------

document.getElementById("imaUpload").addEventListener("change", handleFiles, false);



function handleFiles(f) {

    flagImagen = 1;
    document.getElementById("GENERAR").disabled = true;
    let previewDiv = document.getElementById("preview").innerHTML = "";
    const files = document.getElementById("imaUpload").files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) { continue }

        const img = document.createElement("img");
        img.classList.add("obj");
        img.classList.add("img-fluid");
        img.file = file;
        img.style.height = "400px";
        img.style.width = "400px";

        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

        const reader = new FileReader();
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }

    uploadFile();

}

function uploadFile() {

    const selectedFile = document.getElementById("imaUpload").files[0];

    const imgs = document.querySelectorAll(".obj");


    new FileUpload(imgs[0], imgs[0].file);


}

function FileUpload(img, file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        //console.log(event.target.result);
        const obj = {
            filename: file.name,
            mimeType: file.type,
            bytes: [... new Int8Array(event.target.result)]
        }

        google.script.run.withSuccessHandler((e) => {

            let imagenID = e;
            IDPARAMONTAR = imagenID;
            console.log(IDPARAMONTAR);
            document.getElementById("GENERAR").disabled = false;

        }).uploadFiles(obj);

    };
    reader.readAsArrayBuffer(file);

}

//----------------------------------- imagen 2 -----------------------------------

document.getElementById("imaUpload2").addEventListener("change", handleFiles2, false);



function handleFiles2(f) {

    flagImagen2 = 1;
    document.getElementById("GENERAR").disabled = true;
    let previewDiv2 = document.getElementById("preview2").innerHTML = "";
    const files2 = document.getElementById("imaUpload2").files;

    for (let i = 0; i < files2.length; i++) {
        const file2 = files2[i];

        if (!file2.type.startsWith('image/')) { continue }

        const img2 = document.createElement("img");
        img2.classList.add("obj2");
        img2.classList.add("img-fluid");
        img2.file = file2;
        img2.style.height = "400px";
        img2.style.width = "400px";

        preview2.appendChild(img2); // Assuming that "preview" is the div output where the content will be displayed.

        const reader = new FileReader();
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img2);
        reader.readAsDataURL(file2);
    }

    uploadFile2();

}

function uploadFile2() {

    const selectedFile = document.getElementById("imaUpload2").files[0];

    const imgs2 = document.querySelectorAll(".obj2");

    new FileUpload2(imgs2[0], imgs2[0].file);


}

function FileUpload2(img, file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        //console.log(event.target.result);
        const obj = {
            filename: file.name,
            mimeType: file.type,
            bytes: [... new Int8Array(event.target.result)]
        }

        google.script.run.withSuccessHandler((e) => {

            let imagenID = e;
            IDPARAMONTAR2 = imagenID;
            console.log(IDPARAMONTAR2);
            document.getElementById("GENERAR").disabled = false;

        }).uploadFiles2(obj);

    };
    reader.readAsArrayBuffer(file);

}