import React from 'react';
import './index.css';
import ImageGallery from 'react-image-gallery';

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {}
    };

    this.customImages = [];
    this.props.room.images.map((i) => {
      let extension = i.split('.').pop().toLowerCase();
      if (
        extension === 'png' ||
        extension === 'jpg' ||
        extension === 'jpeg' ||
        extension === 'gif'
      ) {
        return (this.customImages = [
          ...this.customImages,
          {
            original: i,
            thumbnail: i
          }
        ]);
      } else if (extension === 'mp4' || extension === 'webm' || extension === 'ogg') {
        return (this.customImages = [
          ...this.customImages,
          {
            thumbnail:
              'https://image.freepik.com/free-vector/video-player-template-media-player-web-page_186930-293.jpg',
            embedUrl: i,
            original: `https://www.xmple.com/wallpaper/solid-color-single-one-colour-pink-plain-1920x1080-c-ffcbef-f-24.svg`,
            // description: "Render custom slides within the gallery",
            renderItem: this._renderVideo.bind(this)
          }
        ]);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.slideInterval !== prevState.slideInterval ||
      this.state.slideDuration !== prevState.slideDuration
    ) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    console.debug(
      'clicked on image',
      event.target,
      'at index',
      this._imageGallery.getCurrentIndex()
    );
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({ [state]: event.target.value });
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    let extension = item.embedUrl.split('.').pop().toLowerCase();
    return (
      <video style={{ width: '100%' }} controls>
        <source src={item.embedUrl} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  // _renderVideo(item) {
  //   let extension = item.embedUrl.split(".").pop().toLowerCase();
  //   return (
  //     <div>
  //       {this.state.showVideo[item.embedUrl] ? (
  //         <video style={{ width: "100%" }} controls>
  //           <source src={item.embedUrl} type={`video/${extension}`} />
  //           Your browser does not support the video tag.
  //         </video>
  //       ) : (
  //         <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
  //           <div className="play-button"></div>
  //           <img className="image-gallery-image" src={item.original} />
  //           {item.description && (
  //             <span
  //               className="image-gallery-description"
  //               style={{ right: "0", left: "initial" }}
  //             >
  //               {item.description}
  //             </span>
  //           )}
  //         </a>
  //       )}
  //     </div>
  //   );
  // }

  render() {
    return (
      <section className="app">
        {this.customImages.length > 0 && (
          <ImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            ref={(i) => (this._imageGallery = i)}
            items={this.customImages}
            lazyLoad={false}
            onClick={this._onImageClick.bind(this)}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            onPause={this._onPause.bind(this)}
            onScreenChange={this._onScreenChange.bind(this)}
            onPlay={this._onPlay.bind(this)}
            infinite={this.state.infinite}
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            isRTL={this.state.isRTL}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailOver={this.state.slideOnThumbnailOver}
            additionalclassName="app-image-gallery"
          />
        )}
      </section>
    );
  }
}

export default Sample;
