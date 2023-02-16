import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {
  
  @ViewChild('name') namekey!:ElementRef;
  ngOnInit(){
    
  }
  startQuiz(){
    localStorage.setItem('name',this.namekey.nativeElement.value)
  }


}
