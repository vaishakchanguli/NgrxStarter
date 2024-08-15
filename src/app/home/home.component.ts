import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl:'./home.component.css'
})
export class HomeComponent {
  users: Array<any> = [];
  constructor(private httpClient: HttpClient) {
    this.fetchUser();
  }

  private fetchUser() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (response:any) => {
          this.users = response;
console.log(response)
        },
        error: () => { }
      })
  }
}
