class SearchView {
  #parentElement = document.querySelector('.search');

  // getting the query from DOM :
  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value ;
    this.#parentElement.querySelector(".search__field").value = "";
    return query ;
  }

  // Handling the events with  submitting the from : "2nd publisher" 
  addHandlerSearchResults(callbackHandler) {
    this.#parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      callbackHandler();
    });
  }
}
export default new SearchView() ;
