
document.getElementById("recover").onclick = function() {
  this.style.visibility = "hidden";
  control.object.scale.z = 2;
  camera.position.set(50.06421484100598, 219.95842897735875, -33.78512665221608);
};

function addKeyboardEvent() {
  document.onkeydown = function(event) {
    var choice = ghostdirection(event.key);
    if (choice == "↑" || choice == "↓" || choice == "←" || choice == "→") {
      document.getElementById("answer1").style.visibility = "hidden";
      document.getElementById("answer2").style.visibility = "hidden";
      document.getElementById("answer3").style.visibility = "hidden";
      ghostmove(choice);
      document.getElementById("num").innerHTML = step.length;
    }
  };
}
addKeyboardEvent();
function ghostdirection(eventkey) {
  var x = camera.position.x;
  var z = camera.position.z;
  var choice;
  var choiceArray = ["↑", "←", "↓", "→"];
  if (z < 100 - x) {
    if (z > x) {
      choiceArray = ["→", "↑", "←", "↓"];
    } else {
      choiceArray = ["↓", "→", "↑", "←"];
    }
  } else {
    if (z > x) {
      choiceArray = ["↑", "←", "↓", "→"];
    } else {
      choiceArray = ["←", "↓", "→", "↑"];
    }
  }
  switch (eventkey) {
    case "w":
      choice = choiceArray[0];
      break;
    case "a":
      choice = choiceArray[1];
      break;
    case "s":
      choice = choiceArray[2];
      break;
    case "d":
      choice = choiceArray[3];
      break;
  }
  return choice;
}

function checkdesall() {
  if (descube.checkdes()) {
    document.getElementById("recover").style.visibility = "hidden";
    ghost = null;
    setTimeout(function() {
      swal('Congratulations!', 'The final steps are ' + step.length + " step", 'success');
      
      scene.visible = false;
      // document.body.style.backgroundImage = "url(img/success.jpg)";
      // document.getElementById("wasd").style.display = "none";
    }, 1000);
  }
}

function ghostmove(choice) {
  switch (choice) {
    case "↑":
      ghost.cube.rotation.z = Math.PI;
      if (ghost.isavailable("w")) {
        step.push(choice); 
        move(ghost.cube, "↑"); //Gerakan karakter
        cubes[ghost.row][ghost.column].state = 0;
        var state = cubes[ghost.row - 1][ghost.column].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row - 1][ghost.column].cube;
          move(box, "↑"); 
          cubes[ghost.row - 2][ghost.column].state = 2; 
          cubes[ghost.row - 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row - 2, ghost.column)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row - 1][ghost.column].state = 3; 
        ghost.row -= 1;
        checkdesall();
      }
      break;
    case "↓":
      ghost.cube.rotation.z = 0;
      if (ghost.isavailable("s")) {
        step.push(choice); 
        move(ghost.cube, "↓"); 
        cubes[ghost.row][ghost.column].state = 0;     
        var state = cubes[ghost.row + 1][ghost.column].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row + 1][ghost.column].cube;
          move(box, "↓"); 
          cubes[ghost.row + 2][ghost.column].state = 2; 
          cubes[ghost.row + 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row + 2, ghost.column)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row + 1][ghost.column].state = 3; 
        ghost.row += 1;
        checkdesall();
      }
      break;
    case "←":
      ghost.cube.rotation.z = -Math.PI / 2;
      if (ghost.isavailable("a")) {
        step.push(choice);
        move(ghost.cube, "←");
        cubes[ghost.row][ghost.column].state = 0; 
        var state = cubes[ghost.row][ghost.column - 1].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row][ghost.column - 1].cube;
          move(box, "←");
          cubes[ghost.row][ghost.column - 2].state = 2; 
          cubes[ghost.row][ghost.column - 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column - 2)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row][ghost.column - 1].state = 3;
        ghost.column -= 1; 
        checkdesall();
      }
      break;
    case "→":
      ghost.cube.rotation.z = Math.PI / 2;
      if (ghost.isavailable("d")) {
        step.push(choice); 
        move(ghost.cube, "→"); 
        cubes[ghost.row][ghost.column].state = 0; 
        var state = cubes[ghost.row][ghost.column + 1].state;
        if (state == 2) {
          stepflag.push(true);
          var box = cubes[ghost.row][ghost.column + 1].cube;
          move(box, "→"); 
          cubes[ghost.row][ghost.column + 2].state = 2; 
          cubes[ghost.row][ghost.column + 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column + 2)) {
            setTimeout(function() {
              box.scale.set(0.5, 0.5, 0.5);
            }, 500);
          } else {
            setTimeout(function() {
              box.scale.set(1, 1, 1);
            }, 500);
          }
        } else {
          stepflag.push(false);
        }
        cubes[ghost.row][ghost.column + 1].state = 3; 
        ghost.column += 1;
        checkdesall();
      }
      break;
    default:
      break;
  }
}

