window.onload = function () {
  var mouseX = {
    dirUpActive: false,
    dirDownActive: false,
    dirLeftActive: false,
    dirRightActive: false,

    clientSpeedX: 0,
    clientSpeedY: 0,
    speedIncrements: 0.1,

    clientX: 0,
    clientY: 0,

    newDiv: document.createElement("div"),

    getScreenSize() {
      this.screenWidth = this.body.height;
      this.screenHeight = this.body.height;
    },
    getWindowSize() {},
    handleKeyDown(e) {
      if (e.keyCode === 87 || e.keyCode === 38) {
        this.dirUpActive = true;
      }
      if (e.keyCode === 83 || e.keyCode === 40) {
        this.dirDownActive = true;
      }
      if (e.keyCode === 65 || e.keyCode === 37) {
        this.dirLeftActive = true;
      }
      if (e.keyCode === 68 || e.keyCode === 39) {
        this.dirRightActive = true;
      }
    },
    handleKeyUp(e) {
      if (e.keyCode === 87 || e.keyCode === 38) {
        this.dirUpActive = false;
      }
      if (e.keyCode === 83 || e.keyCode === 40) {
        this.dirDownActive = false;
      }
      if (e.keyCode === 65 || e.keyCode === 37) {
        this.dirLeftActive = false;
      }
      if (e.keyCode === 68 || e.keyCode === 39) {
        this.dirRightActive = false;
      }
    },
    addEventListeners() {
      var plugin = this;

      document.addEventListener("keydown", function (e) {
        plugin.handleKeyDown(e);
      });

      document.addEventListener("keyup", function (e) {
        plugin.handleKeyUp(e);
      });
    },
    accelerateUp() {
      this.clientSpeedY -= this.speedIncrements;
    },
    accelerateDown() {
      this.clientSpeedY += this.speedIncrements;
    },
    accelerateLeft() {
      this.clientSpeedX -= this.speedIncrements;
    },
    accelerateRight() {
      this.clientSpeedX += this.speedIncrements;
    },
    mainLoop(plugin) {
      if (plugin.dirUpActive) {
        plugin.accelerateUp();
      }
      if (plugin.dirDownActive) {
        plugin.accelerateDown();
      }
      if (plugin.dirLeftActive) {
        plugin.accelerateLeft();
      }
      if (plugin.dirRightActive) {
        plugin.accelerateRight();
      }

      plugin.clientX += plugin.clientSpeedX;
      plugin.clientY += plugin.clientSpeedY;

      plugin.newDiv.style.left = plugin.clientX;
      plugin.newDiv.style.top = plugin.clientY;
    },
    init() {
      var body = document.querySelector("body");

      this.newDiv = document.createElement("div");
      this.newDiv.style.cssText =
        "width:10px;height:10px;background:red;position:absolute;left:0;top:0;";
      this.newDiv.innerHTML = "hi";

      body.appendChild(this.newDiv);

      this.addEventListeners();

      var plugin = this;

      this.mainLoopToggler = setInterval(() => {
        this.mainLoop(plugin);
      }, 10);
    },
  };

  mouseX.init();
};
