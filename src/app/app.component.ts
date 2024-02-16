
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MainPageComponent } from './main-page/main-page.component';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { StoreFetchDataComponent } from './store-fetch-data/store-fetch-data.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'routerEample';
  isMainRoute: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private localData: StoreFetchDataComponent) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isMainRoute = event.url === '/';
      });
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebase);
    this.localData.setUserIdOnInitialization();
    
  }

  
}