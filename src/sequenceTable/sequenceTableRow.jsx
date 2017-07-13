import React from 'react'
import SequenceTableCell from './SequenceTableCell'

export default class SequenceTable extends React.Component {

  render() {
    return (
      <tr className={this.props.isActive ? "info" : ""}>
        {this.props.row.map((note, noteIndex) =>
          <SequenceTableCell
            key={this.props.rowIndex + ',' + noteIndex}
            note={note}
            isActive={this.props.isActive}
            handleClick={() => this.props.toggleSongCell(this.props.rowIndex, noteIndex)}/>)}
       </tr>)
  }

}
