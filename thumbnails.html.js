//----------------- vista previa de las imagenes --------------------------------

document.getElementById("imaUpload").addEventListener("change", handleFiles, false);

function handleFiles(f) {

    flagImagen = 1;

    let previewDiv = document.getElementById("preview").innerHTML = "";
    const files = document.getElementById("imaUpload").files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) { continue }

        const img = document.createElement("img");
        img.classList.add("obj");
        img.classList.add("img-fluid");
        img.file = file;
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

    for (let i = 0; i < imgs.length; i++) {
        new FileUpload(imgs[i], imgs[i].file);

    }

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


        }).uploadFiles(obj);

    };
    reader.readAsArrayBuffer(file);
}