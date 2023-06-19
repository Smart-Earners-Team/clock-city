// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IClockMetadata {
    function constructTokenURI(
        uint256 tokenID,
        address seed,
        address holder,
        uint256 w,
        uint256 x
    ) external view returns (string memory);

    function randNum()
        external
        view
        returns (
            uint256[12] memory randIDs,
            uint256[12] memory randW,
            uint256[12] memory randX
        );

    function randAddr()
        external
        view
        returns (address[12] memory seedsArr, address[12] memory holdersArr);

    function generateBulkData()
        external
        view
        returns (
            uint256[12] memory tokenID,
            address[12] memory seed,
            address[12] memory holder,
            uint256[12] memory w,
            uint256[12] memory x
        );

    function homeAddr() external view returns (address[8] memory Addresses);
}
