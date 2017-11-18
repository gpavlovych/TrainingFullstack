import React, { Component } from 'react';

class SummaryItem extends Component {

    render() {
        return (
            <div>
                <header className="Summary-header">{this.props.title}</header>
                <span className="Summary-body">{this.props.value}</span>
                <footer className="Summary-footer">{this.props.startDate} - {this.props.endDate}</footer>
            </div>);
    }
}

export default SummaryItem;