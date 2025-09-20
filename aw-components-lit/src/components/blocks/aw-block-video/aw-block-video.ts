import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

export type VideoProvider = 'youtube' | 'vimeo' | 'native' | 'embed';
export type VideoAspectRatio = '16:9' | '4:3' | '1:1' | '9:16' | 'custom';
export type VideoSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface VideoSource {
  url: string;
  type?: string;
  quality?: string;
}

export interface VideoPoster {
  url: string;
  title?: string;
  alt?: string;
}

/**
 * A video block component for displaying embedded videos with poster images, lazy loading, and responsive design.
 * 
 * @element aw-block-video
 * 
 * @slot title - Custom title content
 * @slot description - Custom description content
 * @slot controls - Custom video controls
 * @slot overlay - Custom overlay content
 * 
 * @fires {CustomEvent} awVideoReady - Dispatched when component is ready
 * @fires {CustomEvent} awVideoPlay - Dispatched when video starts playing
 * @fires {CustomEvent} awVideoPause - Dispatched when video is paused
 * @fires {CustomEvent} awVideoEnded - Dispatched when video ends
 * @fires {CustomEvent} awVideoLoadStart - Dispatched when video loading starts
 * 
 * @example
 * ```html
 * <aw-block-video 
 *   title="Product Demo"
 *   video_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   provider="youtube"
 *   aspect_ratio="16:9"
 *   lazy_load="true">
 * </aw-block-video>
 * ```
 */
@customElement('aw-block-video')
export class AwBlockVideo extends LitElement {
  static styles = css`
    :host {
      --aw-video-bg: var(--aw-color-surface-dark, #1a1a1a);
      --aw-video-text: var(--aw-color-text-inverse, #fff);
      --aw-video-text-muted: var(--aw-color-text-light, #a0a0a0);
      --aw-video-primary: var(--aw-color-primary, #007bff);
      --aw-video-overlay: var(--aw-color-overlay, rgba(0, 0, 0, 0.7));
      --aw-video-radius: var(--aw-border-radius-lg, 12px);
      --aw-video-shadow: var(--aw-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.15));
      --aw-video-gap: var(--aw-spacing-md, 1rem);
      
      display: block;
      width: 100%;
      margin: 1.5rem 0;
    }

    .video-container {
      position: relative;
      overflow: hidden;
      border-radius: var(--aw-video-radius);
      background: var(--aw-video-bg);
      box-shadow: var(--aw-video-shadow);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .video-container:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    /* Aspect Ratios */
    .video-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .video-wrapper--16-9 {
      aspect-ratio: 16 / 9;
    }

    .video-wrapper--4-3 {
      aspect-ratio: 4 / 3;
    }

    .video-wrapper--1-1 {
      aspect-ratio: 1 / 1;
    }

    .video-wrapper--9-16 {
      aspect-ratio: 9 / 16;
    }

    .video-wrapper--custom {
      height: var(--custom-height, 400px);
    }

    /* Size variants */
    .video-container--sm {
      max-width: 480px;
    }

    .video-container--md {
      max-width: 720px;
    }

    .video-container--lg {
      max-width: 1024px;
    }

    .video-container--xl {
      max-width: 1280px;
    }

    .video-container--full {
      max-width: 100%;
    }

    .video-element,
    .video-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    .video-element {
      object-fit: cover;
    }

    .video-poster {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }

    .video-poster--hidden {
      opacity: 0;
      pointer-events: none;
    }

    .video-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        to top,
        var(--aw-video-overlay) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        transparent 100%
      );
      color: var(--aw-video-text);
      padding: var(--aw-video-gap);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: calc(var(--aw-video-gap) / 2);
      z-index: 2;
    }

    .video-title {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--aw-video-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0;
      transform: translateY(0.5rem);
      animation: slideInUp 0.6s ease-out 0.3s forwards;
    }

    .video-description {
      margin: 0;
      font-size: 1rem;
      color: var(--aw-video-text);
      line-height: 1.5;
      opacity: 0;
      transform: translateY(0.5rem);
      animation: slideInUp 0.6s ease-out 0.5s forwards;
    }

    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 3;
      font-size: 0;
    }

    .play-button::before {
      content: '';
      width: 0;
      height: 0;
      border-left: 20px solid rgba(255, 255, 255, 0.9);
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      margin-left: 4px;
    }

    .play-button:hover {
      transform: translate(-50%, -50%) scale(1.1);
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .play-button:focus {
      outline: 2px solid var(--aw-video-primary);
      outline-offset: 4px;
    }

    .play-button--hidden {
      opacity: 0;
      pointer-events: none;
    }

    .video-controls {
      position: absolute;
      bottom: var(--aw-video-gap);
      right: var(--aw-video-gap);
      display: flex;
      gap: 0.5rem;
      z-index: 3;
    }

    .control-button {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: var(--aw-video-text);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }

    .control-button:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: scale(1.05);
    }

    .control-button:focus {
      outline: 2px solid var(--aw-video-primary);
      outline-offset: 2px;
    }

    .loading-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid var(--aw-video-text);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 4;
    }

    .loading-indicator--hidden {
      display: none;
    }

    .error-state {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--aw-video-bg);
      color: var(--aw-video-text-muted);
      text-align: center;
      z-index: 5;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.6;
    }

    .error-message {
      font-size: 1rem;
      margin: 0;
    }

    /* Animations */
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        margin: 1rem 0;
      }

      .video-container {
        border-radius: calc(var(--aw-video-radius) / 1.5);
      }

      .video-overlay {
        padding: calc(var(--aw-video-gap) * 0.75);
      }

      .play-button {
        width: 60px;
        height: 60px;
      }

      .play-button::before {
        border-left-width: 15px;
        border-top-width: 9px;
        border-bottom-width: 9px;
      }

      .control-button {
        width: 36px;
        height: 36px;
        font-size: 0.875rem;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .video-container,
      .play-button,
      .control-button {
        transition: none;
      }

      .video-container:hover {
        transform: none;
      }

      .play-button:hover,
      .control-button:hover {
        transform: none;
      }

      .video-title,
      .video-description {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }

    /* High contrast */
    @media (prefers-contrast: high) {
      .play-button,
      .control-button {
        border-width: 2px;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  `;

