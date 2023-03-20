import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {SettingsService} from "../../../../services/settings.service";
import {map} from "rxjs";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() formGroupName!: string
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  @Input() selectedCountry!: string;
  @Input() selectedState!: string;
  @Input() selectedCity!: string;

  form!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit(): void {

    this.settingsService.getCountries()
      .pipe(
        map(({data}) => {
          const countriesArr: string[] = [];
          data.map(country => countriesArr.push(country.name));
          return countriesArr.sort()
        })
      )
      .subscribe(value => {
        this.countries = value
      })

    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.countryValueChange(this.selectedCountry);
    this.stateValueChange(this.selectedState);
    this.cityValueChange(this.selectedCountry);
  }

  countryValueChange(value: any) {
    this.selectedCountry = value;
    console.log(value)
    this.settingsService.getStates({"country": value})
      .pipe(
        map(({data}) => {
          const statesArr: string[] = [];
          data.states.map(state => statesArr.push(state.name));
          return statesArr.sort()
        })
      )
      .subscribe(value => {
        this.states = value
      })
  }

  stateValueChange(value: any) {
    this.selectedState = value;
    this.settingsService.getCities({"country": this.selectedCountry, "state": value})
      .pipe(
        map(({data}) => {
          const cityArr: string[] = [];
          data.map(city => cityArr.push(city));
          return cityArr.sort()
        })
      )
      .subscribe(value => {
        this.cities = value
      })
  }

  cityValueChange(value: any) {
    this.selectedCity = value;
  }
}
