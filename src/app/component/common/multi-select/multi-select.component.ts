import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ba-multiselect',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [ // Giúp cho component này có thể được sử dụng như một value accessor trong Angular Forms
    {
      provide: NG_VALUE_ACCESSOR,  // Cung cấp value accessor cho Angular Forms
      useExisting: forwardRef(() => MultiSelectComponent),  // Sử dụng component MultiSelectComponent làm provider cho NG_VALUE_ACCESSOR
      multi: true  // Cho phép nhiều provider cho NG_VALUE_ACCESSOR, vì một component có thể làm nhiều thứ
    }
  ]
})
export class MultiSelectComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement!: ElementRef;

  @Input() options: { label: any; value: any, itemGroup?: any }[] = [];
  @Input() selectedOptions: any[] = [];
  @Input() defaultLabel: string = "Choose";
  @Output() onChangeValue = new EventEmitter();

  private onChange: Function = new Function();

  constructor() { }

  ngOnInit() {
    this.options.forEach(e => {
      e.itemGroup = `Tất cả (${this.options.length})`;
    })
  }

  ngAfterViewInit(): void {
  }

  writeValue(val: any): void {
    console.log(val);
    this.selectedOptions = val ?? ""
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  changeValue(e: any) {
    if (typeof this.onChange === 'function') {
      this.onChange(this.selectedOptions);
    }
    this.onChangeValue.emit(this.selectedOptions);
  }

  handleKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (value.length > 0) {
      return;
    }

    if (event.key === 'Backspace' && value.length === 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
