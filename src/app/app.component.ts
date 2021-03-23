import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'strapi-angular-frontend';
  restaurants: any[] = [];
  error = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:1337/restaurants')
      .subscribe((response: any) => {
        this.restaurants = response;
      });
  }
}
