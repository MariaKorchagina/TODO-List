import React, { Component } from "react";
import AppHeader from "../app-header";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import "./style.css";
import routes from '../../routes.js';
import axios from "axios";
export default class App extends Component {

    state = {
        todoData: [],
        filter: 'all',
    };

    componentDidMount() {
        this.onItemUpdated()
    }

    onItemUpdated = () => {
        axios.get(routes.todosPath()).then((resp) => {
            this.setState({ todoData: resp.data })
        })
            .catch(function (error) {
                console.log("network error" + error);
            });
    };

    addItem = (label) => {
        axios.post(routes.todosPath(), { label: label, done: false }).then((resp) => {
            let newItem = {
                id: resp.data.id,
                label: resp.data.label,
                done: resp.data.done
            }
            this.setState(({ todoData }) => {
                const newArray = [...todoData, newItem];
                return {
                    todoData: newArray,
                };
            });
        });
    }

    onItemDeleted = (id) => {
        const withoutDeletedItem = this.state.todoData.filter((el) => el.id !== id);
        this.setState({
            todoData: withoutDeletedItem
        });
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const { todoData, filter } = this.state;
        const visibleItems = this.filter(todoData, filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader
                    toDo={todoCount}
                    done={doneCount} />
                <div className="top-panel d-flex">
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>
                <TodoList
                    todos={visibleItems}
                    onItemUpdated={this.onItemUpdated}
                    onItemDeleted={this.onItemDeleted}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }
}
