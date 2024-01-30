var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var commandName = document.getElementById('command_name')
var score = document.getElementById('score')
var player1 = document.getElementById('player_1')
var player2 = document.getElementById('player_2')
var player3 = document.getElementById('player_3')
var player4 = document.getElementById('player_4')
var player5 = document.getElementById('player_5')
var player6 = document.getElementById('player_6')
var player7 = document.getElementById('player_7')
var downloadBtn = document.getElementById('download-btn')

var image = new Image()
image.crossOrigin="anonymous";
image.src = 'cert.jpg'
image.onload = function () {
	drawImage()
}

function drawImage() {
	// ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
	ctx.font = 'bold 32px BadScript'
	ctx.fillStyle = '#0e0000'
    ctx.fillText(commandName.value, 128, 416)
    ctx.fillText(score.value, 435.5, 465)
    ctx.fillText(player1.value, 77.5, 555)
    ctx.fillText(player2.value, 77.5, 632)
    ctx.fillText(player3.value, 77.5, 712)
    ctx.fillText(player4.value, 77.5, 781)
    ctx.fillText(player5.value, 77.5, 861)
    ctx.fillText(player6.value, 77.5, 936)
    ctx.fillText(player7.value, 77.5, 1003)
}

commandName.addEventListener('input', function () {
	drawImage()
})
score.addEventListener('input', function () {
    drawImage()
})
player1.addEventListener('input', function () {
    drawImage()
})
player2.addEventListener('input', function () {
    drawImage()
})
player3.addEventListener('input', function () {
    drawImage()
})
player4.addEventListener('input', function () {
    drawImage()
})
player5.addEventListener('input', function () {
    drawImage()
})
player6.addEventListener('input', function () {
    drawImage()
})
player7.addEventListener('input', function () {
    drawImage()
})

downloadBtn.addEventListener('click', function () {
	downloadBtn.href = canvas.toDataURL('image/jpg')
	downloadBtn.download = 'Certificate - ' + commandName.value
})

// function getCursorPosition(canvas, event) {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
// }
//
// canvas.addEventListener('mousedown', function(e) {
//     getCursorPosition(canvas, e)
// })
