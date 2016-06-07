import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import {DonePipe} from './done.pipe';


//Now we need to tell the parent component that this component exists by importing it and adding it to the directives: list in the @Component decorator. Then, we simply use the selector tag <edit-task-details> in the parent template, using [ ] to pass it the inputs we defined.
//There's no reason that we need to show a blank form to edit a description if a task has not been selected yet. So let's hide our new component if there's no task selected yet. We can do this from the child component's selector:


@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  pipes: [DonePipe],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template:
  //Finally, let's adjust the parent component. We're already loading the child component, but we need to tell the TaskListComponent to expect an event from the NewTaskComponent first, and we need to set that input to trigger a method to take the new description and use it to create a new task.
  //So, onSubmitNewTask, we want to call the createTask method on this component controller class, passing it in the standard syntax for an event: $event. Now let's write the answering method:
  //notice that the values for the 3 options are what we are looking for in the if statement in our pipe.
  // 1.we need to get the value out of that menu whenever the user changes it. To do that, we will use another built in event emitter like click, which is called (change). It is triggered any time the menu's selected value changes.
  //2.We connect the (change) event using parenthesis for output to a method called onChange that we will write next. We pass it the selected value from the menu by using the argument $event.target.value.
  //4. Finally, we can add our pipe! We just need to use its name in our template where we are listing out the array of tasks that we want to filter, and we need to pass it our chosen menu option.
  //We are filtering taskList before we display the tasks with our *ngFor loop, so we use the | followed by the name of our filter, defined in its decorator's name property. Then we pass it any additional arguments separated by :.
  `
  <select (change)="onChange($event.target.value)" class="filter">
    <option value="all">Show All</option>
    <option value="done">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
  </select>
  <task-display *ngFor="#currentTask of taskList | done:filterDone"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  `
})

//Since the TaskListComponent is the one dealing with displaying the list of tasks, and it is the one keeping track of which task is currently selected, it makes sense to instantiate the task editing component there.
//When a task is clicked, we use the (click) emitter to call our taskClicked method. This sets the TaskListComponent's property selectedTask equal to the task that we want to edit. Therefore, we can just pass this property value into the EditTaskDetailsComponent.
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  //3.first, let's create a property in our component controller class to store the value from this menu. We'll set it to a default value of "notDone", since tasks that are not done yet are the first priority for Cameron to see.
  public filterDone: string = "notDone";
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  createTask(description: string): void {
    this.taskList.push(
      new Task(description, this.taskList.length)
    );
  }
  //4.Now we'll define our onChange method. Now we can select an option from our filter menu and have it printed out in the console:
  onChange(filterOption) {
    this.filterDone = filterOption;
  }
}
