export default class Song {

  constructor(songData) {
    this.songData = songData;

    // assert that songData is a 2D array, with all sub-arrays the same length
    // TODO
  }

  // deserialize a csv into a song instance
  static deserialize(fileContents) {
    return new Song(JSON.parse(fileContents));
  }

  // serialize a song class instance into a csv
  serialize() {
    return JSON.stringify(this.songData);
    // return this.props.song.map((row) => {
    //   return row.join(',') + "\n";
    // });
  }

}
