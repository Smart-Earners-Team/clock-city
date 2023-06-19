// SPDX-License-Identifier: MIT
// Forged in SVG by EVMlord for Clock City.
pragma solidity ^0.8.19;

interface ICCDO {
    function constructTokenURI(
        uint256 I,
        address q,
        address r,
        uint256 w,
        uint256 x
    ) external view returns (string memory);
}

contract ClockCityMetadata {
    ICCDO Descriptor;

    constructor(ICCDO addr) {
        Descriptor = addr;
    }

    function constructTokenURI(
        uint256 tokenID,
        address seed,
        address holder,
        uint256 w,
        uint256 x
    ) public view returns (string memory) {
        return Descriptor.constructTokenURI(tokenID, seed, holder, w, x);
    }

    function randNum()
        public
        view
        returns (
            uint256[12] memory randIDs,
            uint256[12] memory randW,
            uint256[12] memory randX
        )
    {
        uint256 T = 8;

        for (uint256 i = 0; i < 12; i++) {
            randIDs[i] = (block.timestamp * T) % 999;
            randW[i] = (block.timestamp * T) % 24;
            randX[i] = (block.timestamp - T) % 3;

            T++;
        }
        return (randIDs, randW, randX);
    }

    function randAddr()
        public
        view
        returns (address[12] memory seedsArr, address[12] memory holdersArr)
    {
        uint256 T = 1;

        (, uint256[12] memory aB, ) = randNum();

        for (uint256 i = 0; i < 12; i++) {
            seedsArr[i] = address(
                uint160(
                    uint256(
                        keccak256(
                            abi.encodePacked(
                                blockhash(block.number - aB[i]),
                                block.number * T
                            )
                        )
                    )
                )
            );
            holdersArr[i] = address(
                uint160(
                    uint256(
                        keccak256(
                            abi.encodePacked(
                                blockhash(block.number - (aB[i] * 2)),
                                block.chainid * T
                            )
                        )
                    )
                )
            );

            T++;
        }

        return (seedsArr, holdersArr);
    }

    function generateBulkData()
        public
        view
        returns (
            uint256[12] memory tokenID,
            address[12] memory seed,
            address[12] memory holder,
            uint256[12] memory w,
            uint256[12] memory x
        )
    {
        (tokenID, w, x) = randNum();
        (seed, holder) = randAddr();
    }

    function homeAddr() public view returns (address[8] memory Addresses) {
        uint256 T = 7;
        for (uint256 i = 0; i < 8; i++) {
            Addresses[i] = address(
                uint160(
                    uint256(
                        keccak256(
                            abi.encodePacked(
                                blockhash(block.number - T),
                                block.timestamp * T
                            )
                        )
                    )
                )
            );
            T++;
        }
    }
}
