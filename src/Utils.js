import React, { /*Component*/ } from 'react';
import namor from "namor";
import "./index.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}


export const TextField = ({onChange, value}) => <input type="text" value={value} onChange={onChange} style={{color: 'black', fontSize: '16px' ,height: '30px', width: '500px', flex: 4}}/>


export const Button = ({onClick, value, style}) => {
    return  <input type="button" value={value} onClick={onClick} style={{color: 'white', backgroundColor: '#3dce3d', fontSize: '16px', height: '35px', flex: 1, ...style}}></input>
}

// export class Button extends Component {
//     render() {
//         return <button onClick={this.props.onClick} style={{color: 'white', backgroundColor: '#3dce3d', fontSize: '16px', height: '35px', flex: 1}}>
//                     SUBMIT
//                 </button>
//     }
// }