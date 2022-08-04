// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract List {
//     struct Task {
//         string title;
//         string deadline;
//     }

//     Task[] public tasks;
//     function addTask(string memory _title, string memory _deadline) public {
//         tasks.push(Task(_title, _deadline));
//     }

//     function removeTask(uint idx) public {
//         delete tasks[idx];
//     }

//     function totaltasks() public view returns(uint) {
//         return tasks.length;
//     }

//     function getTasks() public view returns(Task[] memory) {
//         return tasks;
//     }
// }
//Address: 0xD6c1F647DA80e078c3F48e3e7e3B6aE159862d98

pragma solidity ^0.8.0;

contract List {
    uint256 n = 0;
    struct Task {
        string title;
        string deadline;
        uint256 idx;
    }

    Task[] public tasks;

    function addTask(string memory _title, string memory _deadline) public {
        uint256 _idx = n;
        tasks.push(Task(_title, _deadline, _idx));
        n++;
    }

    function removeTask(uint256 _idx) public {
        delete tasks[_idx];
    }

    function totaltasks() public view returns (uint256) {
        return tasks.length;
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }
}
