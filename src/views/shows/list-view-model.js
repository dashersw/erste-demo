var ShowsModel = require('../../shows-model');

class ListViewModel extends EventEmitter2 {
    constructor() {
        super();

        this.loadShows();
    }

    loadShows() {
        ShowsModel.fetch(shows => {
            shows = [...shows];
            shuffle(shows);
            this.shows = shows;
            this.emit(this.EventType.LOADED);
        });
    };



    getShowById(id) {
        return this.shows.find(show => show['_id'] == id)
    }


    loadMore() {
        ShowsModel.fetch(shows => {
            shows = [...shows].slice(10);
            shuffle(shows);

            this.emit(this.EventType.LOADED_MORE, {
                diff: shows,
                endOfFeed: true
            });
        });
    };

    get EventType() {
        return {
            LOADED: 'loaded',
            LOADED_MORE: 'loadedMore'
        };
    }
}


function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        // Choose a random array index in [0, i] (inclusive with i).
        var j = Math.floor(Math.random() * (i + 1));

        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

module.exports = ListViewModel;
