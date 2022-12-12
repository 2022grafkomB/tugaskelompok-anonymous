
var cubes = new Array();
var desCubes = new Array(); 
var ghost;
var descube; 
var step = []; 
var stepflag = [];
var temparray;


var textureloader = THREE.ImageUtils;
var render;
var camera;
var scene;
var light;


var stats;
var control;


var eventID;
var levelID=1;
var draw;


if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      
      var len = o.length >>> 0;

      
      if (len === 0) {
        return false;
      }

      
      
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}