  @query('.video-element')
  private _videoElement?: HTMLVideoElement;

  @query('.video-iframe')
  private _iframeElement?: HTMLIFrameElement;

  @query('.video-poster')
  private _posterElement?: HTMLImageElement;

  /**
   * Video title
   */
  @property({ type: String }) 
  title: string = '';

  /**
   * Video description
   */
  @property({ type: String }) 
  description: string = '';

  /**
   * Video URL
   */
  @property({ type: String }) 
  video_url: string = '';

  /**
   * Video provider type
   */
  @property({ type: String }) 
  provider: VideoProvider = 'native';

  /**
   * Video sources for native video
   */
  @property({ type: Array }) 
  sources: VideoSource[] = [];

  /**
   * Poster image
   */
  @property({ type: Object }) 
  poster?: VideoPoster;

  /**
   * Aspect ratio
   */
  @property({ type: String }) 
  aspect_ratio: VideoAspectRatio = '16:9';

  /**
   * Video size
   */
  @property({ type: String }) 
  size: VideoSize = 'md';

  /**
   * Custom height for custom aspect ratio
   */
  @property({ type: Number }) 
  custom_height?: number;

  /**
   * Enable lazy loading
   */
  @property({ type: Boolean }) 
  lazy_load: boolean = true;

  /**
   * Autoplay video (may be restricted by browser)
   */
  @property({ type: Boolean }) 
  autoplay: boolean = false;

  /**
   * Loop video
   */
  @property({ type: Boolean }) 
  loop: boolean = false;

  /**
   * Mute video
   */
  @property({ type: Boolean }) 
  muted: boolean = false;

  /**
   * Show video controls
   */
  @property({ type: Boolean }) 
  show_controls: boolean = true;

  /**
   * Enable fullscreen
   */
  @property({ type: Boolean }) 
  enable_fullscreen: boolean = true;

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  @state()
  private _isPlaying: boolean = false;

  @state()
  private _isLoading: boolean = false;

  @state()
  private _hasError: boolean = false;

  @state()
  private _showPoster: boolean = true;

  @state()
  private _isLoaded: boolean = false;

