import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user = new User();
  allUsers = [];
  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log(changes);
        this.allUsers = changes;
      });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
