import React from 'react';
import Sequencer from './sequencer';
import '../styles/index.scss';

import { glock as instrument } from './glock';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Music box composer</h1>
        <h3>Sequencer Controls</h3>
        <ul>
          <li><strong>x</strong>: clear current row</li>
          <li><strong>space</strong>: advance to next row</li>
        </ul>

        <Sequencer instrument={instrument} />
      </div>
    )
  }
}