  private _observer?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.lazy_load) {
      this._setupIntersectionObserver();
    } else {
      this._isLoaded = true;
    }
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awVideoReady', {
      detail: {
        title: this.title,
        provider: this.provider,
        videoUrl: this.video_url
      },
      bubbles: true,
      composed: true,
    }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  private _setupIntersectionObserver() {
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this._isLoaded) {
            this._isLoaded = true;
            this._observer?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );
    this._observer.observe(this);
  }

  private _handlePlay() {
    this._isPlaying = true;
    this._showPoster = false;
    
    this.dispatchEvent(new CustomEvent('awVideoPlay', {
      detail: {
        currentTime: this._videoElement?.currentTime || 0,
        duration: this._videoElement?.duration || 0
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handlePause() {
    this._isPlaying = false;
    
    this.dispatchEvent(new CustomEvent('awVideoPause', {
      detail: {
        currentTime: this._videoElement?.currentTime || 0,
        duration: this._videoElement?.duration || 0
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleEnded() {
    this._isPlaying = false;
    
    this.dispatchEvent(new CustomEvent('awVideoEnded', {
      detail: {
        duration: this._videoElement?.duration || 0
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleLoadStart() {
    this._isLoading = true;
    this._hasError = false;
    
    this.dispatchEvent(new CustomEvent('awVideoLoadStart', {
      bubbles: true,
      composed: true,
    }));
  }

  private _handleLoadedData() {
    this._isLoading = false;
  }

  private _handleError() {
    this._isLoading = false;
    this._hasError = true;
  }

  private _handlePlayButtonClick() {
    if (this.provider === 'native' && this._videoElement) {
      if (this._isPlaying) {
        this._videoElement.pause();
      } else {
        this._videoElement.play().catch(() => {
          this._hasError = true;
        });
      }
    } else if (this.provider === 'youtube' || this.provider === 'vimeo') {
      // For embeds, hide poster and show iframe
      this._showPoster = false;
    }
  }

  private _handlePosterClick() {
    this._handlePlayButtonClick();
  }

  private _handleFullscreen() {
    if (!this.enable_fullscreen) return;

    const element = this._videoElement || this._iframeElement;
    if (element?.requestFullscreen) {
      element.requestFullscreen().catch(() => {
        console.warn('Fullscreen request failed');
      });
    }
  }

  private _getEmbedUrl(): string {
    if (!this.video_url) return '';

    switch (this.provider) {
      case 'youtube':
        const youtubeId = this._extractYouTubeId(this.video_url);
        return youtubeId 
          ? `https://www.youtube.com/embed/${youtubeId}?autoplay=${this.autoplay ? 1 : 0}&mute=${this.muted ? 1 : 0}&loop=${this.loop ? 1 : 0}`
          : '';
      
      case 'vimeo':
        const vimeoId = this._extractVimeoId(this.video_url);
        return vimeoId 
          ? `https://player.vimeo.com/video/${vimeoId}?autoplay=${this.autoplay ? 1 : 0}&muted=${this.muted ? 1 : 0}&loop=${this.loop ? 1 : 0}`
          : '';
      
      case 'embed':
        return this.video_url;
      
      default:
        return '';
    }
  }

  private _extractYouTubeId(url: string): string {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  private _extractVimeoId(url: string): string {
    const regex = /(?:vimeo\.com\/)([0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  render() {
    const containerClasses = [
      'video-container',
      `video-container--${this.size}`,
      this.custom_class
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      'video-wrapper',
      `video-wrapper--${this.aspect_ratio.replace(':', '-')}`
    ].filter(Boolean).join(' ');

    const wrapperStyle = this.aspect_ratio === 'custom' && this.custom_height
      ? `--custom-height: ${this.custom_height}px`
      : '';

    return html`
      <div class=${containerClasses}>
        <div class=${wrapperClasses} style=${wrapperStyle}>
          ${this._isLoaded ? html`
            ${this.provider === 'native' ? html`
              <video
                class="video-element"
                .autoplay=${this.autoplay}
                .loop=${this.loop}
                .muted=${this.muted}
                .controls=${this.show_controls}
                preload="metadata"
                @play=${this._handlePlay}
                @pause=${this._handlePause}
                @ended=${this._handleEnded}
                @loadstart=${this._handleLoadStart}
                @loadeddata=${this._handleLoadedData}
                @error=${this._handleError}
              >
                ${this.sources.map(source => html`
                  <source src=${source.url} type=${source.type || 'video/mp4'}>
                `)}
                ${this.video_url && !this.sources.length ? html`
                  <source src=${this.video_url} type="video/mp4">
                ` : ''}
                Your browser does not support the video tag.
              </video>
            ` : html`
              <iframe
                class="video-iframe"
                src=${this._getEmbedUrl()}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                @load=${this._handleLoadedData}
                @error=${this._handleError}
              ></iframe>
            `}
          ` : html`
            <div class="loading-indicator ${this._isLoading ? '' : 'loading-indicator--hidden'}"></div>
          `}
          
          ${this.poster && this._showPoster ? html`
            <img
              class="video-poster ${this._showPoster ? '' : 'video-poster--hidden'}"
              src=${this.poster.url}
              alt=${this.poster.alt || this.poster.title || this.title}
              @click=${this._handlePosterClick}
              loading="lazy"
            />
          ` : ''}
          
          ${this._hasError ? html`
            <div class="error-state">
              <div class="error-icon">⚠️</div>
              <p class="error-message">Failed to load video</p>
            </div>
          ` : ''}
          
          <button
            class="play-button ${this._isPlaying || !this._showPoster ? 'play-button--hidden' : ''}"
            @click=${this._handlePlayButtonClick}
            aria-label=${this._isPlaying ? 'Pause video' : 'Play video'}
          >
            Play Video
          </button>
          
          <div class="video-overlay">
            <slot name="overlay">
              ${this.title ? html`
                <h3 class="video-title">
                  <slot name="title">${this.title}</slot>
                </h3>
              ` : ''}
              
              ${this.description ? html`
                <p class="video-description">
                  <slot name="description">${this.description}</slot>
                </p>
              ` : ''}
            </slot>
          </div>
          
          ${this.show_controls && this.provider === 'native' ? html`
            <div class="video-controls">
              <slot name="controls">
                ${this.enable_fullscreen ? html`
                  <button
                    class="control-button"
                    @click=${this._handleFullscreen}
                    aria-label="Enter fullscreen"
                  >
                    ⛶
                  </button>
                ` : ''}
              </slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-video': AwBlockVideo;
  }
}