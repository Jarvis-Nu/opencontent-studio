// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract OpenContent {

    event Post(
        string[] data,
        address owner
    );

    function createNewPost(
        string[] calldata data
    ) external {
        emit Post(data, msg.sender);
    }

}