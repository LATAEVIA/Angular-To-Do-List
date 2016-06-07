System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ThingComponent, ParentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ThingComponent = (function () {
                function ThingComponent() {
                    this.thingEmitter = new core_1.EventEmitter(); //3_1.Then we need to actually create the event emitter object by importing it and creating a property for it, initializing it in the constructor.
                }
                ThingComponent.prototype.thingTriggered = function (thing) {
                    this.thingEmitter.emit(thing);
                };
                ThingComponent = __decorate([
                    core_1.Component({
                        //1.Create the child component's @Component decorator and Controller class.
                        selector: 'thing',
                        inputs: ['thing'],
                        //2.If the component needs to receive data from a parent component, define an input for it
                        outputs: ['thingEmitter'],
                        //3.If the child component is going to emit any custom events, we need to define them using the outputs: key in the @Component decorator.
                        //<!--3_2.Finally, we trigger the event to be sent at the correct time sending the event from a child component's method. We can trigger the method by using a built in emitter like (click).-->
                        template: "\n    <h3 (click)=\"thingTriggered()\">Click me to emit a thing.</h3>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ThingComponent);
                return ThingComponent;
            }());
            exports_1("ThingComponent", ThingComponent);
            //inally, we load the c hild component in the parent component by doing two things.
            //Remember that square brackets on the left are connecting an input, and regular parenthesis are connecting an output.
            ParentComponent = (function () {
                function ParentComponent() {
                    this.parentThing = "hello";
                }
                ParentComponent.prototype.childEventReceived = function (childThing) {
                    console.log('here is the thing passed up from the child event emitter', childThing);
                };
                ParentComponent = __decorate([
                    core_1.Component({
                        selector: 'parent',
                        directives: [ThingComponent],
                        template: "\n  <thing\n    ['thing']=\"parentThing\"\n    (thingEmitter)=\"childEventReceived($event)\">\n  </thing>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ParentComponent);
                return ParentComponent;
            }());
            exports_1("ParentComponent", ParentComponent);
        }
    }
});
//# sourceMappingURL=makeChildComponent.js.map