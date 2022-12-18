document.getElementById("recover").onclick = function() {
  playAudio("select");
  this.style.visibility = "hidden";
  control.object.scale.z = 2;
  camera.position.set(50.06421484100598, 219.95842897735875, -33.78512665221608);
};

function addKeyboardEvent() {
  document.onkeydown = function(event) {
    var choice = ghostdirection(event.key);
    if (choice == "↑" || choice == "↓" || choice == "←" || choice == "→") {
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

function playAudio(state) {
  let playlist = {
    success : "./audio/success.mp3",
  }
  
  let tracks = {
    success : "./audio/success.mp3",
    push: "./audio/push.mp3",
    hitwall: "./audio/hitwall.wav",
    insert: "./audio/insert.wav",
    move: moveflag? "./audio/move1.mp3" : "./audio/move2.mp3",//
    bgm: "./audio/bgm.mp3",
    select: "./audio/select.wav"
  }

  let volume = {
    success : 0.5,
    push: 0.4,
    hitwall: 0.05,
    insert: 1,
    move: 0.6,
    bgm: 0.15,
    select: 1,
  }
  
  let track = tracks[state];

  if (track == "move") {
    moveflag == !moveflag;
  }

  let music = new Audio(track);
  music.currentTime = 0;
  music.volume = volume[state];
  if (state == "bgm") {
    music.loop = true;
    console.log(music)
  }

  music.play();


}



function checkdesall() {
  if (descube.checkdes()) {
    document.getElementById("recover").style.visibility = "hidden";
    ghost = null;
    

    setTimeout(function() {

      playAudio("success");

      swal('Congratulations!', 'The final steps are ' + step.length + " step", 'success');
      
      scene.visible = false;
      // document.body.style.backgroundImage = "url(img/success.jpg)";
      // document.getElementById("wasd").style.display = "none";
    }, 1000);
  }
}

function ghostmove(choice) {
  levelStart = false;
  document.getElementById("answerdemo").style.visibility = "hidden";
  switch (choice) {
    case "↑":
      ghost.cube.rotation.y = Math.PI;
      if (ghost.isavailable("w")) {
        playAudio("move");
        step.push(choice); 
        move(ghost.cube, "↑"); //Gerakan karakter
        cubes[ghost.row][ghost.column].state = 0;
        var state = cubes[ghost.row - 1][ghost.column].state;
        if (state == 2) {
          playAudio("push");
          stepflag.push(true);
          var box = cubes[ghost.row - 1][ghost.column].cube;
          move(box, "↑"); 
          cubes[ghost.row - 2][ghost.column].state = 2; 
          cubes[ghost.row - 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row - 2, ghost.column)) {
            setTimeout(function() {
              playAudio("insert");
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
      } else {
        playAudio("hitwall");
      }
      break;
    case "↓":
      ghost.cube.rotation.y = 0;
      if (ghost.isavailable("s")) {
        playAudio("move");
        step.push(choice); 
        move(ghost.cube, "↓"); 
        cubes[ghost.row][ghost.column].state = 0;     
        var state = cubes[ghost.row + 1][ghost.column].state;
        if (state == 2) {
          playAudio("push");
          stepflag.push(true);
          var box = cubes[ghost.row + 1][ghost.column].cube;
          move(box, "↓"); 
          cubes[ghost.row + 2][ghost.column].state = 2; 
          cubes[ghost.row + 2][ghost.column].cube = box;
          if (descube.checkcube(ghost.row + 2, ghost.column)) {
            setTimeout(function() {
              playAudio("insert");
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
      } else {
        playAudio("hitwall");
      }
      break;
    case "←":
      ghost.cube.rotation.y = -Math.PI / 2;
      if (ghost.isavailable("a")) {
        playAudio("move");
        step.push(choice);
        move(ghost.cube, "←");
        cubes[ghost.row][ghost.column].state = 0; 
        var state = cubes[ghost.row][ghost.column - 1].state;
        if (state == 2) {
          playAudio("push");
          stepflag.push(true);
          var box = cubes[ghost.row][ghost.column - 1].cube;
          move(box, "←");
          cubes[ghost.row][ghost.column - 2].state = 2; 
          cubes[ghost.row][ghost.column - 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column - 2)) {
            setTimeout(function() {
              playAudio("insert");
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
      } else {
        playAudio("hitwall");
      }
      break;
    case "→":
      ghost.cube.rotation.y = Math.PI / 2;
      if (ghost.isavailable("d")) {
        playAudio("move");
        step.push(choice); 
        move(ghost.cube, "→"); 
        cubes[ghost.row][ghost.column].state = 0; 
        var state = cubes[ghost.row][ghost.column + 1].state;
        if (state == 2) {
          playAudio("push");
          stepflag.push(true);
          var box = cubes[ghost.row][ghost.column + 1].cube;
          move(box, "→"); 
          cubes[ghost.row][ghost.column + 2].state = 2; 
          cubes[ghost.row][ghost.column + 2].cube = box;
          if (descube.checkcube(ghost.row, ghost.column + 2)) {
            setTimeout(function() {
              playAudio("insert");
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
      } else {
        playAudio("hitwall");
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
    initFloor();
    document.getElementById("num").innerHTML = step.length;
  } else {
    swal('Map file format error', 'Please read in the correct map file', 'error');
  }
}

document.getElementById("map").onclick = function() {
  playAudio("select");
  document.getElementById("mapfile").click();
};
document.getElementById("mapfile").onchange = function() {
  levelID=0;
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
    }, 500);
  } catch (e) {
    swal('Answer file format error', 'Please read in the correct answer file', 'error');
  }
}

document.getElementById("answer").onclick = function() {
  playAudio("select");
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
  playAudio("select");
  addKeyboardEvent();
  clearInterval(draw);
  
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
    levelStart = true
    document.getElementById("answerdemo").style.visibility = "visible";
    alert("This is the start!");
  }
};

document.getElementById("refresh").onclick = function() {
  playAudio("select");
  clearInterval(draw); 

  levelStart = true;
  document.getElementById("answerdemo").style.visibility = "visible";

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

function openLevel(level) {
  playAudio("select");
  clearInterval(draw);
  levelID = level;

  levelStart = true;
  document.getElementById("answerdemo").style.visibility = "visible";
  document.getElementById("level-title").innerHTML = "Level " + levelID;
  document.getElementById("level-title").style.visibility = "visible";

  var arr = levels[level-1].map;
  console.log(arr);
  initmap(arr);
}

function playAnswer() {
  document.onkeydown = "";

  var arrstr = levels[levelID-1].answer;
  temparray = arrstr.split(",");
  initstep(temparray);
}

document.getElementById("levelbtn1").onclick = function() {openLevel(1);};
document.getElementById("levelbtn2").onclick = function() {openLevel(2);};
document.getElementById("levelbtn3").onclick = function() {openLevel(3);};
document.getElementById("levelbtn4").onclick = function() {openLevel(4);};
document.getElementById("levelbtn5").onclick = function() {openLevel(5);};
document.getElementById("levelbtn6").onclick = function() {openLevel(6);};
document.getElementById("levelbtn7").onclick = function() {openLevel(7);};
document.getElementById("levelbtn8").onclick = function() {openLevel(8);};
document.getElementById("levelbtn9").onclick = function() {openLevel(9);};
document.getElementById("levelbtn10").onclick = function() {openLevel(10);};

document.getElementById("answerdemo").onclick = function() {playAnswer();};

const levels = [
  {
      levelID: 1,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 
        0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 
        0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 
        0, 1, 1, 1, 2, 0, 2, 4, 1, 0, 
        0, 1, 4, 0, 2, 3, 1, 1, 1, 0, 
        0, 1, 1, 1, 1, 2, 1, 0, 0, 0, 
        0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 
        0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      answer: "↓,↑,←,←,→,↑,↑,↓,→,→",
  },
  {
      levelID: 2,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
          0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 
          0, 1, 3, 0, 0, 1, 0, 0, 0, 0, 
          0, 1, 0, 2, 2, 1, 0, 1, 1, 1, 
          0, 1, 0, 2, 0, 1, 0, 1, 4, 1, 
          0, 1, 1, 1, 0, 1, 1, 1, 4, 1, 
          0, 0, 1, 1, 0, 0, 0, 0, 4, 1, 
          0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 
          0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 
          0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      answer: "→,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,↑,↓,←,←,←,←,↑,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→,↓,→,↑,←,←,←,←,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,↓,→,↓,↓,←,←,↑,→,↓,→,↑,←,↑,→,→,→",
  },
  {
      levelID: 3,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
          0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 
          0, 0, 1, 4, 4, 1, 1, 1, 1, 0, 
          0, 1, 1, 0, 0, 4, 0, 0, 1, 0, 
          0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 
          0, 1, 0, 2, 0, 0, 4, 1, 1, 0, 
          0, 1, 0, 0, 2, 2, 0, 0, 1, 0, 
          0, 1, 1, 0, 3, 0, 0, 1, 1, 0, 
          0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      answer: "↑,↑,↓,↓,→,→,↑,←,↑,←,↑,↑,→,→,↓,↑,←,←,←,↓,←,↓,↓,→,↑,↑,↑,↓,↓,↓,↓,→,↑,↑,↑,←,↑,→"
  },
  {
      levelID: 4,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 
          0, 0, 1, 3, 0, 1, 1, 1, 0, 0, 
          0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 
          0, 1, 1, 1, 0, 1, 0, 1, 1, 0,
          0, 1, 4, 1, 0, 1, 0, 0, 1, 0, 
          0, 1, 4, 2, 0, 0, 1, 0, 1, 0, 
          0, 1, 4, 0, 0, 0, 2, 0, 1, 0, 
          0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      answer: "→,↓,→,→,↓,↓,→,↓,↓,←,←,↑,←,←,↓,←,↑,→,→,→,↓,→,→,↑,↑,←,↑,↑,←,←,↓,↓,↑,↑,→,→,↓,↓,→,↓,↓,←,←,↑,←,←,→,→,↓,←,←",
  },
  {
      levelID: 5,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 1, 1, 1, 1, 1, 1, 0,
          0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
          0, 1, 1, 1, 2, 2, 2, 0, 1, 0,
          0, 1, 3, 0, 2, 4, 4, 0, 1, 0,
          0, 1, 0, 2, 4, 4, 4, 1, 1, 0,
          0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
          0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      answer: "↓,→,→,→,↑,→,→,↑,↑,←,←,↓,↓,←,↓,←,←,↑,→,→,→,↑,↑,←,↓,↓,↑,↑,→,→,→,↓,←,↑,←,↓"
  },
  {
      levelID: 6,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
          0, 0, 0, 1, 4, 4, 1, 0, 0, 0,
          0, 0, 1, 1, 0, 4, 1, 1, 0, 0,
          0, 0, 1, 0, 0, 2, 4, 1, 0, 0,
          0, 1, 1, 0, 2, 0, 0, 1, 1, 0,
          0, 1, 0, 0, 1, 2, 2, 0, 1, 0,
          0, 1, 0, 0, 3, 0, 0, 0, 1, 0,
          0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      answer: "←,↑,↑,→,→,↑,↑,↓,←,←,↓,↓,↓,→,→,↑,↓,→,→,↑,←,↓,←,←,←,↑,↑,↑,→,→,→,↓,←,↑,←,←,↓,↓,↓,→,→,↑,↑,→,↑,←,↓,↓,↓,←,←,↑,↑,→,↑,↑,↓,↓,←,↓,↓,→,→,↑,↑,↑,↓,↓,↓,→,↑,↑",
  },
  {
      levelID: 7,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
          1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
          1, 0, 2, 2, 2, 1, 1, 0, 0, 0,
          1, 0, 0, 1, 4, 4, 1, 1, 1, 0,
          1, 1, 0, 0, 4, 4, 2, 0, 1, 0,
          0, 1, 3, 0, 0, 0, 0, 0, 1, 0,
          0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      answer: "←,↑,↑,←,↑,↑,→,→,→,↓,↓,→,↓,←,↑,↑,↑,←,←,↓,→,↑,→,↓,↓,→,↓,↓,←,←,←,↑,↑,←,↑,→,↓,↓,↓,→,→,↑,↓,←,←,↑,→,↓,→,→,→,→,↑,←,↓,←,↑,↓,←,←,↑,→,←,←,↑,↑,↑,→,→,↓,↓,↑,↑,←,←,↓,→,↑,→,↓",
  },
  {
      levelID: 8,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
          0, 1, 4, 4, 2, 4, 4, 1, 0, 0,
          0, 1, 4, 4, 1, 4, 4, 1, 0, 0,
          0, 1, 0, 2, 2, 2, 0, 1, 0, 0,
          0, 1, 0, 0, 2, 0, 0, 1, 0, 0,
          0, 1, 0, 2, 2, 2, 0, 1, 0, 0,
          0, 1, 0, 0, 1, 3, 0, 1, 0, 0,
          0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],            
      answer: "→,↑,↑,←,↑,→,↓,↓,↓,←,↑,→,↑,↑,↑,↑,←,←,←,→,→,→,←,←,←,↓,←,↓,↓,→,↑,→,→,↑,↓,↓,→,↑,↑,↓,←,←,←,↑,↓,↓,←,↓,↓,→,↑,↑,→,↑,←,↓,←,↑,↓,→,→,↑,→,→,↓,←,→,↓,↓,←,↑,↑,↑,←,←,↓,→,→,↓,→,↑,↑,←,↓,↓,←,↑,←,←,↓,↓,→,↑,↑,↑"
  },
  {
      levelID: 9,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
          0, 1, 0, 0, 0, 1, 1, 1, 1, 1,
          0, 1, 0, 1, 0, 1, 0, 0, 0, 1,
          0, 1, 0, 2, 0, 0, 0, 2, 0, 1,
          0, 1, 4, 4, 1, 2, 1, 2, 1, 1,
          0, 1, 4, 3, 2, 0, 0, 0, 1, 0,
          0, 1, 4, 4, 0, 0, 1, 1, 1, 0,
          0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      answer: "↓,→,→,↑,←,↓,←,←,↑,↑,→,↓,←,↓,→,↑,↑,←,↑,↑,↑,→,→,↓,↓,←,↓,←,↑,→,→,→,→,↑,→,→,↓,←,←,←,←,↑,↑,←,←,↓,↓,↓,→,↓,→,→,→,→,↑,↓,←,←,←,←,↑,←,↑,↑,↑,→,→,↓,↓,→,↓,↑,→,↑,→,→,↓,←,↓,↓,←,←,↑,↑,→,↑,→,↓,←,←,←,↑,↑,←,←,↓,↓,→,→,→,→,←,←,←,↓,↓,↓,←,↑,↑,↑,→,→,→,↓,↓,←,→,↑,↑,←,←,←,↓,↓,↓,→,↑,→,→,↓,←,→,↑,↑,↑,←,↑,↑,←,←,↓,↓,↓,↓,→,→,→,↑,↑,→,↑,→,→,↓,←,←,←,←,←,→,↑,↑,←,←,↓,↓,↓,↑,→,→,→,↓,↓,→,→,↑,↓,←,←,↑,↑,→,↑,→,→,↓,←,←,←,←,←,→,↑,↑,←,←,↓,↓"

  },
  {
      levelID: 10,
      map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
          0, 0, 1, 0, 0, 0, 0, 1, 1, 0,
          0, 1, 1, 4, 1, 1, 2, 0, 1, 0,
          0, 1, 0, 4, 4, 2, 0, 0, 1, 0,
          0, 1, 0, 0, 1, 2, 0, 0, 1, 0,
          0, 1, 0, 0, 3, 0, 1, 1, 1, 0,
          0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      answer: "←,←,↑,↑,→,↑,↑,→,→,→,↓,↓,←,←,→,→,↑,↑,←,←,←,↓,↓,←,↓,↓,→,→,→,↑,↓,←,←,←,↑,↑,→,↑,↑,→,→,→,↓,↓,→,↓,←,↑,↑,↑,←,←,←,↓,↓,→,→,←,←,←,↓,↓,→,→,→,↑,→,↑,←,↓,↓,←,←,←,↑,↑,→,↑,↑,→,→,→,↓,→,↓,←,←,↓,←,←,↑,↑,↓,↓,→,→,↑,↑,←,→,↓,→,→,↑,←,←"
  },
];