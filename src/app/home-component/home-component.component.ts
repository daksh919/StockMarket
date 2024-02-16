import { Component, OnInit } from '@angular/core';
import { ProcessDataComponent } from '../process-data/process-data.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadHardCodedData } from '../services/loadHardCodedData';
import { StockData } from '../services/stock.component';
import { Router } from '@angular/router';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { StoreFetchDataComponent } from '../store-fetch-data/store-fetch-data.component';
import emailjs from '@emailjs/browser';
import { LoadTabelComponent } from '../load-tabel/load-tabel.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [ProcessDataComponent, CommonModule, FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponent implements OnInit {

  send(customMessage: string) {
    emailjs.init('YSJlh2C-VG95xHJZh')
    emailjs.send("service_gh96qgn", "template_2yu4yw9", {
      from_name: "StockTracker",
      to_name: "Dushyant",
      website_name: "StockTracker",
      message: customMessage,
    });
  }
  title = "Stock Tracker";
  userName: string = '';
  addStock: string = '';
  stockkListSize: boolean = false;

  testCodeWithRealData: boolean = false;

  constructor(private initializeData: ProcessDataComponent, private dialog: MatDialog, private loadData: LoadHardCodedData, private router: Router,
    private fetchLocal: StoreFetchDataComponent, private loadHardData: LoadHardCodedData, private storeData: StoreFetchDataComponent,
    private loadTable: LoadTabelComponent) { }


  stockList = this.loadData.getStockData();
  filteredStocks: StockData[] = [];

  ngOnInit(): void {
    this.testCodeWithRealData = false;
    this.stockkListSize = false;
    this.filteredStocks = [];
    let user = this.fetchLocal.getUserLoginId();
    this.userName = user != null ? user : "";
  }

  onCheckboxChange(event: any) {
    this.testCodeWithRealData = event.target.checked;
  }

  fetchData() {
    //this.send("Hello from Stock Track");
    this.initializeData.initializeData(this.testCodeWithRealData);
  }

  filterStocks(event: any) {
    const inputValue = event.target.value.toUpperCase();
    this.filteredStocks = this.stockList.filter(stock =>
      stock.symbol.toUpperCase().startsWith(inputValue)
    );
  }

  searchTerm: string = '';
  search(): void {
    if (this.searchTerm.length != 0) {
      const dialogRef = this.dialog.open(StockDetailsComponent, {
        width: '600px',
        disableClose: false,
        data: this.searchTerm
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Terms and conditions accepted:', result);
        this.searchTerm = ''
      });
    }
  }

  Signout() {
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(['']);
  }

  updateTable() {
    let totalStocks = this.loadData.getAllStockList().length;
    if (totalStocks == 0) {
      this.stockkListSize = true;
    }
    else {
      this.fetchData();
      this.router.navigate(['loadTabel']);
    }
  }

  addStockData() {
    let doesDataExist = false;
    if (this.addStock.length == 0) {
      window.alert("Please enter stock symbol")
    }
    else {
      for (let stock of this.stockList) {
        if (stock.symbol == this.addStock) {
          doesDataExist = true;
        }
      }
      if (!doesDataExist) {

        this.openModal(this.addStock);
      }
      else {
        window.alert("Data already exist")
      }
    }
    /// this.loadHardData.addStockData(stockData);

  }

  openModal(symbol: string): void {
    this.loadTable.openModal(symbol, this.stockList, this.stockList.length, true);
    this.addStock = ''
  }
}