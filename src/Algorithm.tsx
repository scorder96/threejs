// var a = [
//   [15, 13, 11, 41, 53],
//   [16, 12, 23, 42, 51],
//   [19, 17, 18, 44, 55],
//   [21, 1, 27, 43, 52],
//   [24, 31, 32, 45, 56],
// ];

import { useState } from "react";

var rows = 20;
var cols = 15;

let a: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

// a[2][2] = 69;

// for (let i = 0; i < rows; i++) {
//   for (let j = 0; j < cols; j++) {
//     a[i][j] == undefined ? (a[i][j] = 0) : (a[i][j] = 0);
//   }
// }

function isArrayInArray(arr: Array<Array<number>>, item: Array<number>) {
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

function regeneratePath(parents: Array<Array<number>>) {
  var path: Array<Array<number>> = [[]];
  path.push(targetlocklocation);
  var tocheck: Array<number> = parents[parents.length - 1];

  for (let i = parents.length - 1; i >= 1; i--) {
    var currentneighbours = getNeighbours(tocheck[0], tocheck[1]);
    // console.log(currentneighbours);
    // console.log(parents[i - 1]);

    if (isArrayInArray(currentneighbours, parents[i - 1])) {
      path.push(tocheck);
      tocheck = parents[i - 1];
    }
  }
  path.push([0, 0]);
  return path.reverse();
}

function getNeighbours(x: number, y: number) {
  var neighbours = [];
  if (x + 1 < rows) {
    neighbours.push([x + 1, y]);
  }
  if (y + 1 < cols) {
    neighbours.push([x, y + 1]);
  }
  if (x - 1 > -1) {
    neighbours.push([x - 1, y]);
  }
  if (y - 1 > -1) {
    neighbours.push([x, y - 1]);
  }
  return neighbours;
}
var queue: Array<Array<number>> = [];
var visited: Array<Array<number>> = [];
var currenttracker: Array<Array<number>> = [];
var targetlocklocation: Array<number>;
function advance(startx: number, starty: number) {
  queue = [];
  visited = [];
  currenttracker = [];
  queue.push([startx, starty]);
  while (queue.length != 0) {
    var current: Array<number> = queue.shift()!;
    currenttracker.push(current);
    if (!isArrayInArray(visited, current)) {
      visited.push(current);
      // console.log(current);
      var nvs = getNeighbours(current[0], current[1]);
      for (let i = 0; i < nvs.length; i++) {
        var neighbour = nvs[i];
        if (a[neighbour[0]][neighbour[1]] != 1) {
          queue.push(neighbour);
          // console.log(queue);
          if (a[neighbour[0]][neighbour[1]] == 69) {
            targetlocklocation = [neighbour[0], neighbour[1]];
            return "Found!";
          }
        }
      }
    }
  }
}
function Display() {
  const [Navigate, setNavigate] = useState(false);
  const [Xvalue, setXvalue] = useState(Number);
  const [Yvalue, setYvalue] = useState(Number);

  function navigate() {
    a = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    a[Xvalue][Yvalue] = 69;
    console.log(a[0][0]);

    console.log(a[Xvalue][Yvalue]);

    advance(14, 14);
  }
  function CustomClass(i1: number, i2: number) {
    // console.log(i1, i2);
    if (
      isArrayInArray(regeneratePath(currenttracker), [i1, i2]) &&
      (i1 = i2) !== 0 &&
      Navigate
    ) {
      return "bg-red-500";
    }
    // if (i1 == 14 && i2 == 9 && Navigate) {
    //   return "bg-blue-500";
    // }
  }
  function checkNavigate() {
    if (Navigate == false) {
      return "pointer-events-none";
    }
  }
  return (
    <>
      <button
        className="text-xl absolute z-10 bg-black text-white p-4 rounded m-4"
        onClick={() => {
          setNavigate(!Navigate);
          console.log(Xvalue, Yvalue);

          navigate();
        }}
      >
        {Navigate ? "Exit Navigation" : "Navigate"}
      </button>
      <input
        className="text-sm absolute bg-black text-white z-10 p-4 rounded m-4 mt-20 w-14"
        type="number"
        placeholder="X"
        value={Xvalue}
        onChange={(e) => setXvalue(parseInt(e.target.value))}
      />
      <input
        className="text-sm absolute bg-black text-white z-10 p-4 rounded m-4 mt-20 ms-24 w-14"
        type="number"
        placeholder="Y"
        value={Yvalue}
        onChange={(e) => setYvalue(parseInt(e.target.value))}
      />
      <div
        className={
          "grid grid-cols-[repeat(15,_minmax(0,_1fr))] grid-rows-[repeat(20,_minmax(0,_1fr))] opacity-90 absolute w-full h-full " +
          checkNavigate()
        }
      >
        {a.map((row, index1) =>
          row.map((cell, index2) => {
            return (
              <span
                key={index2}
                className={"text-white text-opacity-0 " + CustomClass(index1, index2)}
                onFocus={() => console.log("HELLO")}
              >
                {cell}
              </span>
            );
          })
        )}
      </div>
    </>
  );
}

// console.log(currenttracker);

// console.log("yellow");

// console.log(regeneratePath(currenttracker));
// console.log(currenttracker);

export default Display;
