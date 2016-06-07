import { Component } from 'angular2/core';
import { Task } from './task.model';

//Let's implement our checkboxes next, so that we can actually change a task from "not done" to "done" and back. Since "done" is a property of a task, let's jump over to the component responsible for manipulating a single task: task.component.ts. We'll change its template to display a checkbox, and we'll hook its click event up to a method in the component class definition.
@Component({
    selector: 'task-display',
    inputs: ['task'],
  template: `
  <div>
    <input *ngIf="task.done" type="checkbox" checked (click)="toggleDone(false)"/>
    <input *ngIf="!task.done" type="checkbox" (click)="toggleDone(true)"/>
    <label>{{ task.description }}</label>
  </div>
  `
})

//We've declared a method toggleDone which takes one boolean parameter called setState. Then, we set the task's "done" property equal to true or false, whatever is passed into the method. Remember that task is the input defined on this component. When we instantiate the list of tasks in the parent using *ngFor we are passing the current task in the loop into this task input on the TaskComponent.
//Then, notice that there are two checkboxes in our template. But we're using the *ngIf directive to only show one at a time. If the task is done, then toggleDone should set it to false when the checkbox is clicked. But if the task is not done then when we click the checkbox it should set the task's done property to true when clicked. Incidentally, in our *ngIf directive, when we say !task.done it is the same thing as writing task.done === false. We are also setting the checkbox's state with *ngIf. If the task is done, the checkbox should already have the "checked" attribute to show us that it is done, and allow us to uncheck it to mark it "not done". Let's try it out!
//We are defaulting to show "not done" tasks. Try clicking a checkbox to mark the task done, and it comes right out of the "not done" set. Change the menu to show "done" tasks, and there it is! We did it! We can also select "Show All" to show each task regardless of its "done" state.
export class TaskComponent {
  public task: Task;
  toggleDone(setState: boolean){
    this.task.done = setState;
  }
}
