import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, setDoc, doc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date;
  loading = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {
    this.birthDate = new Date();
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('current User is', this.user.birthDate);
    this.loading = true;
    let userCollection = collection(this.firestore, 'user');
    setDoc(doc(userCollection), this.user.toJSON()).then((result: any) => {
      this.loading = false;
      console.log('Adding user finsihed', this.user);
    });
    this.dialogRef.close();
  }
}
