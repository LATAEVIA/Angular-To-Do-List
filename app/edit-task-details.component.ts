import {Component} from 'angular2/core';
import {Task} from './task.model';

@Component({
  selector: 'edit-task-details',//lower case selector to match component name but without work 'component' to recude clutter
  inputs: ['task'],
  template: //will only display
  `
  <div class="task-form">
    <h3>Edit Description: </h3>
    <input [(ngModel)]="task.description" class="col-sm-8 input-lg task-form"/>
  </div>  `
})
export class EditTaskDetailsComponent {
  public task: Task; // place holder for our controller class definition
}
