import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  overlay: any = document.getElementById('product-shape');
  container = document.getElementById('container');
  svg = document.getElementById('product-svg');

  // Reference the image
  img = document.getElementById('background-image');
  selectedColor: string = 'DBED64';

  color: any;

  allSVGColors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cpService: ColorPickerService
  ) {
    this.allSVGColors = [];
  }

  ngOnInit() {
    this.overlay = document.getElementById('product-shape');
    this.container = document.getElementById('container');
    this.svg = document.getElementById('product-svg');

    // Reference the image
    this.img = document.getElementById('background-image');
    this.changeColor();
    // this.simulateCover(this.container, this.svg, this.img, 1920, 1280);
  }

  // Reference the color shape that was drawn over the image

  changeColor() {
    // Set the fill style
    debugger;
    // this.overlay.style.fill = '#' + this.selectedColor;

    let totalPathLength: number = document.getElementsByTagName('path').length;

    for (let i = 0; i < totalPathLength; i++) {
      let path: any = document.getElementsByTagName('path')[i];
      if (path && path.style && path.style.fill) {
        let color: string = path.style.fill;
        if (color.includes('rgb')) {
          let hexColorString = this.convertToHex(color);
          if (
            this.allSVGColors.find((test) => test === hexColorString) ===
            undefined
          ) {
            this.allSVGColors.push(hexColorString);
          }
        }
      }
    }

    console.log(this.allSVGColors);
  }

  convertToHex(color: string): string {
    let a: any = color.split('(')[1].split(')')[0];
    a = a.split(',');
    let b = a.map((x) => {
      //For each array element
      x = parseInt(x).toString(16); //Convert to a base16 string
      return x.length == 1 ? '0' + x : x; //Add zero if we get only one character
    });
    //b = '0x' + b.join('');
    b = b.toString().replace(/,/g, '');
    return '#' + b;
  }
}