function initmap(arr) {
  if (arr.length == 100) {
    for (var i = 0; i < arr.length; i++) { 
      arr[i] = parseInt(arr[i]);
    }
    for (var i = 0; i < scene.children.length; i++) {
      if (scene.children[i] && scene.children[i].type == "Mesh") {
        scene.remove(scene.children[i]);
        i--;
      }
    }
    step = [];
    stepflag = []; 
    temparray = arr; 
    initcube(temparray); 
    document.getElementById("num").innerHTML = step.length;
  } else {
    swal('Map file format error', 'Please read in the correct map file', 'error');
  }
}

document.getElementById("map").onclick = function() {
  document.getElementById("mapfile").click();
};
document.getElementById("mapfile").onchange = function() {
  levelID=0;
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var file = this.files[0]; 
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var arrstr = this.result;
    var arr = arrstr.split(",");
    initmap(arr);
  };
};

function initstep(arr) {
  step = [];
  stepflag = [];
  try {
    var i = 0;
    draw = setInterval(function() {
      if (i == arr.length) {
        clearInterval(draw);
        addKeyboardEvent();
        if (!descube.checkdes()) {
          document.getElementById("recover").style.visibility = "hidden";
          ghost = null;
          setTimeout(function() {
            swal('fail!', 'Failed to clear the level, please read the correct answer file', 'error');
            
            scene.visible = false;
            document.getElementById("wasd").style.display = "none";
            document.getElementById("refresh").click();
          }, 1000);
        }
      }
      ghostmove(arr[i]);
      document.getElementById("num").innerHTML = step.length;
      i++;
    }, 1000);
  } catch (e) {
    swal('Answer file format error', 'Please read in the correct answer file', 'error');
  }
}

document.getElementById("answer").onclick = function() {
  document.getElementById("answerfile").click();
};
document.getElementById("answerfile").onchange = function() {
  var file = this.files[0]; 
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var arrstr = this.result;
    var arr = arrstr.split(",");
    if (!["↑", "←", "↓", "→"].includes(arr[0])) {
      swal('Answer file format error', 'Please read in the correct answer file', 'error');
    } else {
      document.onkeydown = "";
      initstep(arr);
    }
  }
};

