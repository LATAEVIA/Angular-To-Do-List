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
    var TaskListComponent, AppComponent, Task;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TaskListComponent = (function () {
                function TaskListComponent() {
                }
                TaskListComponent.prototype.taskClicked = function (clickedTask) {
                    console.log(clickedTask);
                };
                TaskListComponent = __decorate([
                    core_1.Component({
                        selector: 'task-list',
                        inputs: ['taskList'],
                        template: "\n  <h3 *ngFor=\"#currentTask of taskList\" (click)=\"taskClicked(currentTask)\"> <!--4iterated and printed it? -->\n    {{ currentTask.description }}\n  </h3>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], TaskListComponent);
                return TaskListComponent;
            }());
            exports_1("TaskListComponent", TaskListComponent);
            AppComponent = (function () {
                function AppComponent() {
                    this.tasks = [
                        new Task("Create To-Do List app.", 0),
                        new Task("Learn Kung Fu.", 1),
                        new Task("Rewatch all the Lord of the Rings movies.", 2),
                        new Task("Do the laundry.", 3)
                    ];
                }
                AppComponent.prototype.taskWasSelected = function (clickedTask) {
                    console.log(clickedTask);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [TaskListComponent],
                        template: "\n    <div class=\"container\">\n      <h1>To-Do List</h1>\n      <task-list [taskList]=\"tasks\"></task-list> <!--2populated it? created here-->\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            Task = (function () {
                function Task(description, id) {
                    this.description = description;
                    this.id = id;
                    this.done = false;
                }
                return Task;
            }());
            exports_1("Task", Task);
        }
    }
});
//# sourceMappingURL=childProperty.js.map