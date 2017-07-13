import React from 'react'

export default class SequenceTableCell extends React.Component {

  render() {
    var className = "";
    if (this.props.isActive) {
      className += "active "
    }
    if (this.props.note) {
      className += "hasNote "
    }
    return ( <td className={className}
      onClick={this.props.handleClick}>{
        this.props.note ? '\u2B24' : ''
      }</td> )
  }

}
