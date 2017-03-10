var Sidebar = require('./views/sidebar/sidebar');
var MainView = require('./views/main-view');
var locale = require('./lib/locale');
var erste = require('erste');

class Application {
    constructor() {
        const vm = new erste.ViewManager();

        const sidebar = new Sidebar();
        sidebar.vm = vm;
        sidebar.on('switchView', e => mainView.activateItemByName(e.view));
        sidebar.render(document.body);

        var mainView = new MainView(vm);
        vm.setCurrentView(mainView);
    }
}

module.exports = new Application();
