import {View, __} from 'erste';

export default class AboutView extends View {
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
