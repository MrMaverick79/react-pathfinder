import './App.css';
import { useEffect, setState  } from 'react';
import { GridPoint, pathfinder, grid } from './components/pathfinder';
import GridSquare from './components/gridSquare';



const App = () => {
  
  pathfinder()
  console.log('Grid', grid); //take variables?

  const gridDisplay = (grid) => {
    let gridContents = []
    for (let i = 0; i < grid.length; i++) {
      gridContents.push(grid[i].map(()=> <GridSquare/>))
      gridContents.push(<br></br>)
      
      
      
      
    }
    return gridContents

  }

  return(
    <div className='app'>

      {
       gridDisplay(grid) 
        // grid.map((el)=>  el.map(()=> <GridSquare/>))
      }



    </div>


  )


};




export default App;
