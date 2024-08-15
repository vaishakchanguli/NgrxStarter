import { Component, HostListener, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { UPDATE } from "@ngrx/store";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: Array<any> = [];
  rowToEdit: number = -1;
  editForm!: any;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private eRef:ElementRef) {
    this.fetchUser();
    this.initForm();

  }


//events
@HostListener('document:click', ['$event'])
clickout(event:any) {
  if(this.eRef.nativeElement.contains(event.target)) {
   console.log("clicked inside")
  } else {
    console.log("clicked outside");
    this.editForm.reset();
    this.rowToEdit = -1;
  }
}

//data
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


//table events
  edit(index: number, user: any) {
    console.log('edit');
    this.rowToEdit = index;
    this.editForm.patchValue({
      name: user.name,
      username: user.username,
      email: user.email
    })

  }
  save(index: number) {   
    if (this.rowToEdit === -1) {
      return;
    }
     //update record
    this.users[index] = Object.assign(this.users[index], this.editForm.value);

    //reset
    this.editForm.reset();
    this.rowToEdit = -1;
  }



}
