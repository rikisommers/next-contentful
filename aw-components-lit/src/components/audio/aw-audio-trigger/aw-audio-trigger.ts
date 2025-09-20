import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * @fileoverview AW Audio Trigger Component
 * 
 * A component that provides audio feedback for user interactions.
 * Supports click and hover sounds with theme integration and configurable options.
 * 
 * @example
 * ```html
 * <!-- Basic audio trigger -->
 * <aw-audio-trigger 
 *   click_sound="beepOn"
 *   hover_sound="plink">
 *   <button>Click me</button>
 * </aw-audio-trigger>
 * 
 * <!-- With custom configuration -->
 * <aw-audio-trigger 
 *   click_enabled="true"
 *   hover_enabled="false"
 *   click_sound="marimba"
 *   volume="0.5"
 *   fallback_sound="click">
 *   <a href="/page">Link with sound</a>
 * </aw-audio-trigger>
 * 
 * <!-- Declarative with data attributes -->
 * <aw-audio-trigger>
 *   <button data-audio-click="beepOn" data-audio-hover="plink">
 *     Button with data attributes
 *   </button>
 * </aw-audio-trigger>
 * ```
 * 
 * @example
 * ```javascript
 * // Programmatic usage
 * const audioTrigger = document.querySelector('aw-audio-trigger');
 * 
 * // Play a custom sound
 * audioTrigger.playSound('marimba');
 * 
 * // Update sound configuration
 * audioTrigger.click_sound = 'beepOn';
 * audioTrigger.volume = 0.8;
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-audio-trigger')
export class AwAudioTrigger extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    /* ITCSS - Components: Block - aw-audio-trigger */
    .aw-audio-trigger {
      display: contents;
    }

    .aw-audio-trigger__content {
      display: contents;
    }

    /* ITCSS - Utilities: Audio loading states */
    .aw-audio-trigger--loading {
      opacity: 0.7;
    }

    .aw-audio-trigger--error {
      opacity: 0.5;
    }

    /* Hidden audio elements */
    .aw-audio-trigger__audio {
      display: none;
    }
  `;

  /**
   * Whether to enable click audio
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-audio-trigger click_enabled="false"></aw-audio-trigger>
   * ```
   */
  @property({ type: Boolean }) click_enabled: boolean = true;

  /**
   * Whether to enable hover audio
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-audio-trigger hover_enabled="false"></aw-audio-trigger>
   * ```
   */
  @property({ type: Boolean }) hover_enabled: boolean = true;

  /**
   * The sound to play on click events
   * @type {string}
   * @default 'click'
   * @example
   * ```html
   * <aw-audio-trigger click_sound="beepOn"></aw-audio-trigger>
   * ```
   */
  @property() click_sound: string = 'click';

  /**
   * The sound to play on hover events
   * @type {string}
   * @default 'hover'
   * @example
   * ```html
   * <aw-audio-trigger hover_sound="plink"></aw-audio-trigger>
   * ```
   */
  @property() hover_sound: string = 'hover';

  /**
   * Fallback sound when specified sound is not available
   * @type {string}
   * @default 'click'
   * @example
   * ```html
   * <aw-audio-trigger fallback_sound="beep"></aw-audio-trigger>
   * ```
   */
  @property() fallback_sound: string = 'click';

  /**
   * Volume level for audio playback (0-1)
   * @type {number}
   * @default 0.5
   * @example
   * ```html
   * <aw-audio-trigger volume="0.8"></aw-audio-trigger>
   * ```
   */
  @property({ type: Number }) volume: number = 0.5;

  /**
   * Whether audio is globally enabled
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-audio-trigger audio_enabled="false"></aw-audio-trigger>
   * ```
   */
  @property({ type: Boolean }) audio_enabled: boolean = true;

  /**
   * Base URL for audio files
   * @type {string}
   * @default '/audio/'
   * @example
   * ```html
   * <aw-audio-trigger audio_base_url="/sounds/"></aw-audio-trigger>
   * ```
   */
  @property() audio_base_url: string = '/audio/';

  /**
   * Audio file extension
   * @type {string}
   * @default 'mp3'
   * @example
   * ```html
   * <aw-audio-trigger audio_extension="wav"></aw-audio-trigger>
   * ```
   */
  @property() audio_extension: string = 'mp3';

  /**
   * Internal state for loading status
   * @private
   */
  @state() private loading: boolean = false;

  /**
   * Internal state for error status
   * @private
   */
  @state() private error: boolean = false;

  /**
   * Cache for audio elements
   * @private
   */
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  /**
   * Reference to slotted content
   * @private
   */
  private slottedElements: Element[] = [];

  /**
   * Lifecycle method - called when element is added to DOM
   * @protected
   */
  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  /**
   * Lifecycle method - called when element is removed from DOM
   * @protected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.cleanupAudioCache();
  }

  /**
   * Called after the element's DOM is updated for the first time
   * @protected
   */
  firstUpdated() {
    this.updateSlottedElements();
    this.setupSlottedElementListeners();
  }

  /**
   * Sets up event listeners for the component
   * @private
   */
  private setupEventListeners() {
    this.addEventListener('click', this.handleClick);
    this.addEventListener('mouseenter', this.handleMouseEnter);
  }

  /**
   * Removes event listeners from the component
   * @private
   */
  private removeEventListeners() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('mouseenter', this.handleMouseEnter);
    this.removeSlottedElementListeners();
  }

  /**
   * Updates the reference to slotted elements
   * @private
   */
  private updateSlottedElements() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      this.slottedElements = slot.assignedElements();
    }
  }

  /**
   * Sets up event listeners for slotted elements with data attributes
   * @private
   */
  private setupSlottedElementListeners() {
    this.slottedElements.forEach(element => {
      const clickSound = element.getAttribute('data-audio-click');
      const hoverSound = element.getAttribute('data-audio-hover');

      if (clickSound) {
        element.addEventListener('click', (e) => {
          e.stopPropagation();
          this.playSound(clickSound);
        });
      }

      if (hoverSound) {
        element.addEventListener('mouseenter', (e) => {
          e.stopPropagation();
          this.playSound(hoverSound);
        });
      }
    });
  }

  /**
   * Removes event listeners from slotted elements
   * @private
   */
  private removeSlottedElementListeners() {
    // Event listeners will be cleaned up when elements are removed from DOM
  }

  /**
   * Handles click events
   * @private
   */
  private handleClick = (event: MouseEvent) => {
    if (!this.click_enabled || !this.audio_enabled) return;

    // Check if the clicked element has data-audio-click attribute
    const target = event.target as Element;
    const dataClickSound = target.getAttribute?.('data-audio-click');
    
    if (dataClickSound) {
      return; // Let the slotted element handler deal with it
    }

    this.playSound(this.click_sound);
  };

  /**
   * Handles mouse enter events
   * @private
   */
  private handleMouseEnter = (event: MouseEvent) => {
    if (!this.hover_enabled || !this.audio_enabled) return;

    // Check if the hovered element has data-audio-hover attribute
    const target = event.target as Element;
    const dataHoverSound = target.getAttribute?.('data-audio-hover');
    
    if (dataHoverSound) {
      return; // Let the slotted element handler deal with it
    }

    this.playSound(this.hover_sound);
  };

  /**
   * Plays the specified sound
   * @param {string} soundName - The name of the sound to play
   * @public
   */
  public async playSound(soundName: string) {
    if (!this.audio_enabled) return;

    try {
      this.loading = true;
      this.error = false;

      const audio = await this.getAudio(soundName);
      
      // Reset audio to beginning
      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, this.volume));
      
      await audio.play();

      const event = new CustomEvent('aw-audio-play', {
        detail: { soundName, volume: this.volume },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);

    } catch (error) {
      this.error = true;
      
      // Try fallback sound if available and different
      if (soundName !== this.fallback_sound) {
        await this.playSound(this.fallback_sound);
      }

      const errorEvent = new CustomEvent('aw-audio-error', {
        detail: { soundName, error: error instanceof Error ? error.message : String(error) },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
      
    } finally {
      this.loading = false;
    }
  }

  /**
   * Gets or creates an audio element for the specified sound
   * @private
   * @param {string} soundName - The name of the sound
   * @returns {Promise<HTMLAudioElement>} The audio element
   */
  private async getAudio(soundName: string): Promise<HTMLAudioElement> {
    // Check cache first
    if (this.audioCache.has(soundName)) {
      return this.audioCache.get(soundName)!;
    }

    // Create new audio element
    const audio = new Audio();
    const audioUrl = `${this.audio_base_url}${soundName}.${this.audio_extension}`;
    
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        audio.removeEventListener('canplaythrough', onLoad);
        audio.removeEventListener('error', onError);
      };

      const onLoad = () => {
        cleanup();
        this.audioCache.set(soundName, audio);
        resolve(audio);
      };

      const onError = () => {
        cleanup();
        reject(new Error(`Failed to load audio: ${audioUrl}`));
      };

      audio.addEventListener('canplaythrough', onLoad);
      audio.addEventListener('error', onError);
      
      audio.preload = 'auto';
      audio.src = audioUrl;
    });
  }

  /**
   * Preloads audio files for better performance
   * @param {string[]} soundNames - Array of sound names to preload
   * @public
   */
  public async preloadSounds(soundNames: string[]) {
    const loadPromises = soundNames.map(soundName => 
      this.getAudio(soundName).catch(error => 
        console.warn(`Failed to preload sound: ${soundName}`, error)
      )
    );

    await Promise.all(loadPromises);

    const event = new CustomEvent('aw-audio-preloaded', {
      detail: { soundNames },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Clears the audio cache
   * @private
   */
  private cleanupAudioCache() {
    this.audioCache.forEach(audio => {
      audio.src = '';
      audio.load();
    });
    this.audioCache.clear();
  }

  /**
   * Sets the volume for all cached audio elements
   * @param {number} newVolume - The new volume (0-1)
   * @public
   */
  public setVolume(newVolume: number) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    
    this.audioCache.forEach(audio => {
      audio.volume = this.volume;
    });

    const event = new CustomEvent('aw-audio-volume-change', {
      detail: { volume: this.volume },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Enables or disables audio globally
   * @param {boolean} enabled - Whether audio should be enabled
   * @public
   */
  public setAudioEnabled(enabled: boolean) {
    this.audio_enabled = enabled;

    const event = new CustomEvent('aw-audio-enabled-change', {
      detail: { enabled },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Renders the component
   * @returns {TemplateResult} The component template
   * @protected
   */
  render() {
    return html`
      <div class="aw-audio-trigger">
        <div class="aw-audio-trigger__content">
          <slot @slotchange=${this.firstUpdated}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-audio-trigger': AwAudioTrigger;
  }
}