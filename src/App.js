import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "Buyn",
      todoItem: [{ action: 'learn react', done: false },
      { action: 'learn english', done: false },
      { action: 'learn java', done: true }],
      newItemtext: ''
    }
  }
  updateTextValue = (event) => {
    this.setState({
      newItemtext: event.target.value
    })
  }
  createNewTodo = () => {
    if (!this.state.todoItem.find(item => item.action === this.state.newItemtext) && this.state.newItemtext.length != 0) {
      this.setState({
        todoItem: [...this.state.todoItem, { action: this.state.newItemtext, done: false }]
        , newItemtext: ''
      })
    }
  }
  togleTodo = (todo) => {
    this.setState({
      todoItem: this.state.todoItem.map(item => item.action === todo.action
        ? { ...item, done: !item.done } : item)
    });
  }

  todoTableRows = () => this.state.todoItem.map(item =>
    <tr key={item.action}>
      <td>{item.action}</td>
      <td>
        <input type="checkbox" checked={!item.done}
          onChange={() => this.togleTodo(item)} />
      </td>
    </tr>
  )
  changeData = () => {
    this.setState({ userName: this.state.userName === "Buyn" ? "Bob" : "Buyn" })
  }
  render = () => {
    return (
      <div>
        <h4 className="bg-primary text-white text-center p-2">{this.state.userName}'s Todo List</h4>
        <button onClick={this.changeData} className="btn btn-primary m-2">Change</button>
        ({this.state.todoItem.filter(t => !t.done).length} items to do)
        <div className="container-fluid">
          <div className="my-1">
            <input className="form-control" value={this.state.newItemtext}
              onChange={this.updateTextValue} />
            <button className="btn, btn-primary mt-1" onClick={this.createNewTodo}>Add Todo</button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{this.todoTableRows()}</tbody>

          </table>
        </div>
      </div>
    )
  }
}
