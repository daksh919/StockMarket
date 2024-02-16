import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StoreFetchDataComponent } from '../store-fetch-data/store-fetch-data.component';
import { UserLoginModalComponent } from '../user/user-login-modal/user-login-modal.component';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  username: string;
  password: string;
  currentTime: Date;
  isMainRoute: boolean = false;
  isUserLoggedIn: boolean = false;

  conditionList: string[] = [
    "This is ust an example webiste with dummy data wait for next update",
    'When you make any change in data like buy share/fetch latest price, you have to refresh the whole page to see changes on tabel//press update table right now',
    'Stock details when we do search is not available now, wait for next update.',
    "Terms and condition box does not get close by clicking submit once, we have to click two times",
    "Everytime we go back to home page we get terms and condition page",
  ];

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private localData: StoreFetchDataComponent) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isMainRoute = event.url === '/';
      });

    //this.checkAndSendMail();
  }
  
  ngOnInit() {
    this.currentTime = new Date();
    var user = this.localData.getUserLoginId();
    this.isUserLoggedIn = user != "" && user != null ? true : false;
    console.log("does user exist " + this.isUserLoggedIn + user)
    //this.openTermsAndConditionsModal();
  }

  checkAndSendMail() {
    const currentTime = new Date();
    console.log(currentTime.getMinutes() + " from CheckAndSendMail");
    if (currentTime.getMinutes() === 17) {
      console.log("Mail Sent at " + currentTime.getMinutes());
      this.send("Hello from Stock Track");
    }
  }

  openTermsAndConditionsModal(): void {
    const dialogRef = this.dialog.open(TermsAndConditionsComponent, {
      width: '600px',
      disableClose: true,
      data: this.conditionList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Terms and conditions accepted:', result);
    });
  }
  loginModal() {
    const dialog = this.dialog.open(UserLoginModalComponent, {
      width: '900px',
      disableClose: false
    })
  }
  redirectToLogin() {
    this.router.navigate(['fetchDetail']);
  }
  sendMail() {
    console.log(this.currentTime.getMinutes())
    this.send("Hello from Stock Track");
  }
  
  send(customMessage: string) {
    emailjs.init('YSJlh2C-VG95xHJZh')
    emailjs.send("service_gh96qgn", "template_2yu4yw9", {
      from_name: "StockTracker",
      to_name: "Dushyant",
      website_name: "StockTracker",
      message: customMessage,
    });
  }
}