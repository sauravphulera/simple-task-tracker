import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() hours: number = 0;
  @Input() minutes: number = 0;
  @Input() seconds: number = 0;
  @Input() name: string = '';
  @Input() selfStartTimer: boolean = false;
  @Output() delete = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() secondsChange = new EventEmitter();
  @Output() minutesChange = new EventEmitter();
  @Output() hoursChange = new EventEmitter();
  @Output() nameChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    if(this.selfStartTimer) {
      this.startTimer();
      this.isPlayClicked = true;
    }
  }
  timer:any;
  isPlayClicked = false;
  startTimer() {
    this.pauseTimer();
    this.timer = setInterval(() => {
      this.secondsChange.emit(++this.seconds);
      if(this.seconds >= 60) {
        this.minutesChange.emit(++this.minutes);
        // this.minutes++;
        this.seconds = 0;
        this.secondsChange.emit(this.seconds);
      }
      if(this.minutes >= 60) {
        this.hoursChange.emit(++this.hours);
        this.minutes = 0;
        this.minutesChange.emit(this.minutes);
      }
      if(this.hours >= 60) {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0
        this.hoursChange.emit(0);
        this.minutesChange.emit(0);
        this.secondsChange.emit(0);
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  deleteProject() {
    this.delete.emit();
  }

  saveProject() {
    this.save.emit();
  }
  onChangeName() {
    this.nameChange.emit(this.name);
  }
}
