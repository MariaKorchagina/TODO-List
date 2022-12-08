
import React, { Component } from "react";
import "./style.css";

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLableChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>
                <input type="text"
                    className="form-control"
                    onChange={this.onLableChange}
                    placeholder="What are you going to do?"
                    value={this.state.label} />
                <button className="btn btn-info button-add-item">
                    Add Item
                </button>
            </form>
        );
    }
}