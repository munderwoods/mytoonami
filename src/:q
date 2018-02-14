import React, { Component } from 'react';

class VideoPlayer extends Component {

  componentDidMount() {
	let video_player = document.getElementById("video_player");
	let video = video_player.getElementsByTagName("video")[0];
	let video_links = video_player.getElementsByTagName("figcaption")[0];
	let source = video.getElementsByTagName("source");
	let link_list = [];
	let currentVid = 0;
  let nextVid = 0;
	let allLnks = video_links.children;
	let lnkNum = allLnks.length;
  video.removeAttribute("controls");

	(function() {
		function playVid(index) {
			video_links.children[index].classList.add("currentvid");
			source[0].src = link_list[index] + ".mp4";
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
						for (var i=0; i<lnkNum; i++) {
							allLnks[i].classList.remove("currentvid");
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

  video.addEventListener("playing", function() { video.removeAttribute("poster") }, true );

  }

  render() {

    let linkList = this.props.playlist.map((video) => {
      return <a href={video.sources.m4v}>{video.title} </a>;
    })

    return (
      <div className="VideoPlayer">
        <figure id="video_player">
          <div id="video_container">
            <video controls={true} preload="auto"
              poster={require("./images/2013/toonami_wp_1920x1080_02.jpg")}
            >
              <source src={this.props.playlist[0].sources.m4v} type="video/mp4" />
            </video>
          </div>
          <figcaption>
            {linkList}
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default VideoPlayer;
