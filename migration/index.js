import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import MigrationMap from './Component/migration-map';
import { fetchDataByMonth } from './Actions/migration-map';
import { increaseAction } from './Actions/index';
import reducers from './Reducers/index';

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

// Store
const loggerMiddleware = createLogger({ collapsed: true });

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducers);

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
