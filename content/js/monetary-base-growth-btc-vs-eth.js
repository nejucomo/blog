"use strict"

$(function () {
  console.log('monetary base growth plotter is alive.')

  var plot = $.plot(
    '#div-plot_monetary-base-growth-btc-vs-eth',
    [[[0, 1], [1, 0]]],
    {})

  console.log(plot)
})
