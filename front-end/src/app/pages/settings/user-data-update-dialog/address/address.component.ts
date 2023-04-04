import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SettingsService } from '../../../../services/settings.service';
import { map } from 'rxjs';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];
  @Input() formGroupName!: string;
  @Input() user!: User;
  @Output() dialCode: EventEmitter<string> = new EventEmitter<string>();
  selectedCountry!: string | undefined;

  form!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private settingsService: SettingsService,
    private _detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settingsService
      .getCountries()
      .pipe(
        map(({ data }) => {
          const countriesArr: string[] = [];
          data.map((country) => countriesArr.push(country.name));
          return countriesArr.sort();
        })
      )
      .subscribe((value) => {
        this.countries = value;
      });

    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    if (this.user) {
      this.countryValueChange(this.user.address?.country);
      this.stateValueChange(this.user.address?.area);
    }
  }

  countryValueChange(value: string | undefined) {
    this.selectedCountry = value;
    this.settingsService
      .getStates({ country: value })
      .pipe(
        map(({ data }) => {
          const statesArr: string[] = [];
          data.states.map((state) => statesArr.push(state.name));
          return statesArr.sort();
        })
      )
      .subscribe((value) => {
        this.states = value;
      });

    if (value !== this.user.address?.country) {
      this.settingsService.getDialCode({ country: value }).subscribe({
        next: ({ data }) => {
          this.dialCode.emit(data.dial_code);
        },
      });
    }
  }

  stateValueChange(value: string | undefined) {
    this._detector.detectChanges();
    this.settingsService
      .getCities({ country: this.selectedCountry, state: value })
      .pipe(
        map(({ data }) => {
          const cityArr: string[] = [];
          data.map((city) => cityArr.push(city));
          return cityArr.sort();
        })
      )
      .subscribe((value) => {
        this.cities = value;
      });
  }
}
