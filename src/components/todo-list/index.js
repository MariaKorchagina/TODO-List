

import TodoListItem from "../todo-list-item/index";
import "./style.css";
import React, { Component } from "react";

export default class TodoList extends Component {
    render() {
        const elements = this.props.todos.map((item) => {
            const { ...itemProps } = item;
            return (
                <li className="list-group-item" key={itemProps.id}>
                    <TodoListItem
                        {...itemProps}
                        onItemUpdated={this.props.onItemUpdated}
                        onItemDeleted={this.props.onItemDeleted}
                    />
                </li>
            );
        });
        return <ul className="list-group todo-list">{elements}</ul>;
    }
}
