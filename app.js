import Breadcrumb from "./Breadcrumb.js";
import Node from "./node.js";
import { request } from "./api.js";
import ImgPage from "./imgPage.js";
import LoadingPage from "./loadingPage.js";
import { loadingFuntion } from "./loadingFuntion.js";

function App({ $target }) {
  this.state = {
    isRoot: false,
    depth: [],
    nodes: [],
    imgstate: null,
    isLoading: false,
  };
  this.loadingFuntion = loadingFuntion;
  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    node.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imgPage.setState(this.state.imgstate);
    loadingPage.setState(this.state.isLoading);
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initalState: this.state.depth,
    onBackRoot: async () => {
      try {
        this.loadingFuntion(true);
        const rootNodes = await request();

        this.setState({
          ...this.state,
          isRoot: true,
          depth: [],
          nodes: rootNodes,
        });
      } catch (e) {
        alert("onBackRoot 불러오지 못했어요");
      } finally {
        this.loadingFuntion(false);
      }
    },
  });

  const node = new Node({
    $target,
    initalState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      try {
        this.loadingFuntion(true);

        if (node.type === "DIRECTORY") {
          this.state.isRoot = false;
          const nextNodes = await request(`${node.id}`);

          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            imgstate: node.filePath,
          });
        }
      } catch (e) {
        alert("onClick 불러오지 못했어요");
      } finally {
        this.loadingFuntion(false);
      }
    },
    onBack: async () => {
      try {
        this.loadingFuntion(true);
        const nextState = { ...this.state };

        nextState.depth.pop();

        const prevId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        if (prevId === null) {
          const backRoot = await request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: backRoot,
          });
        } else if (prevId) {
          const backId = await request(`${prevId}`);
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: backId,
          });
        }
      } catch (e) {
        alert("onBack 불러오지 못했어요");
      } finally {
        this.loadingFuntion(false);
      }
    },
  });

  const imgPage = new ImgPage({ $target, initialState: this.state.imgstate });

  const loadingPage = new LoadingPage({
    $target,
    initalState: this.state.isLoading,
  });

  const apiList = async () => {
    try {
      this.loadingFuntion(true);

      const rootNodes = await request();

      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      alert("apiList  불러오지 못했어요");
    } finally {
      this.loadingFuntion(false);
    }
  };
  apiList();
}

export default App;
