import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
//
import { Button, TextField } from "./Utils";
import axios from 'axios';


/* queries

  update item SET price = '10.3' where itemNumber = '2'    
  INSERT INTO item (itemNumber, price) VALUES (0, 0)  
  delete from item where itemNumber = '0'

*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: 'Enter a SQL query',
      columns: [],
      query: 'SQL query',
      isSelect: false
    };

    // this.updateInput = this.updateInput.bind(this);
  }

  alert1 = () => alert(this.state.query);

  getData = () => {
    if (!this.state.query) 
      return;

    console.log(this.state.query)
    axios.get('https://ids520db.herokuapp.com/query/' + this.state.query)
      .then(response => {
          console.log(response.data);

          // if error
          if(response.data.error) {
              this.setState(({ data: response.data.error, columns: '', isSelect: false}));
              return alert(response.data.error);
          }

          var returnData = '';
          let setColumns = [];
          const isSelect = this.state.query.toLowerCase().includes('select');
          if (isSelect) {
              Object.keys(response.data[0]).forEach(key => {
                setColumns.push({
                  Header: key,
                  accessor: key
                })
              })

              returnData = response.data;
          } else {
              returnData = JSON.stringify(response.data);
          }

          // else show data
          this.setState(state => {
            return ({ data: returnData, columns: setColumns, isSelect})
          }) 
      })
      .catch(error => {
          console.log(error);
          this.setState(state => {
            return ({ data: error.message, columns: '', isSelect: false})
          }) 
      });
  }

  clearData = () => {
    this.setState(state => {
      return ({ data: 'Enter a SQL query', isSelect: false, columns: '', query: '' })
    })
  }

  updateInput = (event) => this.setState(({ query: event.target.value}));

  
  render() {
    const { data, columns, isSelect } = this.state;
    return (
      <div style={{margin: 'auto', textAlign: 'center'}}>

        <h1> IDS 520 - Group 3</h1>
        <div style={{display: 'flex', margin: '5px',border: '2px solid #ececec'}}>
          <TextField value={this.state.query} onChange={this.updateInput}/>
          <Button value={'SUBMIT'} onClick={this.getData}/>
          <Button value={'CLEAR'} onClick={this.clearData} style={{backgroundColor: 'red'}}/>
        </div>
        <br />
        <br />
       
        {this.state.data !== '' && isSelect ?
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        : <p>{data}</p> }
        
      </div>
    );
  }
}

export default App;
