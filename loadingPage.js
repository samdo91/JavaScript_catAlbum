function LoadingPage({ $target, initalState }) {
  this.state = initalState;
  this.$page = document.createElement("div");
  this.$page.className = "Loading Modal";

  $target.appendChild(this.$page);

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$page.innerHTML = `<div class="content"><img src="./assets/nyan-cat.gif"></div>`;
    this.$page.style.display = this.state ? "block" : "none";
  };
  this.render();
}

export default LoadingPage;
