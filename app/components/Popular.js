var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')

// State
// Lifecycle
// UI

// Stateless functional component
function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  
  return(
    <ul className='languages'>
          {languages.map(function(lang) {
            return (
              <li
                // When a language is selected, highlight it 
                style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
                onClick={props.onSelect.bind(null, lang)}
                key={lang}>
                  {lang}
              </li>
            )
          })}
        </ul>
  )
}

SelectLanguage.propType = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.map(function(repo){
        return
      })}
    </ul>
  )
}

class Popular extends React.Component {
    // Initial state
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    // So that updateLanguge gets invoked with the expected context. Binding 'this' to this component instance.
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  // A way to update the state
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });

    api.fetchPopularRepos(lang)
    .then(function(repos){
      this.setState(function(){
        return{
          repos: repos,
        }
      })
    }.bind(this));
  }

  // UI
  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        <RepoGrid repos={this.state.repos}/>
      </div>
    )
  }
}

module.exports = Popular;