document.getElementById("back").onclick = function() {
  addKeyboardEvent();
  clearInterval(draw);
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  
  var laststep = step.pop();
  var lastflag = stepflag.pop();
  if (laststep) {
    document.getElementById("num").innerHTML = step.length;
    switch (laststep) {
      case "↑":
        ghostmove("↓");
        step.pop();
        stepflag.pop(); 
        if (lastflag) {
          var state = cubes[ghost.row - 2][ghost.column].state;
          if (state == 2) {
            var box = cubes[ghost.row - 2][ghost.column].cube;
            move(box, "↓"); 
            cubes[ghost.row - 2][ghost.column].state = 0;
            cubes[ghost.row - 1][ghost.column].state = 2; 
            cubes[ghost.row - 1][ghost.column].cube = box;
            if (descube.checkcube(ghost.row - 1, ghost.column)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
      case "↓":
        ghostmove("↑");
        step.pop();
        stepflag.pop();
        if (lastflag) {
          var state = cubes[ghost.row + 2][ghost.column].state;
          if (state == 2) {
            var box = cubes[ghost.row + 2][ghost.column].cube;
            move(box, "↑"); 
            cubes[ghost.row + 2][ghost.column].state = 0;
            cubes[ghost.row + 1][ghost.column].state = 2;
            cubes[ghost.row + 1][ghost.column].cube = box;
            if (descube.checkcube(ghost.row + 1, ghost.column)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
      case "←":
        ghostmove("→");
        step.pop();
        stepflag.pop();
        if (lastflag) {
          var state = cubes[ghost.row][ghost.column - 2].state;
          if (state == 2) {
            var box = cubes[ghost.row][ghost.column - 2].cube;
            move(box, "→");
            cubes[ghost.row][ghost.column - 2].state = 0;
            cubes[ghost.row][ghost.column - 1].state = 2; 
            cubes[ghost.row][ghost.column - 1].cube = box;
            if (descube.checkcube(ghost.row, ghost.column - 1)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
      case "→":
        ghostmove("←");
        step.pop();
        stepflag.pop(); 
        if (lastflag) {
          var state = cubes[ghost.row][ghost.column + 2].state;
          if (state == 2) {
            var box = cubes[ghost.row][ghost.column + 2].cube;
            move(box, "←"); 
            cubes[ghost.row][ghost.column + 2].state = 0;
            cubes[ghost.row][ghost.column + 1].state = 2; 
            cubes[ghost.row][ghost.column + 1].cube = box;
            if (descube.checkcube(ghost.row, ghost.column + 1)) {
              box.scale.set(0.5, 0.5, 0.5);
            } else {
              box.scale.set(1, 1, 1);
            }
          }
        }
        break;
    }
  } else {
    alert("It's over!");
  }
};

document.getElementById("refresh").onclick = function() {
  clearInterval(draw); 
  if (levelID) {
    var answerstr = "answer" + levelID;
    document.getElementById(answerstr).style.visibility = "visible";
  }
  for (var i = 0; i < scene.children.length; i++) {
    if (scene.children[i] && scene.children[i].type == "Mesh") {
      scene.remove(scene.children[i]);
      i--;
    }
  }
  step = [];
  stepflag = []; 
  initcube(temparray); 
  document.getElementById("num").innerHTML = step.length; 
};

document.getElementById("maid1").onclick = function() {
  clearInterval(draw); 
  levelID = 1;
  document.getElementById("answer1").style.visibility = "visible";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 0, 2, 4, 1, 0, 0, 1, 4, 0, 2, 3, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  initmap(arr);
};
document.getElementById("maid2").onclick = function() {
  clearInterval(draw); 
  levelID = 2;
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "visible";
  document.getElementById("answer3").style.visibility = "hidden";
  var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 4, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  initmap(arr);
};
document.getElementById("maid3").onclick = function() {
  clearInterval(draw);
  levelID = 3;
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "visible";
  var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 2, 0, 0, 4, 1, 1, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 1, 1, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  initmap(arr);
};
document.getElementById("answer1").onclick = function() {
  document.onkeydown = "";
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arrstr = "↓,↑,←,←,→,↑,↑,↓,→,→";
  temparray = arrstr.split(",");
  initstep(temparray);
};
document.getElementById("answer2").onclick = function() {
  document.onkeydown = "";
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arrstr = "→,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,↑,↓,←,←,←,←,↑,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,←,←,←,←,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→";
  temparray = arrstr.split(",");
  initstep(temparray);
};
document.getElementById("answer3").onclick = function() {
  document.onkeydown = "";
  document.getElementById("answer1").style.visibility = "hidden";
  document.getElementById("answer2").style.visibility = "hidden";
  document.getElementById("answer3").style.visibility = "hidden";
  var arrstr = "↑,↑,↓,↓,→,→,↑,←,↑,←,↑,↑,→,→,↓,↑,←,←,←,↓,←,↓,↓,→,↑,↑,↑,↓,↓,↓,↓,→,↑,↑,↑,←,↑,→";
  temparray = arrstr.split(",");
  initstep(temparray);
};