import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout'
import Video from '../components/video'
import Title from '../components/title'
import PlayPause from '../components/play-pause'
import Timer from '../components/timer'
import Controls from '../components/video-player-controls'
import { formattedTime } from '../../lib/utils'
import ProgressBar from '../components/progress-bar'
import Spinner from '../components/spinner'
import Volume from '../components/volume'
import FullScreen from '../components/full-screen'
import { connect} from 'react-redux'

class VideoPlayer extends Component {
  state = {
    pause: true,
    duration: 0,
    currentTime: 0,
    durationFormatted: '',
    currentTimeFormatted: '',
    loading: false,
    lastVolume: null,
    mute: false
  }
  togglePlay = (event) => {
    this.setState({
      pause: !this.state.pause
    })
  }
  componentDidMount() {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }
  handleLoadedMetadata = event => {
    this.video = event.target
    this.setState({
      durationFormatted: formattedTime(this.video.duration),
      duration: this.video.duration
    })
  }
  handleTimeUpdate = event => {
    this.setState({
      currentTimeFormatted: formattedTime(this.video.currentTime),
      currentTime: this.video.currentTime
    })
  }
  handleProgressChange = event => {
    // Cambiamos el tiempo de transcurso del video
    this.video.currentTime = event.target.value
  }
  handleSeeking = (event) => {
    this.setState({
      loading: true
    })
  }
  handleSeeked = (event) => {
    this.setState({
      loading: false
    })
  }
  handleVolumeChange = (event) => {
    this.video.volume = event.target.value
  }
  handleVolumeClick = (event) => {
    this.setState({
      mute: !this.state.mute,
      lastVolume: this.video.volume
    })
    this.video.volume === 0 ? this.video.volume = this.state.lastVolume : this.video.volume = 0
  }
  handleFullScreen = (event) => {
    if (!document.webkitIsFullScreen) {
      this.player.webkitRequestFullScreen()
    } else {
      document.webkitExitFullscreen()
    }
  }
  setRef = element => {
    this.player = element
  }
  render () {
    return (
      <VideoPlayerLayout
        setRef={this.setRef}
      >
        <Title
          title={this.props.media.get('title')}
        />
        <Controls>
          <PlayPause
            pause={this.state.pause} 
            handleClick={this.togglePlay}
          />
          <Timer
            duration={this.state.durationFormatted}
            currentTime={this.state.currentTimeFormatted}
          />
          <ProgressBar 
            duration={this.state.duration}
            value={this.state.currentTime}
            handleProgressChange={this.handleProgressChange}
          />
          <Volume
            mute={this.state.mute}
            handleVolumeClick={this.handleVolumeClick}
            handleVolumeChange={this.handleVolumeChange}
          />
          <FullScreen 
            handleFullScreen={this.handleFullScreen}
          />
        </Controls>
        <Spinner 
          active={this.state.loading}
        />
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          src={this.props.media.get('src')}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
        />
      </VideoPlayerLayout> 
    )
  }
}

function mapStateToProps(state, props) {
  return {
    media: state.get('data').get('entities').get('media').get(props.id)
  }
}

export default connect(mapStateToProps)(VideoPlayer)