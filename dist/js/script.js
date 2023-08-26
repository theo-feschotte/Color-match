// Genrate random color
let hintColor = document.getElementsByClassName("color-match__color-wheel-hint")[0].childNodes[1];
let randomColor = Math.floor(Math.random() * 16777215).toString(16);
hintColor.style.stroke = "#" + randomColor;
$("#hexVal").val("#" + randomColor);

// Create canvas and context objects
var canvas = document.getElementById("picker");
var ctx = canvas.getContext("2d", {willReadFrequently: true});

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
    var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    $(".color-match__color-wheel-preview").css("backgroundColor", pixelColor);
    
    // Update text
    var dColor = (pixel[0] * 65536) + (pixel[1] * 256) + pixel[2];
    // $("#hexVal").val("#" + ("0000" + dColor.toString(16)).substr(-6));
});

// Timer
let countdown = 10;
const timer = setInterval(function() {
    if (countdown <= 0) {
        hintColor.classList.remove("start");
        clearInterval(timer);
    } else {
        hintColor.classList.add("start");
        countdown--;
    };
}, 1000);