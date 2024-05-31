# whispering-echoes
Do you ever get the feeling that people are talking and whispering about you or that they're laughing at you behind your back? Despite being sure that someone's talking about you, as soon as you turn your back, you'd see that nobody is doing any of those things.

For this installation, you walk in a dark room and the only thing present is a screen and yourself. You stare at the screen hoping for something to happen, but there's nothing. I wonde what would happen if you were to turn your back...

This was coded using HTML, CSS, Javascript and a face detection API, which was all made in a Vite project. The visual was made in Adobe Photoshop & After Effects.
**By Yann Leyers**

## Equipment
- A screen (of any size)
- (In built) speakers
- A webcam

## Set up
### Step 1: Preperations
Before we worry about how to set the project up, it's important to have the necessities ready. As previously stated, you'll need a screen to project the installation on, but something tells me you most likely already have one. Make sure that your device or screen has speakers that can play sound, because the audio plays an important role in this installation. 

Most laptops should have an in-built camera but if yours don't or if you are testing this out on a monitor, you'll need a webcam that you can plug into your device/screen.

The last thing you'll need is a folder of the project, which can be downloaded here. Click on the green button, that you can find at the top of the page, and click "Download ZIP". You can then unzip the folder.

### Step 2: Running Vite
Now that we have everything we can finally start setting up the project.
Boot up VSC (Visual Studio Code) and open the folder you just downloaded and unzipped.
The only thing left to do is start up the project in the terminal.

At the top of the software there's a menu bar. Look for "View" and then "Terminal". Write "npm start" and it should automatically open up your default browser with the project open and ready for testing. If your browser didn't open, there should be a clickable link in the terminal that'll open up the browser for you.
```
npm start
```

## Code Explanation
### Face API
The "face-api.js" library is the most important part of the code.
```
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]).catch(error => console.error('Error loading models:', error));
```
The first URL loads the Tiny Face Detector model. It's a fast, lightweight model for detecting faces in images.

The second URL loads the Face Landmark 68 model. This model detects 68 facial landmarks on detected faces, such as the positions of the eyes, nose, mouth, and the outline of the face. This model is one of the most important ones and the only one I really need. It plays a bigger role in other parts of the code, which I will dive into later on. 

The third URL loads the the Face Recognition model, which is used to recognize and match faces.

The fourth URL loads the Face Expression model, which is used to detect facial expressions like happiness, sadness, anger, etc.

In summary, this code is responsible for concurrently loading four different face detection and recognition models from a URL using the face-api.js library, and it handles any potential errors that may occur during the loading process by logging them to the console.
