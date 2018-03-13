import React, { Component } from "react";
import { connect } from "react-redux";
import { getPeople, addPerson, deletePerson } from "./ducks/peopleReducer";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPerson: ""
    };

    this.onAddPersonHandler = this.onAddPersonHandler.bind(this);
    this.onGetPeopleHandler = this.onGetPeopleHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onAddPersonHandler() {
    this.props.addPerson(this.state.newPerson);
  }

  onChangeHandler(e) {
    this.setState({ newPerson: e.target.value });
  }

  onDeletePersonHandler(index) {
    this.props.deletePerson(index);
  }

  onGetPeopleHandler() {
    this.props.getPeople();
  }

  render() {
    console.log(this.props);
    let display = <p>Add A New Person</p>;
    if (this.props.loading) {
      display = <h1>LOADING STARWARS CHARACTERS</h1>;
    }
    if (this.props.people.length !== 0) {
      display = this.props.people.map((person, index) => {
        return (
          <p onClick={() => this.onDeletePersonHandler(index)}>{person}</p>
        );
      });
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input onChange={this.onChangeHandler} type="text" />
        <button onClick={this.onAddPersonHandler}>Add Person</button>
        <button onClick={this.onGetPeopleHandler}>Get People</button>

        {display}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { people } = state;
  return {
    people
  };
}

export default connect(mapStateToProps, { getPeople, addPerson, deletePerson })(
  App
);
