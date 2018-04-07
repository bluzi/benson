import React from 'react';

class ListItem extends React.Component {
    render() {
        return (
            <li onClick={this.props.onClick} onMouseOver={this.props.onMouseOver} className={this.props.isSelected ? 'selected' : ''}>
                <img src={`dist/icons/${this.props.type}.png`} /> {this.props.description}
                <span className="type">{this.props.type}</span>
                <span className="command">Ctrl + {this.props.index + 1}</span>
            </li>
        );
    }
}

export default ListItem;