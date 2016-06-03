import { Component } from 'angular2/core';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],//3loaded it?
  template: `
  <h3 *ngFor="#currentTask of taskList" (click)="taskClicked(currentTask)"> <!--4iterated and printed it? -->
    {{ currentTask.description }}
  </h3>
  `
})

export class TaskListComponent {
  public taskList: Task[];//1made it?not created yet, just declared
  taskClicked(clickedTask: Task): void {
    console.log(clickedTask);
  }
}

@Component({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
    <div class="container">
      <h1>To-Do List</h1>
      <task-list [taskList]="tasks"></task-list> <!--2populated it? created here-->
    </div>
  `
})

export class AppComponent {
  public tasks: Task[];
  constructor(){
    this.tasks = [
      new Task("Create To-Do List app.", 0),
      new Task("Learn Kung Fu.", 1),
      new Task("Rewatch all the Lord of the Rings movies.", 2),
      new Task("Do the laundry.", 3)
    ];
  }
  taskWasSelected(clickedTask: Task): void {
    console.log(clickedTask);
  }
}


export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {

  }
}
