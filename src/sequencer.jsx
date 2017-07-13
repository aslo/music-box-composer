import React from 'react';
import { Howl } from 'howl';
import SequenceTable from './sequenceTable/sequenceTable';
import ControlPanel from './controlPanel';
import * as songs from './song/songs';

export default class Sequencer extends React.Component {

  constructor(props) {
    super(props);

    this.keyList = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h'];

    this.state = {
      tracks: props.instrument.map((sample) => {
        return new Howl({ src: [ sample ] });
      }),
      bpm: 150,
      currentBeat: 0,
      playing: false,
      song: songs.chromaticScale.songData
    }

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleCellInCurrentRow = this.toggleCellInCurrentRow.bind(this);
    this.toggleSongCell = this.toggleSongCell.bind(this);
    this.incrementBeat = this.incrementBeat.bind(this);
    this.updateCurrentRow = this.updateCurrentRow.bind(this);
    this.onChangeBpm = this.onChangeBpm.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  render(){
    return (
      <div>
        <ControlPanel
          song={ this.state.song }
          keyList={ this.keyList }
          isPlaying={ this.state.playing }
          incrementBeat={ this.incrementBeat }
          togglePlay={ this.togglePlay }
          toggleCellInCurrentRow={ this.toggleCellInCurrentRow }
          row={ this.getCurrentBeatRow() }
          updateRow={ this.updateCurrentRow }
          clearAll={ this.clearAll }
          bpm={ this.state.bpm }
          onChangeBpm={ this.onChangeBpm } />
        <p>Beat: { this.state.currentBeat }</p>
        <SequenceTable
          headers={this.keyList.slice(0, this.getCurrentBeatRow().length)}
          song={this.state.song}
          currentBeat={this.state.currentBeat}
          toggleSongCell={this.toggleSongCell} />
      </div> )
  }

  onChangeBpm(e) {
    this.setState({ bpm: e.target.value })
  }

  updateCurrentRow(row) {
    this.state.song[this.state.currentBeat] = row;
    this.forceUpdate();
  }

  clearAll() {
    this.setState({ song: this.state.song.map((row) => row.fill(0))})
  }

  togglePlay() {
    this.state.playing ? this.stop() : this.start();
  }

  toggleCellInCurrentRow(col) {
    this.toggleSongCell(this.state.currentBeat, col)
  }

  toggleSongCell(row, col) {
    var wasEnabled = this.state.song[row][col];
    // TODO this should probably only happen while enabling?
    this.state.tracks[col].play();

    this.state.song[row][col] = wasEnabled ? 0 : 1;
    this.forceUpdate();
  }

  incrementBeat() {
    this.setState((prevState, props) => {
      return { currentBeat: (prevState.currentBeat + 1) % prevState.song.length }
    });
  }

  start() {
    this.totalBeats = 0;
    this.setState({ playing: true });

    // once other variables are set, kick off the timer
    this.startTime = new Date().getTime();
    this.timerId = setInterval(() => this.tick(), 5);
  }

  stop() {
    clearInterval(this.timerId);
    this.startTime = null;
    this.timerId = null;
    this.setState({ playing: false });
  }

  tick() {
    var beatDuration = 60 * 1000 / this.state.bpm;
    var elapsedPlayTime = new Date().getTime() - this.startTime;

    // if we've passed a beat
    if (elapsedPlayTime > this.totalBeats * beatDuration) {
      this.incrementBeat();
      this.totalBeats++;

      // play all notes enabled for the current beat
      for (var i = 0; i < this.getCurrentBeatRow().length; i++) {
        var val = this.getCurrentBeatRow()[i];
        if (val) {
          this.state.tracks[i].play();
        }
      }
    }
  }

  getCurrentBeatRow() {
    return this.state.song[this.state.currentBeat];
  }

}
