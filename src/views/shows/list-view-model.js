import ShowsModel from '../../shows-model';
import EventEmitter from 'events';

export default class ListViewModel extends EventEmitter {
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
        var j = Math.floor(Math.random() * (i + 1));

        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}
