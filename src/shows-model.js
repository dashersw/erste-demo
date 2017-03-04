var xhr = require('./lib/xhr');

class ShowsModel {
    constructor() {
        this.shows = [];
    }

    fetch(cb) {
        xhr('https://raw.githubusercontent.com/dashersw/erste.js-demo/master/src/static/data/shows.json', (err, data) => {
            this.shows = data.slice(0, 20);
            cb(this.shows);
        });
    };
}

module.exports = new ShowsModel();

