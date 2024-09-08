var a = [
  [15, 13, 11, 41, 53],
  [16, 12, 23, 42, 51],
  [19, 17, 18, 44, 55],
  [21, 1, 27, 43, 52],
  [24, 31, 32, 45, 56],
];
var rows = 5;
var cols = 5;

function getLocation(target: number) {
  var currentx = 0,
    currenty = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] == target) {
        currentx = i;
        currenty = j;
      }
    }
  }
  return [currentx, currenty];
}

function regeneratePath(parents: Array<number>) {
  var path = [];
  path.push(1);
  var tocheck = parents[parents.length - 1];

  for (let i = parents.length - 1; i >= 1; i--) {
    var current = getLocation(tocheck);
    var currentneighbours = getNeighbours(current[0], current[1]);
    if (currentneighbours.includes(parents[i - 1])) {
      path.push(tocheck);
      tocheck = parents[i - 1];
    }
  }
  path.push(a[0][0]);
  return path.reverse();
}

function getNeighbours(x: number, y: number) {
  var neighbours = [];
  if (x + 1 < rows) {
    neighbours.push(a[x + 1][y]);
  }
  if (y + 1 < cols) {
    neighbours.push(a[x][y + 1]);
  }
  if (x - 1 > -1) {
    neighbours.push(a[x - 1][y]);
  }
  if (y - 1 > -1) {
    neighbours.push(a[x][y - 1]);
  }
  return neighbours;
}
var queue: Array<number> = [];
var visited: Array<number | null | undefined> = [];
var currenttracker: Array<number> = [];
function advance(startx: number, starty: number) {
  queue.push(a[startx][starty]);
  while (queue.length != 0) {
    var current = queue.shift();
    currenttracker.push(current!);
    if (!visited.includes(current) && current != 19) {
      visited.push(current);
      console.log(current);
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
          if (a[i][j] == current) {
            startx = i;
            starty = j;
          }
        }
      }
      var nvs = getNeighbours(startx, starty);
      for (let i = 0; i < nvs.length; i++) {
        queue.push(nvs[i]);
        console.log(queue);
        if (nvs[i] == 1) {
          return "Found!";
        }
      }
    }
  }
}
function Display() {
  return (
    <div className={"grid grid-rows-" + rows + " grid-cols-" + cols}>
      {a.map((array, index1) => {
        return (
          <>
            {array.map((element, index2) => {
              return (
                <span key={index2} className={"border active:bg-green-200"}>
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
console.log(advance(0, 0));
console.log(currenttracker);

console.log("yellow");
console.log(regeneratePath(currenttracker));

export default Display;
