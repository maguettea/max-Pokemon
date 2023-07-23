import { Directive, ElementRef, HostListener,Input } from '@angular/core';
 //[] montre qu'on a une directive
@Directive({
 
  selector: '[pkmnBorderCard]'
})
//@HostListen permet de lier une methode de notre directive  à un evenement donné
export class BorderCardDirective {
  private initialColor:string='#f5f5f5';
  private defaultColor:string= '#009688';
  private defaultHeight:number= 180;
  constructor(private el:ElementRef) { 
    //on appel les methodes dans le constructeur
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }
    //declaration de borderclor
    @Input('pkmnBorderCard') borderColor: string;//alias
    @Input() pkmnBorder: string;//sans alias
  //je veux l'orsque l'utilisateur clique sur un pokemon la bordure change de color
  //quant le user entre sur un pokemon
   @HostListener('mouseenter') onMouseEnter() {
     this.setBorder(this.borderColor || this.defaultColor);
   }
    //je  veux l'orsque l'utilisateur quitter  un pokemon ça revient a l'etat initial
    //onMouseLeavequant l'utilisateur sort sur un pokemon
    @HostListener('mouseleave') onMouseLeave() {
        this.setBorder(this.initialColor);
    }
  //la methode setHeight permet de definire une hauteur des card
     setHeight(height:number){
     this.el.nativeElement.style.height=height + 'px';

     }
      setBorder(color: string){
        let border='solid 4px' + color;
        this.el.nativeElement.style.border=border;
      }
}
