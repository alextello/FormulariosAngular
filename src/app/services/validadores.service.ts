import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noTello(control: FormControl): {[s: string]: boolean} {
    if ( control.value?.toLowerCase() === 'tello') {
      return{
        noTello: true
      };
    }
    return null;
  }
}
