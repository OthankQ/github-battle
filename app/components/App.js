var React = require('react');
var Popular = require('./Popular');

class App extends React.Component {
  render(){
    return (
      <div className='container'>
      <Popular name={'Ryan'}/>
      </div>
    )
  }
}

module.exports = App;
