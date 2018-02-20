import { Directive, Attribute, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
@Directive({
  selector: '[mask]',
  host: {
      '(keyup)': 'onInputChange($event)',
      '(keypress)': 'onInputPress($event)'
  },
  providers: [NgModel]
})
export class MaskDirective {
    maskPattern: string;
    placeHolderCounts: number;
    keycode:any;

    constructor(
        public model: NgModel,
        public element: ElementRef,
        @Attribute("mask") maskPattern: string
    ) {
        // console.log(element);
        this.generatePattern(maskPattern);
        element.nativeElement.setAttribute('maxLength', maskPattern.length )
    }

    onInputPress(event){
        if (event.target.value.length>this.maskPattern.length){
            event.preventDefault()
        }

    }
    onInputChange(event) {
        if ( event.keyCode != 229 )
            this.aplicarMascara(event.target);
            // event.target.value = this.aplicarMascara(event.target.value);
    }

    generatePattern(patternString) {
        this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
        for (let i = 0; i < this.placeHolderCounts; i++) {
            patternString = patternString.replace('*', "{" + i + "}");
        }
        this.maskPattern = patternString;
    }

    // aplicarMascara(valor: string): string {
    aplicarMascara(elem) {
        let valor = elem.value.replace(/\D/g, '');
        // valor = valor.replace(/\D/g, '');
        let pad = this.maskPattern.replace(/\D/g, '').replace(/9/g, '_');
        let valorMask = valor + pad.substring(0, pad.length - valor.length);
        let valorMaskPos = 0;

        valor = '';
        for (let i = 0; i < this.maskPattern.length; i++) {
          if (isNaN(parseInt(this.maskPattern.charAt(i)))) {
            valor += this.maskPattern.charAt(i);
          } else {
            valor += valorMask[valorMaskPos++];
          }
        }

        if (valor.indexOf('_') > -1) {
          valor = valor.substr(0, valor.indexOf('_'));
        }

        elem.value = valor;
        // return valor;
      }


}
