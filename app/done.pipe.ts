import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from './task.model';

@Pipe({
  name: "done",
  pure: false
})

export class DonePipe implements PipeTransform {
  transform(input: Task[], args) {
    var desiredDoneState = args[0];
    if(desiredDoneState === "done") {
      return input.filter((task) => {
        return task.done;
      });
    } else if (desiredDoneState === "notDone") {
      return input.filter((task) => {
        return !task.done;
      });
    } else {
      return input;
    }
  }
}

// //Notice that our class definition also includes implements PipeTransform before the curly brackets. PipeTransform is an interface definition inside of Angular Core.
// //We are using the JavaScript filter array method to return only the tasks in the array that we want. We pass filter a callback function. The callback function says "test each thing in the array that we are filtering by putting it into a temporary variable called task. If the callback function returns true, then the current task is kept in the array.
// export class DonePipe implements PipeTransform {
//   transform(input: Task[], args) {
//     var desiredDoneState = args[0];
//     if(desiredDoneState === "done") {
//       return input.filter(function(task) {
//         return task.done;
//       });
//     } else if (desiredDoneState === "notDone") {
//       return input.filter(function(task) {
//         return !task.done;
//       });
//     } else {
//       return input;
//     }
//   }
// }
