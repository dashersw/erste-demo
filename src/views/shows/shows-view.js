var ListView = require('./list-view');
var View = require('erste').View;
var ViewManager = require('erste').ViewManager;
var NavBar = require('erste').NavBar;
var __ = require('erste').locale.__;
var erste = require('erste');

class ShowsView extends View {
    constructor() {
        super();

        this.vm = new ViewManager(this);
        this.listView = new ListView(this.vm);

        this.navBar = new NavBar({
            title: __('Top Shows'),
            hasMenuButton: true,
            hasBackButton: true
        });

        this.navBar.vm = this.vm;
    }

    onAfterRender() {
        super.onAfterRender();
        this.vm.setCurrentView(this.listView);
    }

    onActivation() {
        if (cfg.PLATFORM == 'device')
            StatusBar.styleLightContent();
    }

    template() {
        return `
<view class="shows-view">
    ${this.navBar}
    ${this.listView}
</view>`;
    }
}

module.exports = ShowsView;
