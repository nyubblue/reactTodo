import React, { Component } from "react";
import { TodoBanner } from './components/TodoBanner'
import { TodoCreator } from './components/TodoCreator'
import { TodoRow } from './components/TodoRow'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.togleCheckbox = this.togleCheckbox.bind(this)
    this.state = {
      userName: 'Buyn',
      todoItem: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: false }]
    }
  }
  createNewTodo = (task) => {
    if (!this.state.todoItem.find(item => item.action === task) && task.length != 0) {
      this.setState({
        todoItem: [...this.state.todoItem, { action: task, done: false }]
      })
    }
  }

  togleCheckbox(item) {
    this.setState({
      todoItem: this.state.todoItem.map(todo => todo.action === item.action ? { action: item.action, done: !todo.done } : todo)
    })
  }

  todoTableGen = () => this.state.todoItem.map(item => <TodoRow callback={this.togleCheckbox} key={item.action} item={item} />)
  render = () =>
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItem} />
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>
            {this.todoTableGen()}
          </tbody>
        </table>
      </div>
    </div>
}
