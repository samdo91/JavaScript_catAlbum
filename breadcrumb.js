function Breadcrumb({ $target, initalState, onBackRoot }) {
  this.state = initalState;
  this.onBackRoot = onBackRoot;
  this.$nav = document.createElement("nav");
  this.$nav.className = "Breadcrumb";
  $target.appendChild(this.$nav);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$nav.innerHTML = `<div class ="nav-item">root</div> ${this.state
      .map(
        (node, index) =>
          `<div class="nav-item" date-index="${index}">${node.name}<div>`
      )
      .join("")}
    `;
    this.backRoot = this.$nav.querySelector(".nav-item");
    this.backRoot.addEventListener("click", this.onBackRoot);
  };

  this.render();
}

export default Breadcrumb;
