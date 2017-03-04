var __ = erste.locale.__;

var ShowsView = require('./shows/shows-view');
var AboutView = require('./about/about-view');
var Sidebar = require('./sidebar/sidebar');

class MainView extends erste.TabBar {
    constructor(vm) {
        super();

        this.showsView = new ShowsView();
        this.aboutView = new AboutView();

        this.views = [this.aboutView, this.showsView];

        this.showsView.navBar.menuButtonHandler = () => vm.toggleSidebar();

        this.hasSidebar = true;

        this.sidebar = new Sidebar();
        this.sidebar.vm = vm;

        this.sidebar.on('switchView', e => this.activateItemByName(e.view));

        this.sidebar.render(document.body);
    }

    onAfterRender() {
        super.onAfterRender();

        this.activateItemByName('shows');
    };

    template_items() {
        return `
<tab-item class="active" data-view="about">${__('About')}</tab-item><tab-item data-view="shows">${__('Shows')}</tab-item>
`;
    };

}


module.exports = MainView;
