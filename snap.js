let video;
let pg;
let lastSnapShot;

let timer = 0;
let showLatestPhoto = false;

let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/l1oAVmgrz/';
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}
function setup() {
  createCanvas(640, 480);

  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();


  pg = createGraphics(width, height);
  pg.textSize(32);
  pg.textAlign(CENTER);

  boutonAnalyze = createButton("analizer l'image");
  boutonAnalyze.position(10,560);
  boutonAnalyze.mousePressed(analyzeImage);

//boutonStats = createButton("voir statistiques");
//boutonStats.position(10, 590);
//boutonStats.mousePressed(voirStats);


}

function draw() {
  background(122);
  image(video, 0, 0);

  //Show the last image taken for a short period
  if (showLatestPhoto) {
    image(pg, 0, 0);
    tint(254, 250, 202); //Optional tint
  } else {
    tint(255);
  }
  fill(255, 255, 0);
  rect(0, height- 20, width, height);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);



}


function mousePressed() {
  if(mouseX > 0 && mouseX < 640 && mouseY > 0 && mouseY < 480){
if (showLatestPhoto){
  showLatestPhoto = false;
}
else{
takePicture();
}
}
}
function takePicture() {
  //save('myCanvas.jpg');

  pg.image(video, 0, 0);


  timer = 0;
  showLatestPhoto = true;
}

function analyzeImage(){
  classifier.classify(pg, gotResult);
}

function gotResult(error,results){
if (error){
  console.error(error);
  label = "non classifié";
}

label = results[0].label;
}

/*
function voirStats(){
  results = loadStrings('stats.txt');
nbDentree = 0;
nbSucces = 0;
print
for(let i = 0; i < results.length i++){
  nbSucces += results[i];
  nbDentree += 1;
}
print(nbDentree);
print(nbSucces);
print(results.length);


}*/
