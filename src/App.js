import React, { Component } from "react";
import { TodoBanner } from './components/TodoBanner'
import { TodoCreator } from './components/TodoCreator'
import { TodoRow } from './components/TodoRow'
import { VisibilityControl } from './components/VisibilityControl'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.togleCheckbox = this.togleCheckbox.bind(this)
    this.state = {
      userName: 'Buyn',
      todoItem: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: false }],
      showCompleted: true
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

  todoTableGen = (doneValue) => this.state.todoItem.filter(t => t.done === doneValue)
    .map(item => <TodoRow callback={this.togleCheckbox} key={item.action} item={item} />)

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
            {this.todoTableGen(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description='Completed Tasks'
            isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })}
          />
        </div>
        {this.state.showCompleted &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{this.todoTableGen(true)}</tbody>
          </table>
        }
      </div>
    </div>
}
