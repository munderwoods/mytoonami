import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.goToNextVideo=this.goToNextVideo.bind(this);
    this.setPoster=this.setPoster.bind(this);
  }

  componentDidMount() {
  }

  setPoster() {
    this.video.setAttribute("poster", require("./images/posterblack.jpg"));
  }

  goToNextVideo() {
    this.props.nextVideo();
  }

  render() {
    let linkList = this.props.playlist.map((video) => {
      return <a key={video.id} href={video.sources.m4v}>{video.title} </a>;
    })

    return (
      <div className="VideoPlayer">
        <figure id="video_player">
          <div id="video_container">
            <video controls={true}
              autoPlay={true}
              poster={require("./images/poster.jpg")}
              onPlaying={this.setPoster}
							onEnded={this.goToNextVideo}
							src={this.props.playlist.length > 0 ? this.props.playlist[this.props.currentVideo].sources.m4v : ""}
							type="video/mp4"
              ref={(video) => {this.video = video}}
            >
            </video>
          </div>
          <figcaption className="LinkList">
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default VideoPlayer;
