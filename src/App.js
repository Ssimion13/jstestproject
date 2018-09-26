import React, { Component } from 'react';
import './App.css';
import customers from "./customers.json";


class App extends Component {
  constructor(){
    super();
    this.state = {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      ip: "",
      latitude: "",
      longitude: "",
      created_at: "",
      updated_at: "",
      clientList: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.clear= this.clear.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  search(id, email, first_name, last_name, ip, latitude, longitude, created_at, updated_at){
    this.clear();
    var results = []
    var searchValues = {
      id: id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      ip: ip,
      latitude: latitude,
      longitude: longitude,
      created_at: created_at,
      updated_at: updated_at,

    }

    for(var item in searchValues){
      if(searchValues[item] === "" || searchValues[item].isNaN){
        delete searchValues[item];
      }
      //accounting for null results 
      if(searchValues[item] ==="null"){
        searchValues[item] = null;
      }
    }
    var clientList = customers.filter(function(el){
      let size = Object.keys(searchValues).length;
      let comparisonChecker = 0;
      for(var item in searchValues){
        if(typeof el[item] === "number"){
          //since the ID's, longitudes and latitudes are in numbers in the data, have to convert to number to be strictly compared with ===.
          searchValues[item] = Number(searchValues[item], 10) 
        }
        if(typeof el[item] === "string" && !/[^a-zA-Z]/.test(el[item])){
          searchValues[item] = searchValues[item].charAt(0).toUpperCase() + searchValues[item].slice(1);
        }
        if(el[item] === searchValues[item]){
          comparisonChecker++;
        }
      }
        if(comparisonChecker === size){
          return el;
        }
        comparisonChecker = 0;
      return false;
      })
      results.push(clientList);
      this.setState({
        clientList: clientList
      })
  }

  clear(){
    this.setState({
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      ip: "",
      latitude: "",
      longitude: "",
      created_at: "",
      updated_at: "",
      clientList: []
    })
  }

  render() {
    var mappedResults = this.state.clientList.map(client => {
      console.log(client.updated_at)
      return(
        <div className="mappedResults" key={client.id}>
          <h2 className="userInformation"> {client.first_name} {client.last_name} </h2>
          <div className="userInformation"> ID: {client.id} </div> 
          <div className="userInformation"> Email: {client.email} </div>
          <div className="userInformation"> IP: {client.ip} </div>
          <div className="userInformation"> Latitude: {client.latitude} </div>
          <div className="userInformation"> Longitude: {client.longitude} </div>
          <div className="userInformation"> Date Created: {client.created_at} </div>
          
          {client.created_at === null ?
          /*must declare as object because JS reads null as an object */
          <div> Date Updated: {client.updated_at} </div>
          :
          <div> Status: Up to Date (No recent updates) </div> 
          }
        </div>
      )
      })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Database Search</h1>
        </header>
        <div className="searchBoxDiv">
          <h1> Search By: </h1>
          <div className="inputHolder">
            <input className="input" placeholder="ID"  value={this.state.id} onChange={this.handleChange} name="id"  />
            <input className="input" placeholder="Email Address" value={this.state.email}  onChange={this.handleChange} name="email" />
            <input className="input" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} name="first_name" />
            <input className="input" placeholder="Last Name" value={this.state.last_name}  onChange={this.handleChange} name="last_name" />
            <input className="input" placeholder="IP" value={this.state.ip} onChange={this.handleChange} name="ip" />
            <input className="input" placeholder="Latitude" value={this.state.latitude}  onChange={this.handleChange} name="latitude" />
            <input className="input" placeholder="Longitude" value={this.state.longitude} onChange={this.handleChange} name="longitude" />
            <input className="input" placeholder="Created At" value={this.state.created_at} onChange={this.handleChange} name="created_at" />
            <input className="input" placeholder="Updated At"value={this.state.updated_at}  onChange={this.handleChange} name="updated_at" />
            <button className="searchButton" onClick={()=>{this.search(this.state.id, this.state.email, this.state.first_name, this.state.last_name, this.state.ip, this.state.latitude, this.state.longitude,
              this.state.created_at, this.state.updated_at )}}> Search </button>
          </div>
        </div>
        {this.state.clientList.length > 0 ?
        <div className="mappedResultsDiv">
            <h1> Search Results: </h1>
          {mappedResults}
          </div>
          : null}
      </div>
    );
  }
}

export default App;
