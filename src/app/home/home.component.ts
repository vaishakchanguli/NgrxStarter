import { Component, HostListener, ElementRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { loadData, updateData } from "../store/user.actions";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: Array<any> = [];
  rowToEdit: number = -1;
  editForm!: any;

  constructor(private fb: FormBuilder,
    private eRef: ElementRef,
    private store: Store<any>) {

    this.store.dispatch(loadData());

    this.initForm();
  }

  ngOnInit() {
    this.store.select('users').subscribe({
      next: (users: any) => {
        this.users = users.data;
      }, error: (error: any) => { this, this.users = [] }
    })
  }

  //events
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      console.log("clicked inside")
    } else {
      console.log("clicked outside");
      this.editForm.reset();
      this.rowToEdit = -1;
    }
  }

  //data
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
    //this.users[index] = Object.assign(this.users[index], this.editForm.value);
    this.store.dispatch(updateData({...this.users[index],... this.editForm.value}))



    //reset
    this.editForm.reset();
    this.rowToEdit = -1;
  }



}
