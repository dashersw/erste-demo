var __ = erste.locale.__;

class AboutView extends erste.View {
    constructor() {
        super();

        this.className = 'about-view';
    }

    onActivation() {
        if (cfg.PLATFORM == 'device')
            StatusBar.styleDefault();
    }

    template_content() {
        return `
<h1>${__('Top TV Show Posters')}</h1>
<p>${__('An erste.js mobile app demo')}</p>
`;
    }
}

module.exports = AboutView;
