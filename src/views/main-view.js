import ShowsView from './shows/shows-view'
import AboutView from './about/about-view'
import './main-view.css'

import { TabView, __ } from 'erste'

export default class MainView extends TabView {
  constructor(vm) {
    super()

    this.showsView = new ShowsView()
    this.aboutView = new AboutView()

    this.views = [this.aboutView, this.showsView]

    this.showsView.navBar.onMenuButtonTap = () => vm.toggleSidebar()

    this.hasSidebar = true
  }

  template_items() {
    return `
<tab-item class="active" data-view="about">${__('About')}</tab-item><tab-item data-view="shows">${__(
      'Shows'
    )}</tab-item>
`
  }
}
