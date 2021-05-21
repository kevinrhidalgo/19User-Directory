import React from "react";

function Results(props) {
  return (
    <table className="table">

      
      {props.results.map(result => (
        <table>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
        </table>
      ))}
  
    </table>
  );
}

export default Results;