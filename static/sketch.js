let facemesh;
let video;
let predictions = [];

let modelIsReady = false;

function preload(){
 //img = loadImage("eyepatch2.jpeg");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
  modelIsReady = true;
}

function draw() {
  image(video, 0, 0, width, height);
  if(modelIsReady){
    //drawKeypoints();
    printAnnotations();
  }

}

function printAnnotations(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))
    console.log(predictions[0].annotations.rightEyeLower0)
    const noseTip = predictions[0].annotations.noseTip[0];
    let x =  noseTip[0];
    let y =  predictions[0].annotations.noseTip[0][1];
    fill(255,192,203);
    ellipse(x,y,60,45);
    fill(0,0,0);
    ellipse(x-15,y,12,12);
    ellipse(x+15,y,12,12);

    const silhouette = predictions[0].annotations.noseTip[0];
    let silhouette_x =  silhouette[0];
    let silhouette_y =  predictions[0].annotations.silhouette[0][1];
    fill(255,192,203);
    textSize(30);
    text("OINK", silhouette_x - 15, silhouette_y - 110);
  }
}





function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}
