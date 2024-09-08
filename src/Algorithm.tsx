// var a = [
//   [15, 13, 11, 41, 53],
//   [16, 12, 23, 42, 51],
//   [19, 17, 18, 44, 55],
//   [21, 1, 27, 43, 52],
//   [24, 31, 32, 45, 56],
// ];
var a = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 69, 0, 0],
  [0, 0, 0, 0, 0],
];

var rows = 5;
var cols = 5;

// for (let i = 0; i < rows; i++) {
//   for (let j = 0; j < cols; j++) {
//     a[i][j]=0
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
  queue.push([startx, starty]);
  while (queue.length != 0) {
    var current: Array<number> = queue.shift()!;
    currenttracker.push(current);
    if (!visited.includes(current!)) {
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
  function CustomClass(i1: number, i2: number) {
    // console.log(i1, i2);
    if (isArrayInArray(regeneratePath(currenttracker), [i1, i2])) {
      return "bg-red-200";
    }
  }
  return (
    <div
      className={
        "grid grid-rows-" +
        rows +
        " grid-cols-" +
        cols +
        " opacity-90 absolute w-full h-full pointer-events-none"
      }
    >
      {a.map((array, index1) => {
        return (
          <>
            {array.map((element, index2) => {
              return (
                <span
                  key={index2}
                  className={"border active:bg-green-200 " + CustomClass(index1, index2)}
                >
                  {element}
                </span>
              );
            })}
          </>
        );
      })}
    </div>
  );
}
advance(0, 0);
// console.log(currenttracker);

// console.log("yellow");

// console.log(regeneratePath(currenttracker));
// console.log(currenttracker);

export default Display;
