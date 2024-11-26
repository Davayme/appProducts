import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() formControl!: FormControl;
  @Input() type: string = 'text';
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  hide: boolean = true;
  isPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.type === 'password') {
      this.isPassword = true;
    }
  }

  hideOrShowPassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}