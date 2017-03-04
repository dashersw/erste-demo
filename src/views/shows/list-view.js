var ListViewModel = require('./list-view-model');
var ListItem = require('./list-item');
var DetailView = require('./detail-view');
var __ = erste.locale.__;

class ListView extends erste.View {
    constructor() {
        super();

        this.className = 'list-view';

        this.model = new ListViewModel();
        this.pullToRefresh = new erste.PullToRefresh();
        this.infiniteScroll = new erste.InfiniteScroll();
        this.infiniteScroll.endOfListText = __('End of List');

        this.bindModelEvents();
    }

    bindModelEvents() {
        this.model.on(this.model.EventType.LOADED, this.onLoaded.bind(this));
        this.model.on(this.model.EventType.LOADED_MORE, this.onLoadedMore.bind(this));

        this.pullToRefresh.on(this.pullToRefresh.EventType.SHOULD_REFRESH,
            this.onShouldRefresh.bind(this));

        this.infiniteScroll.on(this.infiniteScroll.EventType.SHOULD_LOAD,
            this.onInfiniteScroll.bind(this));
    };

    onAfterRender() {
        this.onLoaded();

        this.pullToRefresh.register(this.$('list-items-container'), this.$('list-items'));

        this.infiniteScroll.register(this.$('list-items-container'));
    };

    onInfiniteScroll() {
        setTimeout(() => {
            this.model.loadMore();
        }, 2000);
    };

    onShouldRefresh() {
        setTimeout(() => {
            this.model.loadShows();
        }, 2000);
    };

    onLoaded() {
        if (!this.rendered || !this.model.shows) return;

        this.pullToRefresh.reset();

        this.showComponents = this.model.shows.map(show => new ListItem(show));

        var markup = this.showComponents.map(cmp => cmp.template()).join('');

        this.$('list-items').innerHTML = markup;
        this.infiniteScroll.showSpinner();
    };

    onLoadedMore(e) {
        var listEl_ = this.$('list-items');

        if (!e.diff) return;

        e.diff
            .map(show => new ListItem(show))
            .forEach(c => listEl_.appendChild(c.el));

        if (e.endOfFeed)
            this.infiniteScroll.showEndOfList();
        else
            this.infiniteScroll.showSpinner();
    };

    dispose() {
        this.pullToRefresh.dispose();
        this.infiniteScroll.dispose();

        this.pullToRefresh.offAny();
        this.infiniteScroll.offAny();

        super.dispose();
    };

    onListItemTap(e) {
        var show = this.model.getShowById(e.targetEl.getAttribute('data-show-id'));
        this.vm.pull(new DetailView(show), true);
    };

    get events() {
        return {
            'tap': {
                'list-item': this.onListItemTap
            }
        }
    }

    template_content() {
        return `
${this.pullToRefresh}
<list-items-container><list-items></list-items>
${this.infiniteScroll}</list-items-container>
`;
    }
}

module.exports = ListView;
