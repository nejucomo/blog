======
A blog
======

Cryptocurrency cuisine, made with Pelican ingredients, spiced with JavaScript.

Future Topic Ideas
==================

Bitcoin X.0
-----------

These are about the perpetual "next generation" of decentralized consensus:

* "The three Tragedies of the Commons in Bitcoin Mining" - Recap from Tim Swanson and his transitive sources.

    - Examine some alternative tweaks to each TotC.

* "Physical Decentralization - Towards a Currency for the Universal Earthling Diaspora"
* "Taming the Tyrant - Can a Centralized Transaction Ledger Decentralize Power?"

Ethereum
--------

These are specific to Ethereum:

* "Writing Secure Ethereum Contracts"

    - Vuln classes:
        + Refer to Reddit threads, the community nomenclature for "reordering attacks" is (misleadingly) "front-running".
        + Dropped transactions attacks.
        + Incentivizing Mining: If custom assets reward miners proportionally to base ETH, it might prevent "incentive distortion vulnerability" where miners value rollbacks much differently than the ETH would indicate.  (**Note:** This might be a standalone topic.)
        + Avoid storage index collisions, especially if index keys are controlled by external sources.
    - Name the property of resistance against each category.

* "Ethereum Devs Bite Off Too Much"

    - Focus on just "Ethereum core" following Bitcoin core devs lead.  No front-end.
    - Focus on mining.  This is an essential missing piece.
    - Prioritize testing: unit tests, integration tests, interoperability tests, implementation agnostic test vectors.
    - Drop UI and the Browser.  These are giant additions to complexity.  Other people will invent better solutions.

* "Introducing ethasm - The Ethereum assembler/disassembler"
* "Introducing contraxo - A deterministic blockchain simulator for Ethereum"

    - Any contract developer would be foolheardy *not* to develop thorough tests with this.
    - Developing contraxo tests does not require original contract authors' consent!  May a million tests flourish.
    - Suggest a bounty program: Contract devs put up ETH for a bounty, contraxo tests which demonstrate vulnerabilities receive the bounty.

* "Cross-Contract Currencies"

    - Custom currencies may be distributed amongst multiple contracts.
    - Participating contracts follow a sender-authorized-transfer convention: if a sending contract is authoritative for X units of the currency which are indicated by the message, the receiver now becomes authoritative for those units.
    - Different contracts may (almost necessarily?) have different monetary policy for units.
    - Example:

        + Foo Coins contract sends units to Bob's Exchange contract on behalf of a currency holder.
        + Foo Coins has an automatic lottery that rewards currency holders based on the number of units they hold (an example policy).
        + If a user has transferred units into Bob's Exchange, they no longer participate in the lottery.

    - Such policy differences may lead to systemic behavior between contracts.  For example, if Blah Currency has a demurrage fee, but Bob's Exchange does not.  Therefore, most users store their Blah units in Bob's Exchange most of the time.

* "The Mulcher - ???" - FIXME: We need a selling tag-line for users.

    - Mechanism Overview:

        + Users can deposit, ping, or withdraw ETH.
        + There are two kinds of forfeiture a user may suffer: early withdrawal or timeouts:

            * Timeouts occur if the user has not pinged their account recently enough.
            * Early withdrawal forfeiture occurs if users withdraw before their account reaches "the maturity horizon".  (The penalty is linear, maximum at deposit time 0 and no penalty at horizon time T.
            * These two mechanisms are orthogonal.  An account may timeout before or after reaching the maturity horizon.

        + Different "Mulching bins" have different maturity horizons T, ie: 1 Month, 3 Months, ... 2 years, etc...
        + Forfeitures go into a pool which is then distributed to other participants:

            * The pool is disbursed to eligible accounts as soon as possible.  If there are any, the pool is completely disbursed.  If there are none, the pool is later completely disbursed at a later time as soon as accounts become eligible.
            * Accounts are eligible when they are in the "ripe state" on the "ripeness cycle", see below.

        + Ripeness cycle:

            * Accounts transition between states around a ripeness cycle: fresh -> ripe -> stale -> decayed/forfeited.
            * A deposit, withdrawal, or ping (collectively: "account updates") resets an account to the fresh state.
            * An account transitions to subsequent states based on the time since the last update.
            * Accounts in the ripe state are eligible for disbursement from the reward pool.
            * The fresh state helps to rate limit account update traffic: The most advantageous update period is the length of the fresh state plus the length of the ripe state.  Any faster or slower and the "eligibility duty cycle" decreases.

    - Individual Benefits:

        + Users who are competent at key management and operations stand to benefit from other users' incompetence.
        + This contract gives ETH holders a "0-brick-and-mortar" investment opportunity for the ETH immediately on launch.  If you have no plans for your ETH for 3 months, why not mulch it?

    - Individual Risks:

        + Using the Mulcher reduces liquidity along a time horizon.
        + Using the Mulcher requires vigilant blockchain interaction.  Timing out leads to forfeiture.
        + Using the Mulcher requires gas.  If all players are perfectly competent, all players holdings evaporate into gas.
        + Using the Mulcher locks up ETH which is has a continually growing monetary base supply.  If 100% of the initial ETH were mulched, after X years, this would only be a small fraction of upper-bound ETH supply.

    - Systemic Benefits:

        + Holdings in the Mulcher contract indicate the users' liquidity time horizon, which provides an economic indicator about ETH.  For example if a majority fraction of ETH is in a one-year-horizon Mulcher, this is some systemic assurance that a dump is infeasible within a year.
        + Holdings in the Mulcher cannot be lost, regardless of private key lossage.  Thus the total contract balance is a known lower-bound on "available ETH supply".

    - Systemic Flaws:

        + Costs state and messaging traffic.
        + Bugs would suck as per any contract.
        + As of this writing, there's no defense against the miner attacks.  Message dropping in particular is an essential vulnerability.

