import React, { PropTypes } from 'react'
import getMap, { getPlane } from '../EChartLib/ego';

export default class MigrationMap extends React.Component {

  componentDidMount() {
    const myChart = echarts.init(document.getElementById('rootMap'));

    var BJData = [
      [{ name: '北京' }, { name: '上海', value: 95 }],
      [{ name: '北京' }, { name: '广州', value: 90 }],
      [{ name: '北京' }, { name: '大连', value: 80 }],
      [{ name: '北京' }, { name: '南宁', value: 70 }],
      [{ name: '北京' }, { name: '南昌', value: 60 }],
      [{ name: '北京' }, { name: '拉萨', value: 50 }],
      [{ name: '北京' }, { name: '长春', value: 40 }],
      [{ name: '北京' }, { name: '包头', value: 30 }],
      [{ name: '北京' }, { name: '重庆', value: 20 }],
      [{ name: '北京' }, { name: '常州', value: 10 }]
    ];

    var SHData = [
      [{ name: '上海' }, { name: '包头', value: 95 }],
      [{ name: '上海' }, { name: '昆明', value: 90 }],
      [{ name: '上海' }, { name: '广州', value: 80 }],
      [{ name: '上海' }, { name: '郑州', value: 70 }],
      [{ name: '上海' }, { name: '长春', value: 60 }],
      [{ name: '上海' }, { name: '重庆', value: 50 }],
      [{ name: '上海' }, { name: '长沙', value: 40 }],
      [{ name: '上海' }, { name: '北京', value: 30 }],
      [{ name: '上海' }, { name: '丹东', value: 20 }],
      [{ name: '上海' }, { name: '大连', value: 10 }]
    ];

    var GZData = [
      [{ name: '广州' }, { name: '福州', value: 95 }],
      [{ name: '广州' }, { name: '太原', value: 90 }],
      [{ name: '广州' }, { name: '长春', value: 80 }],
      [{ name: '广州' }, { name: '重庆', value: 70 }],
      [{ name: '广州' }, { name: '西安', value: 60 }],
      [{ name: '广州' }, { name: '成都', value: 50 }],
      [{ name: '广州' }, { name: '常州', value: 40 }],
      [{ name: '广州' }, { name: '北京', value: 30 }],
      [{ name: '广州' }, { name: '北海', value: 20 }],
      [{ name: '广州' }, { name: '海口', value: 10 }]
    ];

    var geoCoordMap = getMap();
    var convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push([{
            coord: fromCoord
          }, {
            coord: toCoord
          }]);
        }
      }
      return res;
    };

    var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];
    [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function(item, i) {
      series.push({
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: getPlane(),
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function(val) {
            return val[2] / 8;
          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        });
    });

    var option = {
      backgroundColor: '#404a59',
      title: {
        text: 'TWers 迁徙',
        subtext: '数据纯属虚构',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['北京 Top10', '上海 Top10', '广州 Top10'],
        textStyle: {
          color: '#fff'
        },
        selectedMode: 'single'
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#404a59'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: series
    };

    myChart.setOption(option);
  }

  render() {
    const rootMapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    return (
      <div id="rootMap" style={rootMapStyle}></div>
    )
  }
}

MigrationMap.PropTypes = {};