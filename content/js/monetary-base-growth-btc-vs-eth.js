"use strict"

$(function () {
  console.log('monetary base growth plotter is alive.')

  var YEARS = 24
  var YEARS_LONG = 140
  var BTC_BLOCKS_PER_YEAR = 52500
  var XETH_INITIAL = 1.0
  var XETH_PER_YEAR = 0.27

  var btc_mbase = gen_dataset(
    0, YEARS, 1,
    function (year, lmb) {
      return lmb + btc_reward(year) * BTC_BLOCKS_PER_YEAR
    },
      -btc_reward(0) * BTC_BLOCKS_PER_YEAR
  )

  plot_mining_reward()
  plot_monetary_base(btc_mbase)
  plot_growth_rate(btc_mbase)
  plot_growth_rate_long_term()
  plot_growth_rate_ratio()
  plot_growth_rate_ratio_long_term()
  plot_growth_rate_ratio_long_term_log_scale()

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
          label: 'x⋅ETH reward',
          yaxis: 2,
          data: gen_dataset(0, YEARS, 1, function (y) { return XETH_PER_YEAR }),
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
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
            tickFormatter: units_formatter('⋅x ETH'),
          }
        ],
        lines: { show: true },
        points: { show: true },
      })

  }

  function plot_monetary_base(btc_mbase) {
    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-monetary-base',
      [
        {
          label: 'BTC',
          data: btc_mbase,
        },
        {
          label: 'x⋅ETH',
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
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
        yaxes: [
          {
            tickFormatter: units_formatter(' BTC'),
          },
          {
            min: 0,
            position: 'right',
            alignTicksWithAxis: 'right',
            tickFormatter: units_formatter('⋅x ETH'),
          }
        ],
        lines: { show: true },
        points: { show: true },
      })
  }

  function plot_growth_rate(btc_mbase) {
    var to_percentage_growth = function (v) { return (v-1) * 100 }
    var btc_data = gen_dataset(2, YEARS, 1, function (y) {
      return to_percentage_growth(btc_mbase[y][1] / btc_mbase[y-1][1])
    })

    var eth_data = gen_dataset(1, YEARS, 1, function (y) {
      return to_percentage_growth(
        (XETH_INITIAL + y * XETH_PER_YEAR) / (XETH_INITIAL + (y - 1) * XETH_PER_YEAR)
      )
    })

    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-growth-rate',
      [
        {
          label: 'BTC growth per year',
          data: btc_data,
        },
        {
          label: 'ETH growth per year',
          data: eth_data,
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
        yaxis: {
          tickFormatter: units_formatter('%'),
        },
        lines: { show: true },
        points: { show: true },
      })
  }

  function plot_growth_rate_long_term() {
    var btc_mbase = gen_dataset(
      0, YEARS_LONG, 1,
      function (year, lmb) {
        return lmb + btc_reward(year) * BTC_BLOCKS_PER_YEAR
      },
        -btc_reward(0) * BTC_BLOCKS_PER_YEAR
    )

    var to_percentage_growth = function (v) { return (v-1) * 100 }
    var btc_data = gen_dataset(4, YEARS_LONG, 1, function (y) {
      return to_percentage_growth(btc_mbase[y][1] / btc_mbase[y-1][1])
    })

    var eth_data = gen_dataset(4, YEARS_LONG, 1, function (y) {
      return to_percentage_growth(
        (XETH_INITIAL + y * XETH_PER_YEAR) / (XETH_INITIAL + (y - 1) * XETH_PER_YEAR)
      )
    })

    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-growth-rate-long-term',
      [
        {
          label: 'BTC growth per year',
          data: btc_data,
        },
        {
          label: 'ETH growth per year',
          data: eth_data,
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
        yaxes: [
          {
            tickFormatter: units_formatter('%'),
          },
          {
            position: 'right',
            alignTicksWithAxis: 'right',
            tickFormatter: units_formatter('ETH gr / BTC gr'),
          },
        ],
        lines: { show: true },
        points: { show: true },
      })
  }

  function plot_growth_rate_ratio() {
    var btc_mbase = gen_dataset(
      0, YEARS, 1,
      function (year, lmb) {
        return lmb + btc_reward(year) * BTC_BLOCKS_PER_YEAR
      },
        -btc_reward(0) * BTC_BLOCKS_PER_YEAR
    )

    var btc_data = gen_dataset(2, YEARS, 1, function (y) {
      return btc_mbase[y][1] / btc_mbase[y-1][1]
    })

    var eth_data = gen_dataset(1, YEARS, 1, function (y) {
      return (XETH_INITIAL + y * XETH_PER_YEAR) / (XETH_INITIAL + (y - 1) * XETH_PER_YEAR)
    })

    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-growth-rate-ratio',
      [
        {
          label: 'ETH growth rate / BTC growth rate',
          data: gen_dataset(2, YEARS, 1, function (y) {
            return eth_data[y-1][1] / btc_data[y-2][1]
          }),
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
        yaxes: {
          tickFormatter: units_formatter('E(Y) / B(Y)'),
        },
        lines: { show: true },
        points: { show: true },
      })
  }

  function plot_growth_rate_ratio_long_term() {
    var btc_mbase = gen_dataset(
      0, YEARS_LONG, 1,
      function (year, lmb) {
        return lmb + btc_reward(year) * BTC_BLOCKS_PER_YEAR
      },
        -btc_reward(0) * BTC_BLOCKS_PER_YEAR
    )

    var btc_data = gen_dataset(2, YEARS_LONG, 1, function (y) {
      return btc_mbase[y][1] / btc_mbase[y-1][1] - 1.0
    })

    var eth_data = gen_dataset(1, YEARS_LONG, 1, function (y) {
      return (XETH_INITIAL + y * XETH_PER_YEAR) / (XETH_INITIAL + (y - 1) * XETH_PER_YEAR) - 1.0
    })

    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-growth-rate-ratio-long-term',
      [
        {
          label: 'ETH growth rate / BTC growth rate',
          data: gen_dataset(4, YEARS_LONG, 1, function (y) {
            return eth_data[y-1][1] / btc_data[y-2][1]
          }),
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
        yaxes: {
          tickFormatter: units_formatter('E(Y) / B(Y)'),
        },
        lines: { show: true },
        points: { show: true },
      })
  }

  function plot_growth_rate_ratio_long_term_log_scale() {
    var btc_mbase = gen_dataset(
      0, YEARS_LONG, 1,
      function (year, lmb) {
        return lmb + btc_reward(year) * BTC_BLOCKS_PER_YEAR
      },
        -btc_reward(0) * BTC_BLOCKS_PER_YEAR
    )

    var btc_data = gen_dataset(2, YEARS_LONG, 1, function (y) {
      return btc_mbase[y][1] / btc_mbase[y-1][1] - 1.0
    })

    var eth_data = gen_dataset(1, YEARS_LONG, 1, function (y) {
      return (XETH_INITIAL + y * XETH_PER_YEAR) / (XETH_INITIAL + (y - 1) * XETH_PER_YEAR) - 1.0
    })

    var plot = $.plot(
      '#div-plot_monetary-base-btc-vs-eth-growth-rate-ratio-long-term-log-scale',
      [
        {
          label: 'ETH growth rate / BTC growth rate',
          data: gen_dataset(4, YEARS_LONG, 1, function (y) {
            return eth_data[y-1][1] / btc_data[y-2][1]
          }),
        },
      ],
      {
        xaxisLabels: { show: true },
        xaxis: {
          axisLabel: 'Year after launch',
          ticks: 12,
        },
        yaxis: {
          min: 0.5,
          ticks: [1e0, 1e2, 1e4, 1e6, 1e8, 1e10],
          tickDecimals: 1,
          transform: function (v) { return Math.log(v) },
          tickFormatter: units_formatter(' E(Y) / B(Y)'),
        },
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
    var r = 50 / Math.pow(2, Math.floor(year/4))
    return (r < 1e-8) ? 0 : r
  }
})
