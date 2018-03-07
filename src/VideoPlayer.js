import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.goToNextVideo=this.goToNextVideo.bind(this);
    this.onPlay=this.onPlay.bind(this);
  }

  componentDidMount() {
  }

  onPlay() {
    this.video.setAttribute("poster", require("./images/posterblack.jpg"));
    this.video.setAttribute("autoPlay", true);
  }

  goToNextVideo() {
    this.props.nextVideo();
  }

  render() {
    return (
      <div className="VideoPlayer">
        <figure id="video_player">
          <div id="video_container">
            <video controls={true}
              poster={require("./images/poster.jpg")}
              onPlaying={this.onPlay}
							onEnded={this.goToNextVideo}
              src={this.props.playlist.length > 0 ?
                  this.props.playlist[this.props.currentVideo].sources.m4v
                  : "https://od.lk/s/OTdfNzAyOTg3N18/Tn-dreams-hd-8.m4v"
              }
							type="video/mp4"
              ref={(video) => {this.video = video}}
            >
            </video>
          </div>
        </figure>
      </div>
    );
  }
}

export default VideoPlayer;
