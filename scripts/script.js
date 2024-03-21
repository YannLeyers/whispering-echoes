const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', function(event) {
        isDrawing = true;
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
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