const MODEL_URL = 'models/';

// Load the models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]).catch(error => console.error('Error loading models:', error));

// Accessing the webcam stream
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

    let audio = new Audio('./sounds/whispersTwo.mp3');
    let isPlaying = false;

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (resizedDetections.length === 0 && !isPlaying) {
            audio.loop = true;
            audio.play();
            isPlaying = true;
        } else if (resizedDetections.length > 0 && isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false;
        }
    }, 100);
}
