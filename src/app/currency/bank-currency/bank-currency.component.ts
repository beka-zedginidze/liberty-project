import { Component, OnInit } from '@angular/core';
import { BankData, CalculatedData, ChosenData } from 'src/app/models/banksResponse.model';
import { ServiceService } from "src/app/service/service.service";
@Component({
  selector: 'app-bank-currency',
  templateUrl: './bank-currency.component.html',
  styleUrls: ['./bank-currency.component.css']
})
export class BankCurrencyComponent implements OnInit {
  bankData: any;
  monthValue: any;
  firstCurrency: any;
  secondCurrency: any;
  chosenData!: ChosenData[];
  calculatedData: CalculatedData = {
    bestBuyRate: {},
    bestSellRate: {},
    worstBuyRate: {},
    worstSellRate: {}
  }
  errorText?: string
  currency: any = [];
  month = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
  ];
  
  constructor(private data: ServiceService) { }

  ngOnInit(): void {
    this.bankInfo();
  } 

  bankInfo() {
    this.data.getBanksInfo().subscribe((res) => {
      this.bankData = res;
      this.getCurrencyCode();
      this.monthValue = this.month[0].id
      this.firstCurrency = this.currency[0].name
      this.secondCurrency = this.currency[1].name
    });
  }

  getCurrencyCode() {
    this.bankData[0].history[0].currencyRate.forEach((value: any) =>{
      this.currency = [
        ...this.currency,
          {name: value.code},
      ]
  });
  }

  getSelectedRates(): void {
    if(this.firstCurrency===this.secondCurrency) {
      this.errorText = 'The currencies must not be same'
      this.calculatedData.bestBuyRate.bank = undefined
      return
    }
    if(!this.firstCurrency || !this.secondCurrency) {
      console.log("error");
      this.errorText = "Please select all fields";
      return
    }
    if(!this.monthValue) {
      this.errorText = "Please select all fields";
      return
    }
      this.errorText = undefined
      let currencyRates:any = []
       this.bankData.forEach((data: any, index: any) =>{
        let history = data.history.filter((e: any)=>e.date===this.monthValue)[0]
        currencyRates.push({
          bankName: data.name,
          bankCode: data.code,
          sellRate: 0,
          buyRate:0
        })
        for(let historyItem of history.currencyRate) {
          if(historyItem.code===this.firstCurrency){
            let currencyRate = historyItem.rates.filter((e: any)=>e.code===this.secondCurrency)
            currencyRates[index].sellRate = currencyRate[0].sellRate
            currencyRates[index].buyRate = currencyRate[0].buyRate
          }
          let sellRates:any = []
          let buyRates:any = []
          currencyRates.forEach((rate:any)=>{
            sellRates.push(rate.sellRate)
            buyRates.push(rate.buyRate)
          })
          this.calculateBestRates(sellRates, buyRates)
          this.calculateBestRates(sellRates, buyRates)
        }
      })
  }  

  calculateBestRates(sellRates: number[], buyRates: []): void{
      let calculatedMaxAmount = Math.max(...buyRates)
      this.calculatedData!.bestBuyRate.rate = calculatedMaxAmount
      this.calculatedData!.bestBuyRate.bank = this.getBankName(calculatedMaxAmount, buyRates)

      calculatedMaxAmount = Math.max(...sellRates)
      this.calculatedData!.bestSellRate.rate = calculatedMaxAmount
      this.calculatedData!.bestSellRate.bank = this.getBankName(calculatedMaxAmount, sellRates)

      let calculatedMinAmount = Math.max(...sellRates)
      calculatedMinAmount = Math.min(...buyRates)
      this.calculatedData!.worstBuyRate.rate = calculatedMinAmount
      this.calculatedData!.worstBuyRate.bank = this.getBankName(calculatedMinAmount, buyRates)

      calculatedMinAmount = Math.min(...sellRates)
      this.calculatedData!.worstSellRate.rate = calculatedMinAmount
      this.calculatedData!.worstSellRate.bank = this.getBankName(calculatedMinAmount, sellRates)
  }

  getBankName(amount: number, arr: any) {
    let currencyIndex = arr.indexOf(amount); 
    return this.bankData[currencyIndex].name;
  }
}