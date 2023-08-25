$(function() {
    
    // Create canvas and context objects
    var canvas = document.getElementById("picker");
    var ctx = canvas.getContext("2d");
    
    // Drawing active image
    var image = new Image();
    image.onload = function() {
        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, image.width, image.height);
    };
    image.src = "../dist/images/colorwheel.png";
    
    $("#picker").mousemove(function(e) {
        // Get coordinates of current position
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
        
        // Get current pixel
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        
        // Update preview color
        var pixelColor = "rgb("+pixel[0]+", " + pixel[1] + ", " + pixel[2] + ")";
        $("body").css("backgroundColor", pixelColor);
        
        // Update controls
        $("#rVal").val(pixel[0]);
        $("#gVal").val(pixel[1]);
        $("#bVal").val(pixel[2]);
        $("#rgbVal").val(pixel[0] + ',' + pixel[1] + ',' + pixel[2]);
        
        var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
        $("#hexVal").val("#" + ("0000" + dColor.toString(16)).substr(-6));
    });
});