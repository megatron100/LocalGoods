import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SettingsService } from '../../../../services/settings.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() formGroupName!: string;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  @Input() country!: string;
  @Input() state!: string;
  @Input() mobile!: string;
  @Output() dialCode: EventEmitter<any> = new EventEmitter<any>();
  selectedCountry!: string;

  form!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private settingsService: SettingsService
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

    this.countryValueChange(this.country);
    this.stateValueChange(this.state);
  }

  countryValueChange(value: any) {
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

    if (value !== this.country) {
      this.settingsService.getDialCode({ country: value }).subscribe({
        next: ({ data }) => {
          this.dialCode.emit(data.dial_code);
        },
      });
    }
  }

  stateValueChange(value: any) {
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
