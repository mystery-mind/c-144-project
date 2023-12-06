peter_pan_song="";
harry_potter_theme_song="";
leftWrist_x="0";
leftWrist_y="0";
rightWrist_x="0";
rightWrist_y="0";
scoreleftWrist="0";
song_peter_pan=""; 
scorerightWrist="0";
song_harry_potter_theme="";

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0 , 0 ,380, 380);
    
    fill("#37ff00");
    stroke("#ff0000"); 

    song_peter_pan = peter_pan_song.isPlaying();
    console.log("Peter Pan Song = "+song_peter_pan);

    song_harry_potter_theme = harry_potter_theme_song.isPlaying();
    console.log("Harry Potter Theme Song = "+song_harry_potter_theme);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        harry_potter_theme_song.stop();
        if(song_peter_pan == false){
            peter_pan_song.play();
        }
        else{
            document.getElementById("name").innerHTML="Song Name - Peter Pan Song"
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        peter_pan_song.stop();
        if(song_harry_potter_theme == false){
            harry_potter_theme_song.play();
        }
        else{
            document.getElementById("name").innerHTML="Song Name - Harry Potter Theme Song"
        }
    }

}
function preload(){
    peter_pan_song=loadSound("music2.mp3");
    harry_potter_theme_song=loadSound("music1.mp3");
} 
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist_Score = "+ scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("rightWrist_Score = "+ scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+ leftWrist_x +"leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+"rightWrist_y = "+rightWrist_y);
    }
}