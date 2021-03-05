import React, { Component } from "react"

export class TodoCreator extends Component {
    constructor(props) {
        super(props)
        this.state = { newItemText: '' }
        this.updateText = this.updateText.bind(this)
    }
    createTodo = () => {
        this.props.callback(this.state.newItemText)
        this.setState({ newItemText: '' })
    }

    updateText(e) {
        this.setState({newItemText: e.target.value})
    }

    render = () =>
        <div className="my-1">
            <input className="form-control" value={this.state.newItemText}
                onChange={this.updateText}
            />
            <button className='btn btn-primary mt-1' onClick={this.createTodo}>Add</button>
        </div>
}