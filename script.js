Webcam.set({
    width: 290, 
    height: 290, 
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach(camera);

function takePicture() {
    Webcam.snap(function (clickedPictures) {
    document.getElementById("picture").innerHTML = "<img id='clickedPicture' src='"+clickedPictures+"'>";
    });
}

console.log("ml5version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gm_fUhuu6/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded successfully");
}

function identifyImage() {
    var image = document.getElementById("clickedPicture");
    classifier.classify(image, results);
}

function results(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(2)*100+"%";
    }
}