const COMMAND_NAME_FIELD_START_POSITION = 128.5;
const COMMAND_NAME_FIELD_WIDTH = 640;

const SCORE_FIELD_START_POSITION = 402.5;
const SCORE_FIELD_WIDTH = 118;

const PLAYER_FIELD_START_POSITION = 77.5;
const PLAYER_FIELD_WIDTH = 487;
const LETTER_AVERAGE_WIDTH = 7.5;

class Canvas {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    drawImage(image, diploma) {
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.font = 'bold 32px BadScript'
        this.ctx.fillStyle = '#0e0000'
        this.ctx.fillText(diploma.commandName.value, diploma.getCommandNameStartPositionInTheField(this.ctx.measureText(diploma.commandName.value)), Diploma.getCommandNameXYPosition.y)
        this.ctx.fillText(diploma.score.value, diploma.getScoreStartPositionInTheField(this.ctx.measureText(diploma.score.value)), Diploma.getScoreXYPosition.y)

        diploma.players.forEach((player, number) => {
            this.ctx.fillText(player.value, diploma.getPlayerStartPositionInTheField(this.ctx.measureText(player.value)), Diploma.getPlayerYMap[number])
        });
    }
}

class Diploma {
    constructor(commandName, score, players) {
        this.commandName = commandName
        this.score = score
        this.players = players
    }

    applyResults(results) {
        this.commandName.value = results.command_name;
        this.score.value = results.score;
        this.players.forEach((player, index) => {
            player.value = results.players[index]
        })
    }

    static get getCommandNameXYPosition() {
        return {
            x: 128,
            y: 416
        }
    }

    static get getScoreXYPosition() {
        return {
            x: 435.5,
            y: 465
        }
    }

    static get getPlayerYMap() {
        return [555, 632, 712, 781, 861, 936, 1003];
    }

    getScoreStartPositionInTheField(metrics) {
        return SCORE_FIELD_START_POSITION + (SCORE_FIELD_WIDTH - metrics.width) / 2
    }

    getCommandNameStartPositionInTheField(metrics) {
        return COMMAND_NAME_FIELD_START_POSITION + (COMMAND_NAME_FIELD_WIDTH - metrics.width) / 2
    }

    getPlayerStartPositionInTheField(metrics) {
        return PLAYER_FIELD_START_POSITION + (PLAYER_FIELD_WIDTH - metrics.width) / 2
    }

    listenForChange(fn) {
        [this.commandName, this.score, ...this.players].forEach(
                (item) => {
                    item.addEventListener('input', function () {
                        fn()
                    })
                }
        )
    }
}

(async function() {
    let downloadBtn = document.getElementById('download-btn')
    let canvas = new Canvas(document.getElementById('canvas'))
    let diploma = new Diploma(
            document.getElementById('command_name'),
            document.getElementById('score'),
            document.querySelectorAll('.player')
    )
    diploma.applyResults(await getResults())

    let image = new Image()
    image.crossOrigin="anonymous";
    image.src = 'cert.jpg'
    image.onload = function () {
        canvas.drawImage(image, diploma)
    }
    diploma.listenForChange(() => canvas.drawImage(image, diploma))


    downloadBtn.addEventListener('click', function () {
        downloadBtn.href = this.canvas.canvas.toDataURL('image/jpg')
        downloadBtn.download = 'Certificate - ' + diploma.commandName.value
    })

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
    }

    canvas.canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas.canvas, e)
    })

    async function getResults() {
        const response = await fetch('./result.json');
        const results = await response.json();
        results.players = results.players.slice(0, 7)
        return results;
    }
})()
