function Node({ $target, initalState, onClick, onBack }) {
  this.state = initalState;
  this.onClick = onClick;
  this.onBack = onBack;
  this.$nodes = document.createElement("ul");
  this.$nodes.className = "Nodes";
  $target.appendChild(this.$nodes);

  this.setState = (nextState) => {
    this.state.isRoot = nextState.isRoot;
    this.state.nodes = nextState.nodes;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodeTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? `./assets/file.png`
              : `./assets/directory.png`;

          return ` <div class= "Node" data-id="${node.id}"> 
                <img data-id="${node.id}" src="${iconPath}">
                <div data-id="${node.id}">${node.name}</div>
                </div>`;
        })
        .join("");

      this.$nodes.innerHTML = !this.state.isRoot
        ? `<div calss ="node" id="backArrow"><img src="./assets/prev.png"></div>${nodeTemplate}`
        : nodeTemplate;
    }

    this.$nodes.querySelectorAll(".Node").forEach(($node) => {
      $node.addEventListener("click", (e) => {
        const nodeId = e.target.dataset.id;
        if (nodeId) {
          const selectedNode = this.state.nodes.find(
            (node) => node.id === nodeId
          );

          if (selectedNode) {
            this.onClick(selectedNode);
          }
        }
        if (!nodeId) {
          console.log("g");
        }
      });
    });

    this.backArrow = document.querySelector("#backArrow");

    this.backArrow ? this.backArrow.addEventListener("click", this.onBack) : "";
  };

  this.render();
}

export default Node;
