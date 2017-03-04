var Sidebar = require('./views/sidebar/sidebar');
var MainView = require('./views/main-view');
var locale = require('./lib/locale');

class Application {
    constructor() {
        this.vm = new erste.ViewManager();

        var mainView = new MainView(this.vm);

        mainView.render(document.body);

        this.vm.setCurrentView(mainView);
    }
}

module.exports = new Application();
