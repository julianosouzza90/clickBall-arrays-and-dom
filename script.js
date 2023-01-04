class Draw {
  constructor() {
    this.rootEl = document.querySelector('.root');
    this.drawing = [];
    this.redo = [];
    this.xCoordinate = 0;
    this.yCoordinate = 0;

    this.initializeEvents();
  }


  initializeEvents() {

    document.addEventListener('click', (event) => {
      if (event.button === 0) {
        this.xCoordinate = event.pageX;
        this.yCoordinate = event.pageY;
      }
      this.redo = [];
      this.drawing.push(this.setDrawing())
      this.render();
    });

    document.addEventListener("keypress", event => {

      const { ctrlKey, key } = event;
      if (ctrlKey && key == 'z') {
        this.undo();
      }
      if (ctrlKey && key == 'y') {
        this.reDo();
      }
    })
  }

  setDrawing() {
    const div = document.createElement('div');
    div.style.background = this.getRandomColor();
    div.style.left = `${this.xCoordinate - 15}px`;
    div.style.top = `${this.yCoordinate - 25}px`
    div.style.bottom = `${this.yCoordinate - 25}px`
    div.style.right = `${this.xCoordinate - 25}px`

    return div;
  }
  reDo() {
    if (this.redo.length > 0) {
      this.drawing.push(this.redo[this.redo.length - 1]);
      this.redo.pop();
      this.render()
    }
  }
  undo() {

    if (this.drawing.length > 0) {
      this.redo.push(this.drawing.pop());
      this.rootEl.innerHTML = "";
      this.render();
    }
  }

  render() {
    this.drawing.forEach(dw => {
      this.rootEl.appendChild(dw)
    })
  }

  getRandomColor() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    return colors[Math.round((Math.random() * 5))];
  }

}
new Draw();
