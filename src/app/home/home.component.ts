import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: Array<any> = [];
  rowToEdit: number = -1;
  editForm!: any;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    this.fetchUser();
    this.initForm();

  }

  private fetchUser() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (response: any) => {
          this.users = response;
          console.log(response)
        },
        error: () => { }
      })
  }
  private initForm() {
    this.editForm = this.fb.group({
      name: [''],
      username: [''],
      email: ['']
    })
  }



  edit(index: number, user: any) {
    this.rowToEdit = index;
    this.editForm.patchValue({
      name: user.name,
      username: user.username,
      email: user.email
    })

  }
  save(user: any) {
    this.rowToEdit = -1;
    console.log(user)
  }
}
