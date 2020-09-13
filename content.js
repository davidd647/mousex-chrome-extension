var mouseX = {
  getScreenSize() {
    this.screenWidth = $("body").width();
    this.screenHeight = $("body").height();
  },
  getWindowSize() {},
  init() {
    console.log("init...2");

    this.body = document.querySelector("body");

    var newDiv = document.createElement("div");
    newDiv.style.cssText =
      "width:10px;height:10px;background:red;position:absolute;left:0;top:0;";
    newDiv.innerHTML = "hi";

    this.body.appendChild(newDiv);
  },
};

mouseX.init();
