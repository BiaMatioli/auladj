musica = "";

pulsoEsqX = 0;
pulsoEsqY = 0;

pulsoDirX = 0;
pulsoDirY = 0;

placarPulsoEsq = 0;
placarPulsoDir = 0;

function preload() {
    musica = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, modelLoaded);
    pose.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    stroke("#ffff00");
    fill("#ffff00");

    if(placarPulsoEsq > 0.2){
        circle(pulsoEsqX, pulsoEsqY, 25);
    
        esquerdo = Number(pulsoEsqY);
        pulsoEsq = floor(esquerdo);
        volume = pulsoEsq / 500;
    
        document.getElementById("vol").innerHTML = "Volume da música: " + volume;
    
        musica.setVolume(volume);
    }

    if(placarPulsoDir > 0.2){
        circle(pulsoDirX, pulsoDirY, 25);

        if(pulsoDirY > 0 && pulsoDirY <= 100){
            document.getElementById("vel").innerHTML = "Velocidade da música: 0.5x";

            musica.rate(0.5);
        }
        else if(pulsoDirY > 100 && pulsoDirY <= 200){
            document.getElementById("vel").innerHTML = "Velocidade da música: 1x";

            musica.rate(1);
        }
        else if(pulsoDirY > 200 && pulsoDirY <= 300){
            document.getElementById("vel").innerHTML = "Velocidade da música: 1.5x";

            musica.rate(1.5);
        }
        else if(pulsoDirY > 300 && pulsoDirY <= 400){
            document.getElementById("vel").innerHTML = "Velocidade da música: 2x";

            musica.rate(2);
        }
        else if(pulsoDirY > 400){
            document.getElementById("vel").innerHTML = "Velocidade da música: 2.5x";

            musica.rate(2.5);
        }
    }
}

function tocar() {
    musica.play();

    musica.setVolume(0.5);
    musica.rate(1);
}

function modelLoaded() {
    console.log("O modelo foi carregado");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        pulsoDirX = results[0].pose.rightWrist.x;
        pulsoDirY = results[0].pose.rightWrist.y;
        placarPulsoDir = results[0].pose.keypoints[10].score;

        pulsoEsqX = results[0].pose.leftWrist.x;
        pulsoEsqY = results[0].pose.leftWrist.y;
        placarPulsoEsq = results[0].pose.keypoints[9].score;

        console.log(pulsoDirX, pulsoDirY, pulsoEsqX, pulsoEsqY);
    }
}
