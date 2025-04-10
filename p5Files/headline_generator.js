class HeadlineGenerator {
    constructor(dataset) {
        this.rm_headline = RiTa.markov(3);
        for (let headline of dataset) {
            if (headline) this.rm_headline.addText(headline);
        }
    }

    generateHeadline() {
        let headline = this.rm_headline.generate();
        return headline.replace(/\.$/, ''); // Remove trailing full stop
    }
}
