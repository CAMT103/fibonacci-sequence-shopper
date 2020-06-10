import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.css']
})
export class FibonacciComponent implements OnInit {

  sequenceArr:number[]= [];
  sequenceText:string;

  constructor() { }

  ngOnInit(): void {

  }

  GetLastFibonacciNumber = (left:number, right:number, limit:number) =>
  {
      if (limit == 0) 
      {
          return limit;
      }

      return (left + right <= limit) ? this.GetLastFibonacciNumber(right, left + right, limit) : right;
  };

  DoFibonacci = (position:number) =>{

    if(position <= 1){
      return 1;
    }
    else{
      let sum:number = this.DoFibonacci(position-1) + this.DoFibonacci(position-2);
      return sum;
    }
  };

  DoOperations = (frm:NgForm) =>
  {
    if(frm.invalid)
    {
      Object.values( frm.controls ).forEach( control => {
        control.markAsTouched();
      });

      return;
    }
    
    
    //console.log("typed: " + frm.controls["txtLimit"].value + "___" + this.GetLastFibonacciNumber(0, 1, frm.control["txtNumber"]));
    //this.GetLastFibonacciNumber(0, 1, frm.controls["txtLimit"].value)

    this.sequenceArr = [];
    let i:number= 0;
    while(i < 6){
      this.sequenceArr.push(this.DoFibonacci(i));
      i++;
    }
    this.sequenceText = this.sequenceArr.join(',');
  };

} // end class