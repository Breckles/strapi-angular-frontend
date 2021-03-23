import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  restaurants: any[] = [];
  allCategories: any[] = [];
  error = null;
  restaurantForm!: FormGroup;

  constructor(private http: HttpClient, private fbService: FormBuilder) {}

  ngOnInit() {
    this.http
      .get('http://localhost:1337/restaurants')
      .subscribe((response: any) => {
        this.restaurants = response;
      });

    this.http
      .get('http://localhost:1337/categories')
      .subscribe((response: any) => {
        this.allCategories = response;
      });

    this.restaurantForm = this.fbService.group({
      name: '',
      description: '',
      categories: new FormArray([]),
    });
  }

  onCheckChange(event: Event) {
    console.log(event);
    const checkbox = event.target as HTMLInputElement;

    const formArray: FormArray = this.restaurantForm.get(
      'categories'
    ) as FormArray;

    if (checkbox.checked) {
      formArray.push(new FormControl(checkbox.value));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: AbstractControl) => {
        if (ctrl.value == checkbox.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    this.http
      .post('http://localhost:1337/restaurants', this.restaurantForm.value)
      .subscribe((response) => {
        console.log(response);
        // console.log(this.restaurantForm.value);
      });

    this.restaurantForm.reset();
  }
}
