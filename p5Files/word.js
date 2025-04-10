class Word {
    constructor(text, x, y, h, clicked = false) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = textWidth(text + " ");
        this.h = h;
        this.clicked = clicked;
    }
    
    display() {
        let startY = this.y;
        // Display repeated words as background with gradient for readability
        for (let i = 0; i < 20; i++) {
            let alpha = 5 * i;
            if (i === 0){
                alpha = 255;
            }
            fill(0, alpha);
            if (this.clicked){
                fill('red');
            }
            text(this.text, this.x, startY);
            startY += this.h;
        }
    }
    
    checkClick(x, y) {
        let top = this.y - 25;  // Top boundary of text
        let bottom = this.y + 15; // Bottom boundary of text
        return (x >= this.x && x <= this.x + this.w && y >= top && y <= bottom);
    }
}
