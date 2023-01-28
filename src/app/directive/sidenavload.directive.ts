import { Directive, Output, EventEmitter, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appSidenavload]',
})
export class SidenavloadDirective implements AfterContentInit {
  @Output() onCurrencyEvent = new EventEmitter();
  constructor() { }

  ngAfterContentInit() {
    this.onCurrencyEvent.emit('test');
  }
}
