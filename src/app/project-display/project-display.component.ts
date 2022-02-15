import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent implements OnInit {
  @Input() hours: number = 0;
  @Input() minutes: number = 0;
  @Input() seconds: number = 0;
  @Input() name: string = '';
  @Output() play = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  playTimer() {
    this.play.emit();
  }

}
