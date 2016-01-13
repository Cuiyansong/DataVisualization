import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

class Counter extends React.Component {

  componentDidMount() {
    const myChart = echarts.init(document.getElementById('rootMap'));

    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "美女", "帅哥"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: this._getRandomData()
      }]
    };

    myChart.setOption(option);
  }

  _getRandomData() {
    return [1, 1, 1, 1, 1, 1, 2, 1].map(item => {
      return Math.random() * item;
    })
  }

  render() {
    const rootMapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    return (
      <div id="rootMap" className='rootMap' style={rootMapStyle}></div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
};

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
)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
