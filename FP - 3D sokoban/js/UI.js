document.getElementById("cover").onmousedown = function() {
  playAudio("select");
  playAudio("bgm");

  this.style.display = "none";
  control.autoRotate = false;
  // document.getElementById("cover2").style.display = "block";
  // eventID = setInterval(function() {
  //   cameraFocusing();
  // }, 10);

  document.getElementById("recover").style.visibility = "visible";  //
};
// document.body.addEventListener("wheel", function() {
  // document.getElementById("recover").style.visibility = "visible";
// });
// document.getElementById("cover2").addEventListener("wheel", function() {
//   this.style.display = "none";
//   clearInterval(eventID);
// });
// document.getElementById("hintclose1").onclick = function() {
//   document.getElementById("cover2").style.display = "none";
//   clearInterval(eventID);
// };