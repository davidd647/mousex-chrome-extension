window.onload = function () {
  var mouseX = {
    getScreenSize() {
      this.screenWidth = this.body.height;
      this.screenHeight = this.body.height;
    },
    getWindowSize() {},
    addEventListeners() {
      console.log("this.body");
      console.log(this.body);
      document.addEventListener("keydown", function (e) {
        console.log(e.keyCode);
      });
    },
    init() {
      console.log("init...2");

      this.body = document.querySelector("body");

      var newDiv = document.createElement("div");
      newDiv.style.cssText =
        "width:10px;height:10px;background:red;position:absolute;left:0;top:0;";
      newDiv.innerHTML = "hi";

      this.body.appendChild(newDiv);

      this.addEventListeners();
    },
  };

  mouseX.init();
};
