// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '../interfaces/IDistributor.sol';
import '../interfaces/IRewardDistributionRecipient.sol';

contract InitialShareDistributor is IDistributor {
    using SafeMath for uint256;

    event Distributed(address pool, uint256 cashAmount);

    bool public once = true;

    IERC20 public share;
    IRewardDistributionRecipient public usdcpocLPPool;
    uint256 public usdcpocInitialBalance;
    IRewardDistributionRecipient public usdcposLPPool;
    uint256 public usdcposInitialBalance;

    constructor(
        IERC20 _share,
        IRewardDistributionRecipient _usdcpocLPPool,
        uint256 _usdcpocInitialBalance,
        IRewardDistributionRecipient _usdcposLPPool,
        uint256 _usdcposInitialBalance
    ) public {
        share = _share;
        usdcpocLPPool = _usdcpocLPPool;
        usdcpocInitialBalance = _usdcpocInitialBalance;
        usdcposLPPool = _usdcposLPPool;
        usdcposInitialBalance = _usdcposInitialBalance;
    }

    function distribute() public override {
        require(
            once,
            'InitialShareDistributor: you cannot run this function twice'
        );

        share.transfer(address(usdcpocLPPool), usdcpocInitialBalance);
        usdcpocLPPool.notifyRewardAmount(usdcpocInitialBalance);
        emit Distributed(address(usdcpocLPPool), usdcpocInitialBalance);

        share.transfer(address(usdcposLPPool), usdcposInitialBalance);
        usdcposLPPool.notifyRewardAmount(usdcposInitialBalance);
        emit Distributed(address(usdcposLPPool), usdcposInitialBalance);

        once = false;
    }
}
