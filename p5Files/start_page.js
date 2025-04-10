class StartDisplay {
    constructor() {
        this.startText = "There's a climate crisis,\nbut what does it rhyme with?";
        this.x = width / 2;
        this.y = height / 2 - 70;
    }
    
    display() {
        background('red');
        textSize(60);
        text(this.startText, this.x, this.y);
        let x = this.x;
        let y = this.y + 100;
        textSize(12);
        text('[Click anywhere to generate a headline]', x, y);
    }
}
