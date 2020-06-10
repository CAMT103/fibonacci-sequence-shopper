import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FibonacciSequenceService {

  constructor() { }

  GetLastFibonacciNumber = (left:number, right:number, limit:number):number =>
  {
      if (limit == 0) 
      {
          return limit;
      }

      return (left + right <= limit) ? this.GetLastFibonacciNumber(right, left + right, limit) : right;
  };

  DoFibonacci = (position:number):number =>{

    if(position > 1){
      let sum:number = this.DoFibonacci(position-1) + this.DoFibonacci(position-2);
      return sum;
    }

    return 1;
  };
} // end service class