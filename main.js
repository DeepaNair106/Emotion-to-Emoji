
prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:300,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src ='+ data_uri +'></img>';

    });
}

console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YzXjpOuIv/model.json", modelLoaded);

function modelLoaded(){
    console.log('model loaded');
}

function check(){
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResult);
}

function speak() {
    var synth = window.speechSynthesis;
    speak_1 = "The first prediction is "+prediction_1;
    speak_2 = "The second prediction is " + prediction_2;
    var utter = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utter);
}

function gotResult(error,result){
    if(error){
        console.error(error);
    
    }
    else{
        console.log(result);

        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        document.getElementById("emotion_name_1").innerHTML = prediction_1;
        document.getElementById("emotion_name_2").innerHTML = prediction_2;

        speak();
        if (prediction_1 == "Happy"){
            document.getElementById("emoji_1").innerHTML = "&#128522;";
        }

        if(prediction_1 == "Sad"){
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        } 

        if (prediction_1 == "Angry"){
            document.getElementById("emoji_1").innerHTML = "&#128545;";
        } 

        if (prediction_2 == "Happy"){
            document.getElementById("emoji_2").innerHTML = "&#128522;";
        }
        if (prediction_2 == "Sad"){
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }

        if (prediction_2 == "Angry"){
            document.getElementById("emoji_2").innerHTML = "&#128545;";
        }
    }
}
