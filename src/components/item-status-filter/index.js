import React, { Component } from 'react';
import './style.css';
export default class ItemStatusFilter extends Component {

  buttons = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttonsStatus = this.buttons.map(({ id, label }) => {
      const isActive = filter === id;
      const clazz = isActive ? 'btn-info' : 'btn-outline-info';

      return (
        <button type='button'
          className={`btn ${clazz}`}
          key={id}
          onClick={() => onFilterChange(id)}>
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttonsStatus}
      </div>
    );
  };
}
