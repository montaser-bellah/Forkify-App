import View from './View.js';
import icons from '../../img/icons.svg';
import PreviewView from './PreviewView.js';
class ResultsView extends View {
    _data ;
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your Query 🙄';
  _message;

  _generateMarkup() {
    console.log(">>>result view<<<",this._data);
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }

  
}

export default new ResultsView();
