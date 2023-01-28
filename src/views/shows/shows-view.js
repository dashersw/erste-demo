import { View, ViewManager, NavBar, __ } from 'erste'
import ListView from './list-view'
import './shows.css'
import './navbar.css'

export default class ShowsView extends View {
  constructor() {
    super()

    this.vm = new ViewManager(this)
    this.listView = new ListView(this.vm)

    this.navBar = new NavBar({
      title: __('Top Shows'),
      hasMenuButton: true,
      hasBackButton: true,
    })

    this.navBar.vm = this.vm
  }

  onAfterRender() {
    super.onAfterRender()
    this.vm.setCurrentView(this.listView)
  }

  onActivation() {
    if (cfg.PLATFORM == 'device') StatusBar.styleLightContent()
  }

  template() {
    return `
<view class="shows-view">
    ${this.navBar}
    ${this.listView}
</view>`
  }
}
