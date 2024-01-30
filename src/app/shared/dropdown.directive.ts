import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') open = false;

  @HostListener('click') toggle(){
    this.open = !this.open;
  }
}
