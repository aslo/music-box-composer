import React from 'react';

export default class ControlPanel extends React.Component {

  constructor(props) {
    super(props)

    this.keyMap = this.props.keyList.reduce((acc, val, i) => {
      acc[val] = i
      return acc
    }, {});

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.export = this.export.bind(this);
  }

  render() {
    return (
      <div className="controlPanel">
        <button className="btn btn-primary" onClick={ this.props.togglePlay }>
          { this.props.isPlaying
            ? <span className="glyphicon glyphicon-pause"/>
            : <span className="glyphicon glyphicon-play"/> } </button>
        <button className="btn" onClick={ this.props.clearAll }>
          <span className="glyphicon glyphicon-remove"/>
          &nbsp;Clear all
        </button>
        <a href="#" className="btn" onClick={this.export}>
          <span className="glyphicon glyphicon-eject"></span>
        </a>

        <span className="glyphicon glyphicon-folder-open"/>
        <input className="btn" type="file" onChange={this.import}>
        </input>

        <input type="number" onChange={this.props.onChangeBpm} value={this.props.bpm}/>
      </div>)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  import(e, cb) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      console.log('contents', contents);
      // TODO replace song data
      cb();
    };
    reader.readAsText(file);
  }

  export(e) {
    e.preventDefault();
    window.open('data:text/csv;charset=utf-8,' + escape(csv));
  }

  handleKeyDown(e) {
    var key = e.key;
    if (key == " ") {
      this.props.incrementBeat();
    } else if (key == 'x') {
      // clear the row
      this.props.updateRow(this.props.row.map((x) => 0));
    } else {
      const col = this.keyMap[key];
      if (col >= 0 && col < this.props.row.length) {
        this.props.toggleCellInCurrentRow(col);
      }
    }
  }
}
