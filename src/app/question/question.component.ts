import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  constructor(private questionservice:QuestionService){}
  public name:String='';
  public questionlist: any = [];
  public currentQuestion: any= 0;
  public points: number=0;
  public counter=60;
  progress:string="0";
  isQuizCompleted : boolean= false;
   correctAnswer:number = 0;
   inCorrectAnswer:number = 0;
   interval$:any;

   ngOnInit(): void {
    this.name=localStorage.getItem('name')!;
    this.getallQuestions();
    this.startcounter();
  }

  getallQuestions(){
    this.questionservice.getQuestionJson()
    .subscribe((response) =>{
      console.log(response)
      this.questionlist=response.questions;
    })
  }

  nextquestion(){
    this.currentQuestion++;
  }
  previousquestion(){
    this.currentQuestion--;
  }
  answer(currentQno:number,option:any){
    if(currentQno === this.questionlist.length){
    this.isQuizCompleted = true;
    this.stopcounter();
    }
    if (option.correct){
       this.points+= 10;
       this.correctAnswer++;
       setTimeout(() => {
       this.currentQuestion++;
       this.resetcounter()
       this.getProgresspercent();
        
       }, 1000);
        
        
  
  }else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetcounter();
        this.getProgresspercent();
   }, 1000);
      this.points -= 10;
}
  }
startcounter(){
  this.interval$ = interval(1000)
  .subscribe(val=>{
    this.counter--;
    if(this.counter===0){
      this.currentQuestion++;
      this.points-=10;
      this.counter=60;
    }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    },600000);
  }

  stopcounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  
  resetcounter(){
    this.stopcounter();
    this.counter=60;
    this.startcounter();
  }
  resetquiz(){
    this.resetcounter();
    this.points=0;
    this.getallQuestions();
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgresspercent()
  {
  this.progress = ((this.currentQuestion/this.questionlist.length)*100).toString();
  return this.progress;
  }
  
}


  

  
  
  

 
  

