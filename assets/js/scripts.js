const cards = document.querySelectorAll(".image");

let firstCard, secondCard, wait, flipped

newGame()

function newGame() {
    var order = [1, 2, 3, 4, 1, 2, 3, 4]
    wait = false
    flipped = false
    unflipAllImages();
    randomNameImages(order);
    cards.forEach(card => {
        card.style.visibility = 'visible'
        card.addEventListener("click", anotherRound)
    })
}

function randomNameImages(order) {
    cards.forEach(function (card) {
        var index = Math.floor(Math.random() * order.length)
        card.setAttribute("name", order[index])
        order.splice(index, 1)
    })
}

function unflipAllImages() {
    cards.forEach(card => {
        card.style.backgroundImage = 'url("back.jpg")'
    });
}

function anotherRound() {
    if (wait) {
        return
    }
    if (!flipped) {
        flipped = true
        firstCard = this
        flipImage(this)
    } else {
        console.log(this.id, firstCard.id)
        if (this.id == firstCard.id) {
            return
        }
        wait = true
        flipped = false
        secondCard = this
        flipImage(this)
        setTimeout(checkForMatch, 1500)
    }
}

function checkForMatch() {
    if (firstCard.getAttribute("name") == secondCard.getAttribute("name")) {
        firstCard.style.visibility = 'hidden'
        firstCard.removeEventListener("click", anotherRound)
        secondCard.style.visibility = 'hidden'
        secondCard.removeEventListener("click", anotherRound)
        checkForEnd()
    } else {
        unflipAllImages()
    }
    wait = false
}

function checkForEnd() {
    let gameOver = true
    cards.forEach(card => {
        if (card.style.visibility == 'visible') {
            gameOver = false
        }
    })
    if (gameOver) {
        console.log("Winner! Game Over!")
        alert("Du hast gewonnen :)")
    }
}

function flipImage(card) {
    var name = card.getAttribute("name")
    var url = name + ".jpg"
    card.style.backgroundImage = 'url(' + url + ')'
}

cards.forEach(card => card.addEventListener("click", anotherRound))