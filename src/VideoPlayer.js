import React, { Component } from 'react';
import Playlist from './Playlist.js';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.goToNextVideo=this.goToNextVideo.bind(this);
    this.setPoster=this.setPoster.bind(this);
  }

  componentDidMount() {
/*
    let video_player = document.getElementById("video_player");
    let video = video_player.getElementsByTagName("video")[0];
    let video_links = video_player.getElementsByTagName("figcaption")[0];
    let link_list = [];
    let currentVid = 0;
    let nextVid = 0;
    let allLnks = video_links.children;
    let lnkNum = allLnks.length;
    video.removeAttribute("controls");

    (function() {
      function playVid(index) {
        video_links.children[index].classList.add("currentvid");
        video.setAttribute("src", link_list[index] + ".mp4");
        currentVid = index;
        video.load();
        video.play();
      }
      for (var i=0; i<lnkNum; i++) {
        var filename = allLnks[i].href;
        link_list[i] = filename;
        (function(index){
          allLnks[i].onclick = function(i){
            i.preventDefault();
              for (var x = 0; x<lnkNum; x++) {
                allLnks[x].classList.remove("currentvid");
              }
            playVid(index);
          }
        })(i);
      }

    video.addEventListener('ended', function () {
      allLnks[currentVid].classList.remove("currentvid");
      if ((currentVid + 1) >= lnkNum) {
        nextVid = 0;
      } else {
        nextVid = currentVid+1;
      }
      playVid(nextVid);
    })

    video.addEventListener('mouseenter',
      function() {
        video.setAttribute("controls","true");
      })
      video.addEventListener('mouseleave', function() {
        video.removeAttribute("controls");
      })
    })();

    video.addEventListener("playing", function() { video.setAttribute("poster", require("./images/posterblack.jpg")) }, true );

*/
  }

  setPoster() {
    this.video.setAttribute("poster", require("./images/posterblack.jpg"));
  }

  goToNextVideo() {
    this.props.nextVideo();
  }

  render() {
    console.log(this.props);

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
            <Playlist sortablePlaylist={this.props.sortablePlaylist} sortShows={this.props.sortShows} />
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default VideoPlayer;
