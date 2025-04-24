import { Directive, Input, ElementRef, Renderer2, OnChanges, inject, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDisplay]'
})
export class DisplayDirective implements OnChanges{

  private el = inject(ElementRef);
  @Input() appDisplay = false;

  constructor() { 
    this.el.nativeElement.style.display = 'none';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.appDisplay){
        this.el.nativeElement.style.display = "block";
      }else{
        this.el.nativeElement.style.display = "none";
      }
  }

}


