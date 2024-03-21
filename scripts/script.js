const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const instructionText = document.getElementById('instructionText');

    let isDrawing = false;
    let strokeColor = '#000000'; // Default color
    let lineSize = 1; // Default line size
    
    // Color picker event listener
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('input', function() {
        strokeColor = this.value;
    });

    // Line size event listener
    const lineSizeInput = document.getElementById('lineSizeInput');
    lineSizeInput.addEventListener('input', function() {
        lineSize = parseInt(this.value);
    });

    // Reset button event listener
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        instructionText.style.display = 'block'; // Display instruction text
    });
    
    canvas.addEventListener('mousedown', function(event) {
        isDrawing = true;
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineSize;
        instructionText.style.display = 'none'; // Hide instruction text
    });
    
    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    });
    
    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });
    
    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
    });
    
    canvas.addEventListener('touchstart', function(event) {
        event.preventDefault();
        isDrawing = true;
        const touch = event.touches[0];
        const mouseX = touch.clientX - canvas.getBoundingClientRect().left;
        const mouseY = touch.clientY - canvas.getBoundingClientRect().top;
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineSize;
        instructionText.style.display = 'none'; // Hide instruction text
    });
    
    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (isDrawing) {
            const touch = event.touches[0];
            const mouseX = touch.clientX - canvas.getBoundingClientRect().left;
            const mouseY = touch.clientY - canvas.getBoundingClientRect().top;
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    });
    
    canvas.addEventListener('touchend', function(event) {
        event.preventDefault();
        isDrawing = false;
    });
    
    canvas.addEventListener('touchcancel', function(event) {
        event.preventDefault();
        isDrawing = false;
    });