import {Component,  EventEmitter} from 'angular2/core';
import {Task} from './task.model';

//We have all our naming conventions lined up: NewTaskComponent is our component class, new-task is our HTML tag, and the file name is new-task.component.ts. We know it's a component, and it's going to be creating tasks, so we import Component and Task. We're ready.
@Component({
  selector: 'new-task',
  outputs: ['onSubmitNewTask'],
  template:
  //Now, we need to display a form in the NewTaskComponent template. Let's use the same classes that we used earlier for the EditTaskDetailsComponent. Then, we'll need a text input for the new description, and a button to trigger a method on click which should create the new task. We'll also give the input field a placeholder of "Description" - this is just a text hint to a user for what to type there.
  //We don't really need two-way binding because there is not an existing value to edit.Instead, we can use the # symbol in the <input> tag to create a new local variable to hold the value of that form element.
  //And now we can use the variable newDescription as an argument when we call addTask on click.
  `
  <div class="task-form">
    <h3>Create Task:</h3>
    <input placeholder="Description" class="col-sm-8 input-lg" #newDescription>
    <button (click)="addTask(newDescription)" class="btn-success btn-lg add-button">Add</button>
  </div>
  `
})

//Next step - our NewTaskComponent needs to send an output when the form is submitted. So, let's import the EventEmitter, create an output for it called onSubmitNewTask and then instantiate the event emitter in the constructor of our class declaration.
//Notice that we have setup the Event Emitter to send a Task object, since we are creating a new task with this component.
//Notice that we are not getting a string, even though our input type is "text". We are receiving the entire HTML element. This has some benefits actually - we get the actual user input out by using the value property, and then we can also use this property to clear the field after the user clicks the button.
//Next we have to actually create a new task with the information from the form and send it to the task list parent component with the event emitter. We can do that with the new keyword since we imported the Task model declaration. It would look like this:
export class NewTaskComponent {
  public onSubmitNewTask: EventEmitter<String>;
  constructor(){
    this.onSubmitNewTask = new EventEmitter();
  }
  addTask(userDescription: HTMLInputElement){
    this.onSubmitNewTask.emit(userDescription.value);
    userDescription.value = "";
  }
}
