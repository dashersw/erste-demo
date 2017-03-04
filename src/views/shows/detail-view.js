class DetailView extends erste.View {
    constructor(show) {
        super();

        this.className = 'detail-view';
        this.show = show;
    }

    get supportsBackGesture() {
        return true;
    }

    onTap(e) {
        console.log(`tapping ${this.show.title}`);
    };


    template_content() {
        var imgFile = this.show['images']['fanart'].split('/').slice(-1);

        var show = this.show;

        return `
<detail-background
    style="background-image: url(static/img/poster/${imgFile})">
    <div class="info">
        <p>Title: ${show.title}</p>
        <p>Year: ${show.year}</p>
        <p># of seasons: ${show.num_seasons}</p>
    </div>
</detail-background>
`;
    }

    get events() {
        return {
            'tap': {
                '.detail-view': this.onTap
            }
        };
    };
}

module.exports = DetailView;
