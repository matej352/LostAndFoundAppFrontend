import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsStoreService {

  constructor() { }



  datePickerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = false;
      if (control.value) {
        const date: Date = control.value;
        let currentDate =  new Date();
        if (date > currentDate) {
          forbidden = true;
        }
      }
      return forbidden ? { 'invalidDate': true } : null;
    };
  } 


  static mustMatch(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
  
  

}
