"use strict"

$(function () {
  console.log('monetary base growth plotter is alive.')

  main()

  return

  function main() {
    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-mining-reward',
      [
        {
          label: 'BTC reward',
          data: gen_dataset(0, 24, 1, function (y) { return 50 / Math.pow(2, Math.floor(y/4)) }),
        },
        {
          label: '𝑥⋅ETH reward',
          yaxis: 2,
          data: gen_dataset(0, 24, 1, function (y) { return 0.27 }),
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

  function gen_dataset(min, max, step, fy) {
    var data = []
    for (var x = min; x < max; x += step) {
      data.push( [x, fy(x)] )
    }
    return data
  }

  function units_formatter(suffix) {
    return function (v, axis) {
      return v.toFixed(axis.tickDecimals) + suffix;
    }
  }
})
