import {Component, Directive, ElementRef, Input, AfterViewInit} from '@angular/core';
@Directive({ 
     selector: '[showCoulmn]' 
})
export class ShowColumn implements AfterViewInit{
    @Input() showInput: string;
    constructor(private eRef: ElementRef) { 
    }
    ngAfterViewInit(): void {
    this.eRef.nativeElement.style.display = this.showInput;
    }
}