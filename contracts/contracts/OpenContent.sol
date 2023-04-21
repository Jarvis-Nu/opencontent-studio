// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract OpenContent {

    event BlogPost(
        string[] data,
        address owner
    );

    function createNewBlogPost(
        string[] calldata data
    ) external {
        emit BlogPost(data, msg.sender);
    }

}