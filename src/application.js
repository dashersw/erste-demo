import {ViewManager} from 'erste';

import Sidebar from './views/sidebar/sidebar';
import MainView from './views/main-view';
import locale from './lib/locale';

import './style/reset.css';
import './style/base.css';
import './style/icons.css';
import './style/infinite-scroll.css';
import './style/pull-to-refresh.css';
import './style/tab-view.css';

export default class Application {
  constructor() {
    locale('en');

    const vm = new ViewManager();

    const sidebar = new Sidebar();
    sidebar.vm = vm;
    sidebar.on('switchView', (e) => mainView.activateItemByName(e.view));
    sidebar.render(document.body);

    var mainView = new MainView(vm);
    vm.setCurrentView(mainView);
  }
}
