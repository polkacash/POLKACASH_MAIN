// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

import '../interfaces/IOracle.sol';

contract MockOracle is IOracle {
    using SafeMath for uint256;

    uint256 public price;
    bool public error;

    /* ========= CONSTANT VARIABLES ======== */

    uint256 public constant PERIOD = 1 days;

    /* ========== STATE VARIABLES ========== */

    // epoch
    uint256 public startTime;
    uint256 public epoch = 0;

    // uniswap
    address public token0;
    address public token1;
    //IUniswapV2Pair public pair;

    // oracle
    uint32 public blockTimestampLast;
    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    //FixedPoint.uq112x112 public price0Average;
    //FixedPoint.uq112x112 public price1Average;

    /* ========== CONSTRUCTOR ========== */

    /* =================== Modifier =================== */

    modifier checkEpoch {
        require(now >= nextEpochPoint(), 'Oracle: not opened yet');

        _;

        epoch = epoch.add(1);
    }

    /* ========== VIEW FUNCTIONS ========== */

    function nextEpochPoint() public view returns (uint256) {
        return startTime.add(epoch.mul(PERIOD));
    }

    function pairFor(
        address factory,
        address tokenA,
        address tokenB
    ) external pure returns (address lpt){
        //return UniswapV2Library.pairFor(factory, tokenA, tokenB);
        return address(0);
    }

    function setPrice(uint256 _price) public {
        price = _price;
    }

    function setRevert(bool _error) public {
        error = _error;
    }

    function update() external override {
        require(!error, 'Oracle: mocked error');
        emit Updated(0, 0);
    }

    function consult(address, uint256 amountIn)
        external
        override
        view
        returns (uint256)
    {
        return price.mul(amountIn).div(1e18);
    }

    function getReserves(address token) external override view returns (uint112 reserve) {
        token;
        reserve = 0;
    }

    event Updated(uint256 price0CumulativeLast, uint256 price1CumulativeLast);
}
