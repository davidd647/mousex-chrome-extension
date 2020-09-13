var mouseX = {
  init: function () {
    console.log("init...");
    var body = document.querySelector("body");
    var newDiv = document.createElement("div");
    newDiv.style.cssText = "width:10px;height:10px;background:red";
    newDiv.innerHTML = "hi";
    body.appendChild(newDiv);

    console.log("init function!");
  },
};

mouseX.init();
