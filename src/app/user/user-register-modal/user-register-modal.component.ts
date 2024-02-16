import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { UserLoginModalComponent } from '../user-login-modal/user-login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-register-modal.component.html',
  styleUrl: './user-register-modal.component.css'
})
export class UserRegisterModalComponent {
  email: string = '';
  password: string = '';
  successMessage: string = '';

  constructor(private router: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<UserRegisterModalComponent>) { }

  register() {
    const auth = getAuth();
    console.log("Registering user with username "+this.email+" and password "+this.password)
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User has been registered successfully " + JSON.stringify(user));
        this.successMessage = 'User registered successfully. You can now login.';
        this.redirectToLogin();
        this.email = '';
        this.password = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        this.successMessage = 'Registration unsuccessful, please try again';
      });
  }
  redirectToLogin(){
    this.dialogRef.close();
    const dialog = this.dialog.open(UserLoginModalComponent, {
      width: '600px',
      disableClose: false
    })
  }
}
