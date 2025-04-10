class HeadlineDisplay {
    // Class for controlling headline generation, and it's subsequent display on the screen based on which
    // word is clicked
    constructor(dataset) {
        this.headlineGenerator = new HeadlineGenerator(dataset);
        this.headlineObjects = [];
        this.wordObjects = [];
        this.startX = 30;
        this.startY = 90;
        this.lineHeight = 65;
        this.displayPage = false;
        let headline = this.headlineGenerator.generateHeadline();
        this.setupHeadline(headline);
    }
    
    setupHeadline(headline) {
        this.headlineObjects = this.tokenize(headline);
        this.updateWordPositions(true);
    }
    
    tokenize(sentence) {
        // Custom tokenizer function - REGEX to include punctuation marks
        // within tokens for ease of display
        let tokens = sentence.match(/[\w’'-]+[.,!?;:]?|[.,!?;:]/g) || [];
        return tokens.map(token => [token]);
    }
    
    updateWordPositions(isInit = false) {
        // This function works out the position of each word within the headline
        let newWordObjects = [];
        let x = this.startX;
        let y = this.startY;
        let maxWidth = width;

        for (let i = 0; i < this.headlineObjects.length; i++) {
            let headlineObj = this.headlineObjects[i];
            let wordText = headlineObj[0];
            let isClicked = false;
            if (!isInit) {
                isClicked = this.wordObjects[i].clicked;
                if (isClicked){
                    // If word is clicked, keep shuffling through displaying the "soundsLike" words
                    wordText = headlineObj[floor(random(headlineObj.length))];
                }
            }
            let wordWidth = textWidth(wordText + " ");
            if (x + wordWidth > maxWidth) {
                // Start new line if wordWidth higher than max width
                x = this.startX;
                y += this.lineHeight;
            }
            newWordObjects.push(new Word(wordText, x, y, this.lineHeight, isClicked));
            x += wordWidth;
        }
        this.wordObjects = newWordObjects;
    }
    
    display() {
        for (let word of this.wordObjects) {
            word.display();
        }
        // Move headline down page
        this.startY += 1.5;
        // Once off page, generate new headline at top of page.
        if (this.startY > height){
            let headline = this.headlineGenerator.generateHeadline();
            this.setupHeadline(headline);
            this.startY = 0;
        }
    }
    
    handleClick(x, y) {
        for (let i = 0; i < this.wordObjects.length; i++) {
            let word = this.wordObjects[i];
            // Reset all words to clicked=false
            word.clicked = false;
            if (word.checkClick(x, y)) {
                word.clicked = true;
                // If word clicked, get all alike words and add to headline objects array
                this.soundsLike(word.text).then(likeWords => {
                    for (let newWord of likeWords) {
                        this.headlineObjects[i].push(newWord);
                    }
                });
            }
        }
    }

    async soundsLike(word) {
        let strippedWord = word.replace(/^[^\w]+|[^\w]+$/g, '');
        return await RiTa.soundsLike(strippedWord, { limit: 10 });
    }
}

