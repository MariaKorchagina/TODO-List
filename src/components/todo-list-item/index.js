import axios from "axios";
import React, { Component } from 'react';
import './style.css';
import routes from '../../routes.js';
export default class TodoListItem extends Component {

    state = {
        label: this.props.label,
        done: this.props.done,
        editMode: false,
    };

    editItem = () => {
        this.setState({
            label: this.props.label,
            editMode: !this.state.editMode
        })
    }

    saveEditItem = () => {
        if (this.state.editMode) {
            axios.put(routes.editPath(this.props.id), { label: this.state.label, done: this.props.done })
                .then(() => {
                    this.setState({
                        editMode: false,
                    })
                    this.props.onItemUpdated()
                })
                .catch(function (error) {
                    console.log("network error" + error);
                });
        }
    }

    markAsDone = () => {
        axios.put(routes.editPath(this.props.id), { label: this.state.label, done: !this.props.done })
            .then((response) => {
                this.setState({
                    done: response.data.done
                })
                this.props.onItemUpdated()
            })
            .catch(function (error) {
                console.log("network error" + error);
            });
    }

    onEditChange = (updated) => {
        this.setState({
            label: updated.target.value
        });
    };

    onDelete = () => {
        let id = this.props.id
        axios.delete(routes.editPath(id))
            .then(() => {
                this.props.onItemDeleted(id);
            })
            .catch(function (error) {
                console.log("network error" + error);
            });
    };

    render() {
        const { id, done } = this.props;
        let classNames = 'todo-list-item';
        let checkBoxId = 'todo-list-item-marked' + id;
        if (done) {
            classNames += ' done';
        }
        return (
            <div className={classNames}>
                {this.state.editMode ?
                    <input
                        ref={this.input}
                        className="typeIn"
                        type="text"
                        onChange={this.onEditChange}
                    />
                    :
                    <div className="todo-list-item-label">
                        <label htmlFor="todo-list-item-marked">
                            <input
                                type="checkbox"
                                id={checkBoxId}
                                className="todo-list-item-checkbox"
                                defaultChecked={done}
                                onClick={this.markAsDone} >
                            </input>
                        </label>
                        {this.state.label}
                    </div>
                }
                <div className='wrapper-button'>
                    {this.state.editMode ?
                        <div>
                            <button type="button"
                                className="btn btn-outline-info btn-sm float-right"
                                onClick={this.saveEditItem}>Save
                            </button>
                            <button type="button"
                                className="btn btn-outline-secondary btn-sm float-right"
                                onClick={this.editItem}>Cancel
                            </button>
                        </div>
                        :
                        <button type="button"
                            className="btn btn-outline-info btn-sm float-right"
                            onClick={this.editItem}>Edit
                        </button>
                    }
                    <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={this.onDelete}>Delete
                    </button>
                </div>
            </div>
        );
    };
}
