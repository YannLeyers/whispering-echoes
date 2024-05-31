# whispering-echoes
Do you ever get the feeling that people are talking and whispering about you, or that they're laughing at you behind your back? Despite being sure that someone's talking about you, as soon as you turn your back, you'd see that nobody is doing any of those things.

For this installation, you walk in a dark room and the only thing present is a screen and yourself. You stare at the screen hoping for something to happen, but there's nothing. I wonde what would happen if you were to turn your back...

This was coded using HTML, CSS, Javascript and a face detection API, which was all made in a Vite project. The visual was made in Adobe Photoshop & After Effects.
**By Yann Leyers**

## Equipment
- A screen / monitor
- (In built) speakers
- (An in-built) webcam

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
The "face-api.js" library is the most important part of the code. This piece of code utilises a method to load multiple models from the library
```ruby
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

### Video feed
This next piece of code uses an API to gain access to the webcam and stream the video feed to a video element in the html file.
```ruby
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
            console.log('VIDEO STREAM SIZE :', video.videoWidth, video.videoHeight);
        };
        video.onplay = function () {
            initializeFaceApi(video);
        };
    })
    .catch(function (err) {
        console.log('Error accessing the webcam stream:', err);
    });
```
First It's important to gain permission to access the webcam, which is what this piece of code is for `navigator.mediaDevices.getUserMedia({ video: true }):`. If granted, the method returns a promise that resolves to a media stream object containing the video stream

This retrieves the video element from the HTML document by its ID (video). `var video = document.getElementById('video');`

This starts playing the video stream in the video element. `video.play();`

The piece of code that brings my installation together is this: `initializeFaceApi(video);`. This function initializes the face-api.js library to start processing the video stream for a face detection. This means that if the video feed and the API library detect a face, it'll show up on the screen, as shown below. With this I can begin working on the last part.

*adding image later*

In summary, this code attempts to access the user's webcam, stream the video feed to an HTML video element, and initialize face-api.js for further processing once the video starts playing. If there is an error in accessing the webcam, it logs the error to the console.

### Audio
Since this is a pretty long piece of code, I will only be mentioning things that are essential to the installation.
```ruby
function initializeFaceApi(video) {
    console.log('Video dimensions:', video.videoWidth, video.videoHeight);
    if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error('Video dimensions are ZEROs.');
        return; // Stop initialization if dimensions are not correct
    }

    const canvas = faceapi.createCanvasFromMedia(video);
    const container = document.getElementById('basicvideo');
    container.appendChild(canvas); // otherwise no overlay but side by side. done with css
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    let soundPlaying = false;
    let audio = new Audio('./sounds/whispersTwo.mp3');

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (resizedDetections.length === 0) {
            if (!soundPlaying) {
                audio.loop = true;
                audio.play();
                soundPlaying = true;
            }
        } else {
            if (soundPlaying) {
                audio.pause();
                audio.currentTime = 0;
                soundPlaying = false;
            }
        }
    }, 100);
}
```

This initializes a flag soundPlaying to keep track of whether the audio is playing and creates an Audio object for a sound file.
```
let soundPlaying = false;
let audio = new Audio('./sounds/whispersTwo.mp3');
```

This part sets up an interval. It does a few things, which includes:
- Detecting faces, landmarks and expressions in the video
- Resizing the detection results to match the display size
- Clearing the canvas and draw the detection results, landmarks, and expressions on the canvas.

```
setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
```

Inside this interval, If no faces are detected `(resizedDetections.length === 0)`, it starts playing the audio in a loop if it is not already playing. But if faces are detected, it pauses the audio and resets its playback position if it is currently playing.
```
    if (resizedDetections.length === 0) {
        if (!soundPlaying) {
            audio.loop = true;
            audio.play();
            soundPlaying = true;
        }
    } else {
        if (soundPlaying) {
            audio.pause();
            audio.currentTime = 0;
            soundPlaying = false;
        }
    }
}, 100);
```

`}, 100);` The number, 100, means that the interval is running every 100 milliseconds

In summary, this code initializes the face-api.js library for the video element to detect faces, landmarks, and expressions, and dynamically draws these detections on an overlaid canvas. Additionally, it plays a sound when no faces are detected and stops the sound when faces are detected.
