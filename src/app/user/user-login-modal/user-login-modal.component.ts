import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { StoreFetchDataComponent } from '../../store-fetch-data/store-fetch-data.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRegisterModalComponent } from '../user-register-modal/user-register-modal.component';
import { UserForgotpasswordModalComponent } from '../user-forgotpassword-modal/user-forgotpassword-modal.component';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-login-modal.component.html',
  styleUrl: './user-login-modal.component.css'
})

export class UserLoginModalComponent  {
  email = ''
  password = ''
  errorDisplay = false;
  errorText = ''
  constructor(private router: Router, private localData: StoreFetchDataComponent,  private dialog: MatDialog, private dialogRef: MatDialogRef<UserLoginModalComponent>) {
    this.errorDisplay = false;
  }

  login() {
    this.errorDisplay = false;
    this.errorText = ''
    const auth = getAuth();
    console.log("Logging user with username " + this.email + " and password " + this.password)
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User has been logged in successfully " + JSON.stringify(user.email) + ". Is user verified " + JSON.stringify(user.emailVerified))
        console.log(JSON.stringify(user))
        this.localData.updateLoginId(user.email != null ? user.email : "");
        this.dialogRef.close();
        this.router.navigate(['fetchDetail']);
      })
      .catch((error) => {
        this.errorDisplay = true;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        console.log(errorCode)
        console.log(errorMessage);
        this.errorText = error;
      });
  }
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential != null ? credential?.accessToken : "";
        const user = result.user;
        console.log("User has been logged in successfully " + JSON.stringify(user.email) + ". Is user verified " + JSON.stringify(user.emailVerified))
        console.log(JSON.stringify(user))
        this.localData.updateLoginId(user.email != null ? user.email : "");
        this.dialogRef.close();
        this.router.navigate(['fetchDetail']);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error.message + " " + credential)
      });
  }
  register(){
    this.dialogRef.close();
    const dialog = this.dialog.open(UserRegisterModalComponent, {
      width: '600px',
      disableClose: false
    })
  }
  forgotPassword(){
    this.dialogRef.close();
    const dialog = this.dialog.open(UserForgotpasswordModalComponent, {
      width: '600px',
      disableClose: false
    })
  }
}


