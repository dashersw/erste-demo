var __ = require('erste').locale.__;
var erste = require('erste');

class AboutView extends erste.View {
    onActivation() {
        if (cfg.PLATFORM == 'device')
            StatusBar.styleDefault();
    }

    template() {
        return `
<view class="about-view">
    <h1>${__('Top TV Show Posters')}</h1>
    <p>${__('An erste.js mobile app demo')}</p>
</view>
`;
    }
}

module.exports = AboutView;
