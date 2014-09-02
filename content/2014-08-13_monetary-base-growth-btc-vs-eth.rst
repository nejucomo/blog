:title: Monetary Base Growth: BTC vs ETH
:tags: Monetary Policy, Ethereum, Bitcoin


.. raw:: html

    <script language="javascript" type="text/javascript" src="./js/monetary-base-growth-btc-vs-eth.js"></script>


Here are some plots for comparing the monetary policies of Bitcoin versus Ethereum.  I created the datasets for these from scratch, based on the `Bitcoin wiki`_ pages on `Mining Reward`_ and `Controlled Currency Supply`_ [#]_, for `BTC` and the Ethereum `Terms and Conditions of The Ethereum Genesis Sale`_ §4 for `ETH`.  They are approximated to years after launch, whereas a block-count on the X-axes would be more precise.  For Ethereum, I use ``x`` as the total number of `ETH` allocated in the genesis block.

.. [#] This page uses the approximation that `BTC` reward halving is on a 4 year schedule, rather than every 210,000 blocks.  The schedule of block creation may vary notably from 4 years per 210,000 blocks.

.. _`Bitcoin wiki`: https://en.bitcoin.it/wiki/Main_Page
.. _`Mining Reward`: https://en.bitcoin.it/wiki/Mining#Reward
.. _`Controlled Currency Supply`: https://en.bitcoin.it/wiki/Controlled_Currency_Supply
.. _`Terms and Conditions of The Ethereum Genesis Sale`: https://www.ethereum.org/pdfs/TermsAndConditionsOfTheEthereumGenesisSale.pdf


**Caveat Emptor:**  It's quite possible I've made mistakes or errors.  Do not rely on this data without careful verification on your own.

Block Rewards
=============

In both systems, the change in total monetary base comes exclusively from "block rewards" where the miner which solves a constraint receives a given number of new currency units.  Bitcoin has a policy of halving the reward (roughly) every four years until it reaches 0 due to rounding error.  Ethereum has a policy of a fixed reward into perpetuity:

.. raw:: html

    <div style="text-align: center">
      Mining Reward
      <div id="div-plot_monetary-base-btc-vs-eth-mining-reward" style="width: 100%; height: 200px"></div>
    </div>

**Note:** These two data sets have distinct units, so the cross-over around year 16 is a plotting artifact without significance.  ``FIXME: What's a better term than "data set"?``

Monetary Base
=============

I use the term `monetary base` to refer to the number of currency units allocated by the protocol.  Note that this is distinct from `money supply` in that the latter refers to the availability of funds for actors in the system, and that availability is affected by lost private keys, transfers to nonexistent addresses, low exchange liquidity, and other factors.

Given that both systems have a monetary policy where the only change in the monetary base is by block rewards, then in Bitcoin the long term monetary base converges to a fixed amount, ``21,000,000 BTC``, whereas in Ethereum it grows perpetually.  Here's what this looks like for the first 24 years after launch:

.. raw:: html

    <div style="text-align: center">
      Monetary Base
      <div id="div-plot_monetary-base-btc-vs-eth-monetary-base" style="width: 100%; height: 400px"></div>
    </div>

**Note:** As for the rewards plot, the two data sets have distinct Y-axes and scaling, so there's nothing special about year 23.

Growth Rate
===========

Here's where the comparison gets interesting.  If we divide the monetary base by the previous year, we get an annual monetary base growth rate.  Because this is a unitless percentage for both systems, we finally have a plot with a single Y-axis and now the crossover points *do* have significance.

**Punchline:** Bitcoin's monetary base grows much faster than Ethereum's initially, approaches a similar level at four years after launch, and finally drops below Ethereum around year 8.  Forever after, Bitcoin has lower growth and reaches 0, whereas Ethereum's growth rate always remains positive (see next plot).

.. raw:: html

    <div style="text-align: center">
      Growth Rate
      <div id="div-plot_monetary-base-btc-vs-eth-growth-rate" style="width: 100%; height: 400px"></div>
    </div>

**Note:** Bitcoin starts at 0 BTC in its genesis block, so the percentage growth at year 1 is infinite and is excluded.  By contrast, Ethereum starts with an initial allocation of ``x ETH``.

Long Term Growth Rate
---------------------

Here's the same comparison over 100 years, rather than 24.  By starting at year 4, we omit the early discrepency which keeps the scales of the two datasets closer.  This highlights their difference in the long run:

.. raw:: html

    <div style="text-align: center">
      Growth Rate - Years 4 to 100
      <div id="div-plot_monetary-base-btc-vs-eth-growth-rate-long-term" style="width: 100%; height: 400px"></div>
    </div>

Growth Ratio
============

If ``B(Y)`` is the annual growth rate of the Bitcoin monetary base ``Y`` years after launch, and ``E(Y)`` is the annual Ethereum growth rate, then what is their ratio, ``E(Y) / B(Y)``?

.. raw:: html

    <div style="text-align: center">
      Growth Rate Ratio
      <div id="div-plot_monetary-base-btc-vs-eth-growth-rate-ratio" style="width: 100%; height: 400px"></div>
    </div>

Here we again see that Ethereum grows slower than Bitcoin until the 8th year, and dramatically so before year 4.  Up until year 23, at least the growth rate of Ethereum is around 5% more than Bitcoin.  Because the Bitcoin growth rate reaches 0, we should expect this ratio to sky rocket in the long term.  Let's look at that:

Long Term Growth Ratio
----------------------

The 4 to 100 year ratio of growth rates:

.. raw:: html

    <div style="text-align: center">
      Growth Rate - Years 4 to 100
      <div id="div-plot_monetary-base-btc-vs-eth-growth-rate-ratio-long-term" style="width: 100%; height: 400px"></div>
    </div>

Here's the same plot at log scale:

.. raw:: html

    <div style="text-align: center">
      Growth Rate - Years 4 to 100 (Log Scale)
      <div id="div-plot_monetary-base-btc-vs-eth-growth-rate-ratio-long-term-log-scale" style="width: 100%; height: 400px"></div>
    </div>
