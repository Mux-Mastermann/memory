// defining constants
const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg"]
const boardSize = [3, 4]
const cards = document.querySelectorAll(".card");


// define global variables
var firstCard, secondCard, wait, flipped
var preloadedImages = []

// start new game on page loading
newGame()

function newGame() {
    // initialize variables
    wait = false
    flipped = false
    preloadedImages.length = 0;
    // unflip all images
    unflipAllImages();
    // shuffle the board
    shuffleBoard();
    // add event listeners to cards and make all visible
    cards.forEach(card => {
        card.style.visibility = 'visible'
        card.addEventListener("click", turn)
    })
}

function shuffleBoard() {
    // how many images are needed for board
    imageNo = (boardSize[0] * boardSize[1]) / 2
    // shuffle images array for random slice
    const shuffled = images.sort(() => 0.5 - Math.random());
    // slice imageNo images from images 
    imageSet = shuffled.slice(0, imageNo);
    // preload images
    preloadImages(imageSet);
    // store used images from imageSet here
    let usedImages = new Array();
    // set start value for card id
    card_id = 1;
    // give each card a name of a image (each image name exists twice)
    cards.forEach(function (card) {
        // get random index number for imageSet array
        var index = Math.floor(Math.random() * imageSet.length)
        // store image on that index in img
        let img = imageSet[index]
        // set name of card to the image name
        card.setAttribute("name", img)
        // set card id
        card.setAttribute("id", card_id)
        // check if image was already used once and delete from imageSet if so
        if (usedImages.includes(img)) {
            imageSet.splice(index, 1);
        }
        // push image to used Images array
        usedImages.push(img)
        // increase card id
        card_id++;
    })
}


function turn() {
    // if wait set, do nothing
    if (wait) {
        return
    }
    // first card flip
    if (!flipped) {
        flipped = true
        firstCard = this
        flipImage(this)
        // second card flip
    } else {
        // check if first card was clicked again
        if (this.id == firstCard.id) {
            return
        }
        // set wait to true, to block user from input, as long as it checks for match
        wait = true
        flipped = false
        secondCard = this
        flipImage(this)
        setTimeout(checkForMatch, 1500)
    }
}


function flipImage(card) {
    var name = card.getAttribute("name")
    var url = "assets/img/" + name;
    card.style.backgroundImage = 'url(' + url + ')'
}


function unflipAllImages() {
    cards.forEach(card => {
        card.style.backgroundImage = 'url("assets/img/back.jpg")'
    });
}


function preloadImages(images) {
    images.forEach(image => {
        img = new Image();
        img.src = "assets/img/" + image;
        preloadedImages.push(img)
    });
    console.log("All images preloaded")
    console.log(preloadedImages)
}


function checkForMatch() {
    if (firstCard.getAttribute("name") == secondCard.getAttribute("name")) {
        firstCard.style.visibility = 'hidden'
        firstCard.removeEventListener("click", turn)
        secondCard.style.visibility = 'hidden'
        secondCard.removeEventListener("click", turn)
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
        $('#successModal').modal();
    }
}
