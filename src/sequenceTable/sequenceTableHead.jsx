import React from 'react'

export default class SequenceTableHead extends React.Component {

  render() {
    var cols = this.props.headers.map((note, i) =>
      (<th key={i}>{ note.name || 'name' }</th>)
    );
    return (<tr>{
      this.props.headers.map((name, i) =>
        <th key={i}>{ name }</th>
      )}</tr>);
  }

}
