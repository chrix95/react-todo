import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Todos from './components/Todos'
import About from './components/pages/About'
// import {v4 as uuidv4} from 'uuid'
import './App.css'
import axios from 'axios';

class App extends Component {
  state = {
    todos: [],
    loading: false
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((result) => {
        this.setState({ todos: result.data })
      }).catch((err) => {
        console.log(err)
      });
  }
  // mark todo as complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }) })
  }
  // Delete todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((result) => {
          this.setState({ todos: [...this.state.todos.filter((todo) => todo.id !== id)] })
        })
  }
  // Add Todo
  addTodo = (title) => {
    if (this.validateTodo(title)) {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
        .then((result) => {
          this.setState({ todos: [...this.state.todos, result.data] })
        })
    } else {
      alert('Todo title is requireed')
    }
  }
  validateTodo (title) {
    return title !== "" ? true : false
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
