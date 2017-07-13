import React from 'react'
import SequenceTableHead from './sequenceTableHead'
import SequenceTableRow from './SequenceTableRow'

export default class SequenceTable extends React.Component {

  render() {
    return (
      <table className="sequenceTable">
        <thead>
          <SequenceTableHead headers={this.props.headers} />
        </thead>
        <tbody>
          { this.props.song.map((row, rowIndex) =>
            <SequenceTableRow key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              isActive={this.props.currentBeat == rowIndex}
              toggleSongCell={this.props.toggleSongCell} />) }
        </tbody>
      </table>
    );
  }

}
