function move(obj, opt) {
    var mover;
    switch (opt) {
        case "↑":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.z -= .2;
                    count++;
                }
            }, 5);
            break;
        case "↓":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.z += .2;
                    count++;
                }
            }, 5);
            break;
        case "←":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.x -= .2;
                    count++;
                }
            }, 5);
            break;
        case "→":
            if (mover) {
                clearInterval(mover);
            }
            var count = 0;
            mover = setInterval(function() {
                if (count == 50) {
                    clearInterval(mover);
                } else {
                    obj.position.x += .2;
                    count++;
                }
            }, 5);
            break;
        default:
            return;
    }
    renderer.render(scene, camera);
}
var cameracount=99;
function cameraFocusing() {
    if(cameracount>0){
      control.object.scale.z+=.01;
      cameracount--;
    }
    else{
      control.object.scale.z-=.01;
      cameracount--;
      if(cameracount<(-99)){
        cameracount=99;
      }
    }
}