let headlineDisplay;
let displayStart = true;
let lastUpdate = 0;
let updateInterval = 100;


function preload() {
    headline_dataset = loadStrings('scraper/combined/headlines.txt');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Times New Roman');
    startDisplay = new StartDisplay();
    headlineDisplay = new HeadlineDisplay(headline_dataset);
}

function draw() {
    if (displayStart) {
        textAlign(CENTER, CENTER);
        startDisplay.display();
    } else {
        background(244, 244, 226);
        textSize(12);
        textAlign(LEFT);
        fill(0);
        text('[click on a word]', 30, 20);
        textSize(60);
        headlineDisplay.display();
        // Use seconds to control update timing rather than frame rate
        if (millis() - lastUpdate > updateInterval) {
            headlineDisplay.updateWordPositions();
            lastUpdate = millis();  // Reset timer
        }
    }
}

function mousePressed() {
    displayStart = false;
    headlineDisplay.handleClick(mouseX, mouseY);
}
