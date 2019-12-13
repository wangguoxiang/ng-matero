import { Directive, HostListener, Inject } from '@angular/core';

import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[navAccordionOpen]',
})
export class AccordionOpenDirective {
  protected navlink: AccordionLinkDirective;

  constructor(@Inject(AccordionLinkDirective) navlink: AccordionLinkDirective) {
    this.navlink = navlink;
  }

}
