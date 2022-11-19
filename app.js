import Breadcrumb from "./Breadcrumb.js";
import Node from "./node.js";
import { request } from "./api.js";
import ImgPage from "./imgPage.js";
import LoadingPage from "./loadingPage.js";

function App({ $target }) {
  this.state = {
    isRoot: false,
    depth: [],
    nodes: [],
    imgstate: null,
    isLoading: false,
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initalState: this.state.depth,
    onBackRoot: async () => {
      try {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        const rootNodes = await request(
          "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/"
        );

        this.setState({
          ...this.state,
          isRoot: true,
          depth: [],
          nodes: rootNodes,
        });
      } catch (e) {
      } finally {
        this.setState({
          ...this.state,
          isLoading: false,
        });
      }
    },
  });

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

  const node = new Node({
    $target,
    initalState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      try {
        this.setState({
          ...this.state,
          isLoading: true,
        });

        if (node.type === "DIRECTORY") {
          this.state.isRoot = false;
          const nextNodes = await request(
            `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/${node.id}`
          );

          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else if (node.type === "FILE") {
          console.log("node", node);
          this.setState({
            ...this.state,
            imgstate: node.filePath,
          });
        }
      } finally {
        this.setState({
          ...this.state,
          isLoading: false,
        });
      }
    },
    onBack: async () => {
      try {
        this.setState({
          ...this.state,
          isLoading: true,
        });

        const nextState = { ...this.state };

        nextState.depth.pop();

        const prevId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        if (prevId === null) {
          const backRoot = await request(
            "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/"
          );
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: backRoot,
          });
        } else if (prevId) {
          const backId = await request(
            `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/${prevId}`
          );
          console.log(backId);
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: backId,
          });
        }
      } catch (e) {
      } finally {
        this.setState({
          ...this.state,
          isLoading: false,
        });
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
      this.setState({
        ...this.state,
        isLoading: true,
      });

      const rootNodes = await request(
        "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/"
      );

      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      console.log(좆망);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };
  apiList();

  // const getApi = async () => {
  //   try {
  //     const rootNodes = await request(
  //       "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/"
  //     );

  //     this.setState({
  //       ...this.state,
  //       isRoot: true,
  //       nodes: rootNodes,
  //     });
  //   } catch (err) {
  //     console.log("없어?");
  //   }
  // };

  // getApi();
}

export default App;
