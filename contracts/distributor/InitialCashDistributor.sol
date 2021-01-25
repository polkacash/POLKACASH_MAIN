// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import '../distribution/POCUSDXPool.sol';
import '../distribution/POCDAIPool.sol';
import '../distribution/POCFRAXPool.sol';
import '../distribution/POCUSDTPool.sol';
import '../distribution/POCUSDCPool.sol';
import '../distribution/POCESDPool.sol';
import '../distribution/POCRAMPPool.sol';
import '../distribution/POCUFTPool.sol';
import '../distribution/POCINJPool.sol';
import '../distribution/POCBNBPool.sol';
import '../distribution/POCFIREPool.sol';
import '../distribution/POCDUCKPool.sol';
import '../interfaces/IDistributor.sol';

contract InitialCashDistributor is IDistributor {
    using SafeMath for uint256;

    event Distributed(address pool, uint256 cashAmount);

    bool public once = true;

    IERC20 public cash;
    IRewardDistributionRecipient[] public pools;
    uint256 public totalInitialBalance;

    constructor(
        IERC20 _cash,
        IRewardDistributionRecipient[] memory _pools,
        uint256 _totalInitialBalance
    ) public {
        require(_pools.length != 0, 'a list of POC pools are required');

        cash = _cash;
        pools = _pools;
        totalInitialBalance = _totalInitialBalance;
    }

    function distribute() public override {
        require(
            once,
            'InitialCashDistributor: you cannot run this function twice'
        );

        for (uint256 i = 0; i < pools.length; i++) {
            uint256 amount = totalInitialBalance.div(pools.length);

            cash.transfer(address(pools[i]), amount);
            pools[i].notifyRewardAmount(amount);

            emit Distributed(address(pools[i]), amount);
        }

        once = false;
    }
}
