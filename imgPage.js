function ImgPage({ $target, initialState }) {
  this.state = initialState;

  this.$page = document.createElement("div");
  this.$page.className = "Modal ImageView";
  $target.appendChild(this.$page);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$page.innerHTML = `
    <divclass - "content">
    
    ${
      this.state
        ? `<img src ="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public${this.state}">`
        : ""
    } 
    </div>`;

    this.$page.style.display = this.state ? "block" : "none";
  };
  this.render();
}

export default ImgPage;
