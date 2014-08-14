"use strict"

$(function () {
  console.log('monetary base growth plotter is alive.')

  var YEARS = 24
  var BTC_BLOCKS_PER_YEAR = 52500
  var XETH_INITIAL = 1.0
  var XETH_PER_YEAR = 0.27

  plot_mining_reward()
  plot_monetary_base()

  return

  function plot_mining_reward() {
    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-mining-reward',
      [
        {
          label: 'BTC reward',
          data: gen_dataset(0, YEARS, 1, btc_reward),
        },
        {
          label: '𝑥⋅ETH reward',
          yaxis: 2,
          data: gen_dataset(0, YEARS, 1, function (y) { return XETH_PER_YEAR }),
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxes: [{
          axisLabel: 'Year after launch',
          ticks: 12,
        }],
        yaxes: [
          {
            min: 0.1,
            ticks: [0.1, 1, 10, 100],
            tickDecimals: 1,
            transform: function (v) { return Math.log(v) },
            tickFormatter: units_formatter(' BTC'),
          },
          {
            ticks: [0.27],
            tickDecimals: 2,
            position: 'right',
            alignTicksWithAxis: 'right',
            tickFormatter: units_formatter('⋅𝑥 ETH'),
          }
        ],
        lines: { show: true },
        points: { show: true },
      })

  }

  function plot_monetary_base() {
    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-monetary-base',
      [
        {
          label: 'BTC',
          data: gen_dataset(
            0, YEARS, 1,
            function (year, lmb) {
              return lmb + btc_reward(year) * BTC_BLOCKS_PER_YEAR
            },
            -btc_reward(0) * BTC_BLOCKS_PER_YEAR
          ),
        },
        {
          label: '𝑥⋅ETH',
          yaxis: 2,
          data: gen_dataset(
            0, YEARS, 1,
            function (year, lmb) {
              return lmb + XETH_PER_YEAR
            },
            XETH_INITIAL - XETH_PER_YEAR
          ),
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxes: [{
          axisLabel: 'Year after launch',
          ticks: 12,
        }],
        yaxes: [
          {
            /*
            min: 0.1,
            ticks: [0.1, 1, 10, 100],
            tickDecimals: 1,
            transform: function (v) { return Math.log(v) },
            */
            tickFormatter: units_formatter(' BTC'),
          },
          {
            min: 0,
            /*
            ticks: [0.27],
            tickDecimals: 2,
            */
            position: 'right',
            alignTicksWithAxis: 'right',
            tickFormatter: units_formatter('⋅𝑥 ETH'),
          }
        ],
        lines: { show: true },
        points: { show: true },
      })
  }

  function gen_dataset(min, max, step, fy, y0) {
    var lasty = y0 === undefined ? 0 : y0
    var data = []
    for (var x = min; x < max; x += step) {
      var y = fy(x, lasty)
      lasty = y
      data.push( [x, y] )
    }
    return data
  }

  function units_formatter(suffix) {
    return function (v, axis) {
      return v.toFixed(axis.tickDecimals) + suffix;
    }
  }

  function btc_reward(year) {
    return 50 / Math.pow(2, Math.floor(year/4))
  }
})
