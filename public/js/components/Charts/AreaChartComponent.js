/**
 * Area Chart Component
 */

var React = require('react');
var c3 = require('c3');
var io = require('socket.io-client');

var socket = io('http://localhost:10002');

var AreaChart = React.createClass({
  componentDidMount: function() {
    var chartData1 = ['data1'];
    var chartData2 = ['data2'];
    var chartData3 = ['data3'];
    var timeData = ['x'];
    for (var i = 1; i <= 180; i++) {
      chartData1.push(0);
      // chartData2.push(0);
      // chartData3.push(0);
      chartData1.push(Math.random() * (300 - 100) + 100);
      chartData2.push(Math.random() * (300 - 100) + 100);
      chartData3.push(Math.random() * (300 - 100) + 100);
      timeData.push(Date.now() - ((181 - i)*1000));
    }
    var charts = [chartData1, chartData2, chartData3];

    var chart = c3.generate({
      bindto: '#chart',
      /* data: {
        x: 'x',
        xFormat: '%H:%M:%S',
        columns: [
          timeData,
          chartData1,
          chartData2,
          chartData3,
        ],
        colors: {
          chartData1: '#333300',
          chartData2: '#E9FF00',
          chartData3: '#11FG00',
        },
        groups: {
          ['data1', 'data2', 'data3'];
        },
        type: 'bar'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M:%S'
          }
        }
      },
      bar: {
        width: {
          ratio: 1
        }
      },
      transition: {
        duration: 0
      },
      zoom: {
        enabled: true
      }*/

    });

    socket.on('data', function(msg) {
      /* var columns = [];
      timeData.push(new Date());
      timeData.splice(1, 1);
      columns.push(timeData);
      for (var i = 0; i < Object.keys(msg).length; i++) {
        charts[i].push(msg[Object.keys(msg)[i].data]);
        charts[i].splice(1, 1);
        console.log(chart[i]);
        columns.push(chart[i]);
      }
      chart.load({columns: columns}) */
      chartData1.push(msg.data);
      chartData1.splice(1, 1);
      timeData.push(new Date());
      timeData.splice(1, 1);
      chart.load({
        columns: [
          timeData,
          chartData1
        ]
      });
    });
  },

  render: function() {
    return (<div id='chart'></div>);
  }
});


/* var areaChart = require('../../charts/areaChart');

var AreaChart = React.createClass({
	propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    areaChart.create(el, {
      width: 100,
      height: 300
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    areaChart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    areaChart.destroy(el);
  },

  render: function() {
    return (
      <div className='AreaChart'></div>
    );
  }
}); */

module.exports = AreaChart;
