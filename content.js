window.onload = function () {
  var mouseX = {
    stabilizeActive: false,
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

    mouseXActive: false,

    getScreenSize() {
      this.screenWidth = this.body.height;
      this.screenHeight = this.body.height;
    },
    getWindowSize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
    handleKeyDown(e) {
      // cmd = 91, ctrl = 17
      if (e.keyCode === 91 || e.keyCode === 17) {
        this.commandKey = true;
      }

      if (e.keyCode === 88 && this.commandKey) {
        if (!this.mouseXActive) {
          console.log("activating MouseX");
          this.mouseXActive = true;
          this.clientSpeedX = 0;
          this.clientSpeedY = 0;
          var plugin = this;

          this.mainLoopToggler = setInterval(() => {
            this.mainLoop(plugin);
          }, 10);
        } else {
          console.log("deactivating MouseX");
          this.mouseXActive = false;

          clearInterval(this.mainLoopToggler);
          this.mainLoopToggler = null;
        }
      }

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
      if (e.keyCode === 81) {
        this.stabilizeActive = true;
      }

      // e = 69 //simulate click
      // if (e.keyCode === 69) {
      //   var element = document.elementFromPoint(
      //     this.clientX,
      //     this.clientY - this.scrollTop
      //   );
      //   console.log("click!");
      //   console.log(this.clientX, this.clientY);
      //   console.log($(element));
      //   if ($(element).is("textarea, input")) {
      //     $(element).focus();
      //   } else {
      //     // disable scrolling based on rocket position
      //     this.clientY = null;
      //     $(element)[0].click();
      //     // reinstate rocket position
      //     this.clientY = this.scrollTop;
      //   }
      // }
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
      if (e.keyCode === 81) {
        this.stabilizeActive = false;
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
    stabilize() {
      // stabilize x-axis
      if (this.clientSpeedX > 0) {
        this.clientSpeedX -= this.speedIncrements;
      } else if (this.clientSpeedX < 0) {
        this.clientSpeedX += this.speedIncrements;
      }

      // stabilize y-axis
      if (this.clientSpeedY > 0) {
        this.clientSpeedY -= this.speedIncrements;
      } else if (this.clientSpeedY < 0) {
        this.clientSpeedY += this.speedIncrements;
      }

      // stabilize to exactly zero if very close
      if (
        Math.abs(this.clientSpeedX) <= 1 &&
        Math.abs(this.clientSpeedY) <= 1
      ) {
        this.clientSpeedX = 0;
        this.clientSpeedY = 0;
      }
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
      if (plugin.stabilizeActive) {
        this.stabilize();
      }
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
    },
  };

  mouseX.init();
};
