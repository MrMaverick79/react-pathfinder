import { useState } from 'react';

function GridSquare () {

    const [start, setStart] = useState(true)

    function addPoints(e){
        
        if(start){
            e.target.classList.add("start")
            setStart(false);

        } else {
            e.target.classList.add("end")
            setStart(true);
        }
        

    }

    return(

        <div className="square" onClick={addPoints}>
                        
        </div>

    )

}


export default GridSquare