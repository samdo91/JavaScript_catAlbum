export function loadingFuntion(loadingState) {
  this.setState({
    ...this.state,
    isLoading: loadingState,
  });
}
