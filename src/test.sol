pragma solidity ^0.8.0;

contract Test {
    bytes32 public target;
    uint64 public nonce;
    bytes32 public previousBlockHash;
    uint public timestamp;

    function mine() public returns (uint64) {
        // uint16 iterations = 16;

        bytes32 hash;
        for(uint i = 0; i < 4096*3; i++) {
            nonce++;
            hash = sha256(abi.encodePacked(previousBlockHash, timestamp, nonce));
            if(hash <= target) return nonce;
        }

        return 0;
    }

    constructor (bytes32 _previousBlockHash, uint _timestamp, bytes32 _target, uint64 _nonce) {
        previousBlockHash = _previousBlockHash;
        timestamp = _timestamp;
        target = _target;
        nonce = _nonce;

        bytes memory _abiEncodedData = abi.encode(mine());

        assembly {
            // Return from the start of the data (discarding the original data address)
            // up to the end of the memory used
            let dataStart := add(_abiEncodedData, 0x20)
            return(dataStart, sub(msize(), dataStart))
        }
    }
}