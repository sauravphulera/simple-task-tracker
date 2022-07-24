import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  projects: any = [];
  savedProjects: any = [];
  selfStartTimer = false;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.addProject();
  }
  createId() {
    return Math.random().toString().replace('.', '');
  }
  addProject() {
    this.selfStartTimer = false;
    this.projects.push({
      id: this.createId(),
      name: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
  deleteProject(index: number) {
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }
  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'ok', {
      duration: 2000,
    });
  }
  getInd(arr: [], id: string) {
    let i:any;
    for(i = 0; i <arr.length;i++) {
      if(arr[i]['id'] == id) {
        return i;
      }
    }
    return -1;
  }
  saveProject(index: number) {
    if (index !== -1) {
      let ind = this.getInd(this.savedProjects,this.projects[index].id);
      if (ind > -1) {
        this.savedProjects[ind] = {
          id: this.savedProjects[ind].id,
          name: this.projects[index].name,
          hours: this.projects[index].hours + this.savedProjects[ind].hours,
          minutes: this.projects[index].minutes + this.savedProjects[ind].minutes,
          seconds: this.projects[index].seconds + this.savedProjects[ind].seconds
        };
      } else {
        this.savedProjects.push({ ...this.projects[index] });
      }
      this.projects.splice(index, 1);
      // console.log(this.savedProjects, this.projects);
      this.openSnackBar('Project saved successfully');
    }
  }
  playProject(index: number) {
    if (index !== -1) {
      this.projects.push({ ...this.savedProjects[index],hours:0,minutes: 0,seconds: 0 });
      this.selfStartTimer = true;
      // this.openSnackBar('Project saved successfully');
    }
  }
  pauseProject(index: number) {
    if (index !== -1) {
      this.saveProject(index);
    }
  }
}
