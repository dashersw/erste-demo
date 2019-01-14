import {Sidebar, __} from 'erste';
import './sidebar.css'

export default class extends Sidebar {
    template_items() {
        return `
<sidebar-item class="sidebar-item-shows" data-view="shows"><i class="icon-signup"></i>${__('Shows')}
    <sidebar-label>
        ${__('Great posters for the best shows')}
    </sidebar-label>
</sidebar-item>
<sidebar-item class="sidebar-item-about" data-view="about">
    <i class="icon-about"></i>${__('About')}
</sidebar-item>
`;
    };
}
