#PolkaCash

Polka Cash is an Algorithmic open-source stablecoin with reserve asset mechanism built on Ethereum.

## The Polka Cash Protocol


Polka Cash has some unique features over other algorithmic stablecoins.

1. **Rationally simplified** - main core mechanisms of the Polka protocol has been simplified, especially around bond issuance and seigniorage distribution. After a deeply thought about the tradeoffs for these changes, and believe they allow significant gains in UX and contract simplicity, while preserving the intended behavior of the original monetary policy design.

2. **Censorship resistant** - the project was launched on anonymity, by some well experienced developers. Our believe for being anonymous is that it will allow the project to avoid the censorship of regulators which could create some barriers in future, also will allow Polka Cash to avoid founder glorification & single points of failure that have plagued so many other projects.

3. **Fairly distributed** - both Polka Shares and Polka Cash has zero premine and no investors - community members can earn the initial supply of both assets by helping to contribute to bootstrap liquidity & adoption of Polka Cash.

### A Three-token System

There exists three types of assets in the Polka Cash system.

- **Polka Cash ($POC)**: a stablecoin, which the protocol aims to keep value-pegged to 1 US Dollar.
- **Polka Bonds ($POB)**: IOUs issued by the system to buy back Polka Cash when price($POC) < $1. Bonds are sold at a meaningful discount to price($POC), and redeemed at $1 when price($POC) normalizes to $1.
- **Polka Shares ($POS)**: receives surplus seigniorage (seigniorage left remaining after all the bonds have been redeemed).

### Stability Mechanism

- **Contraction**: When the price($POC) < ($1 - epsilon), users can trade in $POC for $POB at the POBPOC exchange rate of price($POC). This allows bonds to be always sold at a discount to cash during a contraction.
- **Expansion**: When the price($POC) > ($1 + epsilon), users can trade in 1 $POB for 1 $POC. This allows bonds to be redeemed always at a premium to the purchase price.
- **Seigniorage Allocation**: If there are no more bonds to be redeemed, (i.e. bond Supply is negligibly small), more $POC is minted totalSupply($POC) * (price($POC) - 1), and placed in a pool for $POS holders to claim pro-rata in a 24 hour period.

## Motivation

The Polka Cash core developers have been early supporters of blockchain and stablecoin, and we believe that having an algorithmic fully decentralised stablecoin will defeat any forms of regulation. As Bitcoin first got us interested in blockchain's use cases, we have seen issues others assets backed stablecoins are facing and we have decided to launch an algorithmic stablecoin which no regulation will have any effect on.

Our mission is to establish a tightly pegged $1 stablecoin which will at some point be a globally acceptable stablecoin. As DeFi has become the trend, we are leveraging the industry's excitement in the category to bring adequate attention and engagement to the Polka Protocol, and to use this opportunity to distribute ownership in the protocol fairly but this doesn't mean that Polka Cash is a DeFi project.

Polka Cash is a completely transparent and community-run project. In line with this, there are no tokens pre-allocated to the team or investors. Ordinarily, this would create a sustenance problem, as team may lose motivation to grow the project and funds may not be available for other important things such as hiring more team.

To remedy this, the team set up a separate funds. These funds will only be generated as tokens are mined.

The team fund will incentivize the current team as well as any future additions to continue giving their best for the progress of the project.

## How to Contribute

To chat with us & stay up to date, join our [Telegram](https://t.me/Polkacash).

Contribution guidelines are [here](./CONTRIBUTING.md)

For security concerns, please submit an issue [here](https://github.com/polkacash/POLKACASH/issues).


_© Copyright 2021, Polka Cash_
