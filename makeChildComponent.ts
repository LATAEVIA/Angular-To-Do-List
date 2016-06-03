import { Component, EventEmitter } from 'angular2/core';

@Component({
  //1.Create the child component's @Component decorator and Controller class.
  selector: 'thing',
  inputs: ['thing'],
  //2.If the component needs to receive data from a parent component, define an input for it
  outputs: ['thingEmitter'],
  //3.If the child component is going to emit any custom events, we need to define them using the outputs: key in the @Component decorator.
  //<!--3_2.Finally, we trigger the event to be sent at the correct time sending the event from a child component's method. We can trigger the method by using a built in emitter like (click).-->
  template: `
    <h3 (click)="thingTriggered()">Click me to emit a thing.</h3>
  `
})
export class ThingComponent {
  public thing: string;
  //2_1.and an accompanying property to store the input in:
  public thingEmitter: EventEmitter<string>;
  constructor() {
    this.thingEmitter = new EventEmitter();//3_1.Then we need to actually create the event emitter object by importing it and creating a property for it, initializing it in the constructor.
  }
  thingTriggered(thing) {//added the parameter "thing"...wasn't in the lesson
    this.thingEmitter.emit(thing);
  }
}

//inally, we load the c hild component in the parent component by doing two things.
//Remember that square brackets on the left are connecting an input, and regular parenthesis are connecting an output.
@Component({
  selector: 'parent',
  directives: [ThingComponent],//We tell the parent component that the child component exists by including it in the directives array in the @Component decorator.
  template: `
  <thing
    ['thing']="parentThing"
    (thingEmitter)="childEventReceived($event)">
  </thing>
  `
})//Then we use the child component's selector in the parent template, setting its inputs and outputs when we use the selector tag to instantiate the component.

export class ParentComponent {
  public parentThing: string = "hello";
  childEventReceived(childThing): void {
    console.log('here is the thing passed up from the child event emitter', childThing);
  }
}
