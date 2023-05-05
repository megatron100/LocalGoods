import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Directive({
  selector: '[appMyErrorStateMatcher]',
})
export class MyErrorStateMatcherDirective implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent?.invalid &&
      control.parent?.dirty
    );
    return invalidCtrl || invalidParent;
  }
}
