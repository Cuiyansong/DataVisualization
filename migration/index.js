import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import MigrationMap from './component/migration-map';

class MainPage extends React.Component {

  render() {
    const rootMapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    return (
      <div style={rootMapStyle}>
        <MigrationMap></MigrationMap>
      </div>
    )
  }
}

MainPage.propTypes = {};

// Action
const increaseAction = { type: 'increase' };

// Reducer
function counter(state = { count: 0 }, action) {
  let count = state.count;
  switch (action.type) {
  case 'increase':
    return { count: count + 1 };
  default:
    return state
  }
}

// Store
let store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
