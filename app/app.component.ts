import { Component, EventEmitter } from 'angular2/core';

//added to practice adding child components, and so that parent (task-list/TaskListComponent) will display data from child (task-diaplay/TaskComponent) and not the class model (Task model). This way, a TaskComponent has the job of displaying one and only one task
//We start with the selector which we will use to render this component's View - we'll call it task-display
//this component's job will be to display a Task object, we will create one input called task for an instance of the component to receive the task we want it to show. This will automatically connect to a public property on our TaskComponent class with the same name task.
//to display the TaskComponent as a child of TaskListComponent, this has two halves. First, we have to use the directives key in the TaskListComponent to tell it that the TaskComponent exists.Then we just need to use the TaskComponent's <task-display> selector in the parent template.
@Component({
    selector: 'task-display',
    inputs: ['task'],
  template: `
    <h3>{{ task.description }}</h3>
  `
})

export class TaskComponent {
  public task: Task;
}

@Component({
  selector: 'task-list',
  //in order for the TaskListComponent to display our tasks, we need to tell the component which tasks we want displayed
  //used the inputs key, and set it equal to an array with one string in it: taskList
  //The inputs key gives Angular a list of arguments to expect when this component is instantiated, and it creates properties by the same name in the child component to store the incoming data
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent],

  //either add or remove the class selected based on whether or not the condition to the right of the equals sign is true: currentTask === selectedTask. So, if the currentTask displayed by the *ngFor loop is equal to the selectedTask component property, then the <h3/task-display> is highlighted blue.
  //nstead of using *ngFor to loop through <h3> tags, we will use it to loop through and display TaskComponents. Replace the <h3> tags with <task-display> tags, leaving our (click) and [class.selected] elements the same. Then we'll add one more attribute before the closing > of the opening selector tag - we need to tell our each of our TaskComponents which task to display. So we'll set the task input equal to the local variable currentTask as we instantiate the <task-display> tags with our for each loop.
  template: `
  <task-display *ngFor="#currentTask of taskList"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  `
})

//TaskListComponent is getting the click event from its view, and applying it to the methods in its Controller class definition, calling the taskClicked method
export class TaskListComponent {
  //we define a public property to hold an array of Task Models
  //taskList to match our input key
  public taskList: Task[];
  //create a property to hold the Event Emitter object for our output
  public onTaskSelect: EventEmitter<Task>;
  //create a property to keep track of which task object was last clicked on
  public selectedTask: Task;
  //instantiate the Event Emitter object in the child component constructor.
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log('TaskListComponent', clickedTask);
    this.selectedTask = clickedTask;
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
    console.log("AppComponent,taskWasSelected", clickedTask);
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
