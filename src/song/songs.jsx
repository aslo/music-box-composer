import Song from './song'

const keyboardLength = 15;

var chromaticScale = [];
for (var i = 0; i < keyboardLength; i++) {
  var beat = Array(keyboardLength).fill(0);
  beat[i] = 1;
  chromaticScale.push(beat);
}
chromaticScale = new Song(chromaticScale);


export { chromaticScale }
