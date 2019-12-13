import { Component, Input } from '@angular/core';
import { MenuService, Menu, ChildrenItem } from '@core';


@Component({
  selector: 'app-sidemenu',
  styleUrls: ['./sidemenu.component.scss'],
  templateUrl: './sidemenus.component.html',
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menus = this.menuService.getAll();
  childmenu: ChildrenItem[];

  constructor(private menuService: MenuService) {}

  // Delete empty value in array
  filterStates(states: string[]) {
    return states.filter(item => item && item.trim());
  }

  click(menu: Menu) {
    this.childmenu = menu.children;
  }

}
