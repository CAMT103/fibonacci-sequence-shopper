import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators  } from '@angular/forms';
import { FibonacciSequenceService } from 'src/app/services/fibonacci-sequence.service';


@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.css']
})
export class FibonacciComponent implements OnInit {

  frmItem:FormGroup;
  sequenceArr:number[]= [];
  historicalArr:HistoryDTO[]= [];
  sequenceText:string = '';
  lastNumber:number = 0;

  constructor(private _FiboService:FibonacciSequenceService,
              private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  get f(){
    return this.frmItem.controls;
  }

  get LimitNotValid(){
    return this.frmItem.get('txtLimit').invalid && this.frmItem.get('txtLimit').touched;
  }

  CreateForm = ():void => {
    this.frmItem = this._formBuilder.group({
      txtLimit    : ['', 
                    [ Validators.required,
                      Validators.pattern('^[0-9]*$') ] ]
    });
  };



  DoFibo = () =>
  {
    if(this.frmItem.invalid)
    {
      return Object.values( this.frmItem.controls ).forEach(element => 
      {
        if(element instanceof FormGroup)
        {
          Object.values( element.controls ).forEach( innerControl => innerControl.markAsTouched());
        }
        else
        {
          element.markAsTouched();
        }
      }); 
    }

    let i:number= 0;
    let limit:number = this.frmItem.get("txtLimit").value;
    this.sequenceArr = [];
    
    console.log(limit);
    while(i <= 10 && i <= limit){
      this.sequenceArr.push(this._FiboService.DoFibonacci(i));
      i++;
    }
    
    this.sequenceText = this.sequenceArr.join(',');
    this.lastNumber = this._FiboService.GetLastFibonacciNumber(0, 1, limit)
    let history:HistoryDTO = new HistoryDTO();
    history.limit = limit;
    history.result = this.lastNumber;
    this.historicalArr.push(history);
  };

  Clear = () =>{
    this.frmItem.reset();
    this.sequenceArr = [];
    this.sequenceText = '';
    this.lastNumber = 0;
    this.historicalArr = [];
  };


  keyPress = (event: any) => {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

} // end class

export class HistoryDTO{
  limit:number;
  result:number;
};