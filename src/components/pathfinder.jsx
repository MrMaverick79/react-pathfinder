//Brief: Create a pathfinding program in js that finds the shortest path from point A to point B in a 2 dimensional grid

//Then represent the path using HTML and CSS


// A* search algorithm
//What A* Search Algorithm does is that at each step it picks the node according to a value-‘f’ which is a 
//parameter equal to the sum of two other parameters – ‘g’ and ‘h’. At each step it picks the node/cell having the lowest ‘f’, and process that node/cell.

// A* Search Algorithm
// 1.  Initialize the open list
let openList = [];
// 2.  Initialize the closed list
let closedList = [];
//     put the starting node on the open 
//     list (you can leave its f at zero)

let start;
let end;
let path = [];

//This is seet to Manhattan distance. 
//TODO: develop heuristics for diagonal etc.
// See  https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function heuristic( pos0, pos1 ){
    let d1 = Math.abs(pos1.x - pos0.x)
    let d2 = Math.abs(pos1.y - pos0.y)

    return d1 + d2
}


//Create gridpoints as a class
export class GridPoint{
    constructor( x, y ) {

        //A constructor function to create all grid points
        //with the necessary details
        this.x = x; //x location
        this.y = y; //y location
        this.f = 0; //track the cost of the movement
        this.g = 0;  //used in A* 
        this.h = 0; // used in A*
        this.neighbours = []; //which positions are adjacent?
        this.parent = undefined; //where did we just come from?
    }

    createNeighbours = function( grid ) { //adds all of the neighbouring squares to the neighbours list

        let i = this.x;
        let j = this.y;

        if(i < cols - 1){
          
         this.neighbours.push(grid[i + 1][j])
         
        }

        if(i > 0){
            
            this.neighbours.push(grid[i - 1 ][j])
        }

        if(j < rows - 1){
            
            this.neighbours.push(grid[i][j + 1 ])
        }

        if(j > 0 ){
            
            this.neighbours.push(grid[i][j - 1 ]);
        }

    }

}

//establish a grid
export let grid = [];
const rows = 4; //TODO: base these off use input
const cols = 4;


function init() {
    //initialise the grid
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
      }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new GridPoint(i, j)
            
        }
        
    }; 
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].createNeighbours(grid);
        }
    }; //this completes a grid with neighbours prefilled

    start = grid[0][0]
    end = grid[rows-1][cols-1]

    openList.push(start)


    //console.log(grid);  //TODO: Testing remove


} //end init()


export function pathfinder() {
    init(); //establishes the grid
    
    while (openList.length > 0){ // 3.  while the open list is not empty
//assumes the lowest index if the first
        let lowestIndex = 0;

// a) find the node with the least f on 
//        the open list
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowestIndex].f){
                lowestIndex = i
            }
            
        }   
        let current = openList[lowestIndex];

//     c) generate q's 8 successors and set their 
//        parents to q //!This is done in the Grid class itself

//     d) for each successor
//         i) if successor is the goal, stop search
        if ( current === end){
            let temp = current;
            path.push(temp);
            while(temp.parent){ //That is, while there is still parents 
                path.push(temp.parent)
                temp = temp.parent //moving 'up' the chain to each parent - similar to when using a linked list
            } 
            console.log('Path found');
            return path.reverse();

        }

        //remove current from openList
        openList.splice(lowestIndex, 1);
        //add current to closedList
        closedList.push(current);
        
//         ii) else, compute both g and h for successor
//           successor.g = q.g + distance between 
//                               successor and q
//           successor.h = distance from goal to 
//           successor 
          
//           successor.f = successor.g + successor.h

//         iii) if a node with the same position as 
//             successor is in the OPEN list which has a 
//            lower f than successor, skip this successor

//         iV) if a node with the same position as 
//             successor  is in the CLOSED list which has
//             a lower f than successor, skip this successor
//             otherwise, add  the node to the open list
//      end (for loop)
  
//     e) push q on the closed list
//     end (while loop)

        let neighbours = current.neighbours;

        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];

            if(!closedList.includes(neighbour)){
                let possibleG = current.g + 1;

                if(!openList.includes(neighbour)){
                    openList.push(neighbour);
                } else if (possibleG >= neighbour.g){
                    continue;
                }

                neighbour.g = possibleG;
                neighbour.h = heuristic(neighbour, end) //TODO: add other heuristics
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.parent = current

            }
            
        }






    } //end while loop

    //No solution (default)
    return [];
    
}






 

   


