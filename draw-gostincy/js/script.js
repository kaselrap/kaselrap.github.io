// const NUMBER_OF_ROWS = 11;
// const NUMBER_OF_COLS = 14;
// const WIDTH = 324; // 2.5 cm
// const OFFSET_Y = 60;
// const OFFSET_X = 120;

const WIDTH = 648; // 5 cm
const OFFSET_Y = 120;
const OFFSET_X = 180;
const OFFSET = 120;

let canvas = document.getElementById("canvas")
let downloadBtn = document.getElementById('download-btn')
let outputInput = document.getElementById('output-input');
let filename = 'Фрукт';
let widthInput = document.getElementById('width');
let offsetInput = document.getElementById('offset');
let offsetXInput = document.getElementById('offset_x');
let offsetYInput = document.getElementById('offset_y');

let numberOfRows = getNumberOfRows();
let numberOfCols = getNumberOfCols();

console.log(numberOfRows, numberOfCols, canvas.height, widthInput.value, canvas.height / (parseInt(widthInput.value) + OFFSET), canvas.width / (parseInt(widthInput.value) + OFFSET));

let colorInput = document.getElementById('color-picker-input');

let image = new Image()
image.crossOrigin="anonymous";
image.src = 'images/qr.jpg'
image.onload = function () {
    drawBoard(canvas, image);
};

colorInput.addEventListener("input", function() {
    drawBoard(canvas, image);
})
widthInput.addEventListener("input", function() {

    numberOfRows = getNumberOfRows();
    numberOfCols = getNumberOfCols();

    drawBoard(canvas, image);
})

function drawBoard(can, image) {
    let ctx = can.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let offset = getOffset()
        offset_x = getOffsetX(),
        offset_y = getOffsetY(),
        width = getWidth();
    for (var i = 0; i < numberOfRows; ++i) {
        for (var j = 0; j < numberOfCols; ++j) {
            // ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)

            ctx.drawImage(image, offset_x + j * width, offset_y + i * width, width - offset, width - offset);
        }
    }

    ctx.fill();
}

downloadBtn.addEventListener('click', function () {
    downloadBtn.href = canvas.toDataURL('image/jpeg')
    downloadBtn.download = outputInput.value+".jpg"
})

const input = document.getElementById("input-file");
input.onchange = function (ev) {
    const file    = ev.target.files[0]; // get the file
    filename = file.name.split('.').slice(0, -1).join('.')
    outputInput.value = filename
    const blobURL = URL.createObjectURL(file);
    const img     = new Image();
    img.src       = blobURL;

    console.log(name);

    img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
    };

    img.onload = function () {
        URL.revokeObjectURL(this.src);
        drawBoard(canvas, img)
    };
};

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: [
        "<i class='fa fa-caret-left'></i>",
        "<i class='fa fa-caret-right'></i>"
    ],
    autoplay: false,
    autoplayHoverPause: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})

$('.owl-carousel .item img').on('click', function (e) {
    e.preventDefault();

    image = new Image()
    image.src = $(this).attr('src');
    image.onload = function(){
        drawBoard(canvas, image)
    }
});

function getWidth() {
    return parseInt(widthInput.value);
}

function getNumberOfRows() {
    return Math.floor((canvas.height - getOffsetY()) / (getWidth()));
}

function getNumberOfCols() {
    return Math.floor((canvas.width - getOffsetX()) / (getWidth()));
}

function getOffset() {
    return parseInt(offsetInput.value);
}

function getOffsetX() {
    return parseInt(offsetXInput.value);
}

function getOffsetY() {
    return parseInt(offsetYInput.value);
}