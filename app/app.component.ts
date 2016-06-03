import { Component, EventEmitter } from 'angular2/core';


@Component({
  selector: 'task-list',
  //in order for the TaskListComponent to display our tasks, we need to tell the component which tasks we want displayed
  //used the inputs key, and set it equal to an array with one string in it: taskList
  //The inputs key gives Angular a list of arguments to expect when this component is instantiated, and it creates properties by the same name in the child component to store the incoming data
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  template: `
  <h3 *ngFor="#currentTask of taskList" (click)="taskClicked(currentTask)">
    {{ currentTask.description }}
  </h3>
  `
})

//TaskListComponent is getting the click event from its view, and applying it to the methods in its Controller class definition, calling the taskClicked method
export class TaskListComponent {
  //we define a public property to hold an array of Task Models
  //taskList to match our input key
  public taskList: Task[];
  //create a property to hold the Event Emitter object for our output
  public onTaskSelect: EventEmitter<Task>;
  //instantiate the Event Emitter object in the child component constructor.
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log('child', clickedTask);
    this.onTaskSelect.emit(clickedTask);
  }
}

@Component({
  selector: 'my-app',
  directives: [TaskListComponent],
  //View
  template: `
  <div class="container">
    <h1>To-Do List</h1>
    <!--use the value of the parent property tasks in its input [taskList]-->
    <!--tell the <task-list> component to connect its output onTaskSelect, our custom event emitter, to the parent method taskWasSelected-->
    <!--Because it is a custom event, we receive the actual event itself, defined by the argument $event-->
    <task-list
      [taskList]="tasks"
      (onTaskSelect)="taskWasSelected($event)">
    </task-list>
  </div>
  `
})

//Controller class definition
export class AppComponent {
  //created a public property called tasks of type Task
  public tasks: Task[];  // Task[] (or Array<Task>) identifies tasks as an array of Task objects
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

// Model class
export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {

  }
}

// <h3 *ngFor="#task of tasks" (click)="taskWasSelected(task)">
//   {{ task.description }}
