import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Background Component
 * 
 * Advanced background component with multiple effects including gradients, animations,
 * canvas effects, and shader support. Provides immersive background experiences.
 * 
 * @example
 * ```html
 * <aw-background 
 *   type="animated-gradient"
 *   colors="#ef7801,#f97316,#fb923c"
 *   animation="wave"
 *   speed="slow"
 *   interactive="true">
 * </aw-background>
 * ```
 */

export enum BackgroundType {
  Solid = 'solid',
  LinearGradient = 'linear-gradient',
  RadialGradient = 'radial-gradient',
  ConicGradient = 'conic-gradient',
  AnimatedGradient = 'animated-gradient',
  ParticleField = 'particle-field',
  Wave = 'wave',
  Mesh = 'mesh',
  Noise = 'noise',
  Geometric = 'geometric',
  Shader = 'shader'
}

export enum AnimationType {
  None = 'none',
  Pulse = 'pulse',
  Wave = 'wave',
  Rotate = 'rotate',
  Float = 'float',
  Morph = 'morph',
  Breathe = 'breathe'
}

export enum AnimationSpeed {
  Slow = 'slow',
  Medium = 'medium',
  Fast = 'fast'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

@customElement('aw-background')
export class AwBackground extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
    }

    .aw-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
    }

    .aw-background__canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .aw-background--interactive .aw-background__canvas {
      pointer-events: auto;
    }

    /* Solid backgrounds */
    .aw-background--type-solid {
      background-color: var(--aw-background-color, var(--aw-color-background-primary, #f4f4f5));
    }

    /* Linear gradient */
    .aw-background--type-linear-gradient {
      background: linear-gradient(
        var(--aw-gradient-direction, 135deg),
        var(--aw-gradient-colors, #ef7801, #f97316, #fb923c)
      );
    }

    /* Radial gradient */
    .aw-background--type-radial-gradient {
      background: radial-gradient(
        var(--aw-gradient-shape, circle),
        var(--aw-gradient-colors, #ef7801, #f97316, #fb923c)
      );
    }

    /* Conic gradient */
    .aw-background--type-conic-gradient {
      background: conic-gradient(
        from var(--aw-gradient-angle, 0deg),
        var(--aw-gradient-colors, #ef7801, #f97316, #fb923c, #ef7801)
      );
    }

    /* Animated gradients */
    .aw-background--type-animated-gradient {
      background: linear-gradient(
        -45deg,
        #ef7801, #f97316, #fb923c, #fdba74,
        #ef7801, #f97316, #fb923c, #fdba74
      );
      background-size: 400% 400%;
    }

    .aw-background--animation-wave.aw-background--type-animated-gradient {
      animation: gradient-wave 15s ease infinite;
    }

    .aw-background--animation-pulse.aw-background--type-animated-gradient {
      animation: gradient-pulse 3s ease-in-out infinite;
    }

    .aw-background--animation-rotate.aw-background--type-animated-gradient {
      animation: gradient-rotate 10s linear infinite;
    }

    /* Mesh gradient */
    .aw-background--type-mesh {
      background: 
        radial-gradient(at 40% 20%, #ef780180 0px, transparent 50%),
        radial-gradient(at 80% 0%, #f9731680 0px, transparent 50%),
        radial-gradient(at 0% 50%, #fb923c80 0px, transparent 50%),
        radial-gradient(at 80% 50%, #fdba7480 0px, transparent 50%),
        radial-gradient(at 0% 100%, #ef780180 0px, transparent 50%),
        radial-gradient(at 80% 100%, #f9731680 0px, transparent 50%),
        radial-gradient(at 0% 0%, #fb923c80 0px, transparent 50%);
    }

    .aw-background--animation-morph.aw-background--type-mesh {
      animation: mesh-morph 20s ease-in-out infinite;
    }

    /* Geometric patterns */
    .aw-background--type-geometric {
      background-color: var(--aw-background-color, #f4f4f5);
      background-image: 
        radial-gradient(circle at 25% 25%, #ef780120 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #f9731620 2px, transparent 2px);
      background-size: 50px 50px;
    }

    .aw-background--animation-float.aw-background--type-geometric {
      animation: geometric-float 8s ease-in-out infinite;
    }

    /* Noise effect */
    .aw-background--type-noise {
      background-color: var(--aw-background-color, #f4f4f5);
      position: relative;
    }

    .aw-background--type-noise::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Animation speed modifiers */
    .aw-background--speed-slow {
      animation-duration: 20s !important;
    }

    .aw-background--speed-medium {
      animation-duration: 10s !important;
    }

    .aw-background--speed-fast {
      animation-duration: 5s !important;
    }

    /* Keyframe animations */
    @keyframes gradient-wave {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes gradient-pulse {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }

    @keyframes gradient-rotate {
      0% { background-position: 0% 50%; }
      25% { background-position: 100% 100%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 0% 0%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes mesh-morph {
      0%, 100% {
        background: 
          radial-gradient(at 40% 20%, #ef780180 0px, transparent 50%),
          radial-gradient(at 80% 0%, #f9731680 0px, transparent 50%),
          radial-gradient(at 0% 50%, #fb923c80 0px, transparent 50%);
      }
      33% {
        background: 
          radial-gradient(at 60% 80%, #ef780180 0px, transparent 50%),
          radial-gradient(at 20% 100%, #f9731680 0px, transparent 50%),
          radial-gradient(at 100% 20%, #fb923c80 0px, transparent 50%);
      }
      66% {
        background: 
          radial-gradient(at 20% 40%, #ef780180 0px, transparent 50%),
          radial-gradient(at 100% 60%, #f9731680 0px, transparent 50%),
          radial-gradient(at 50% 100%, #fb923c80 0px, transparent 50%);
      }
    }

    @keyframes geometric-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .aw-background {
        animation: none !important;
      }
      
      .aw-background::after {
        animation: none !important;
      }
    }

    /* Interactive states */
    .aw-background--interactive:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  `;

  /**
   * Background type/effect
   */
  @property() type: BackgroundType = BackgroundType.LinearGradient;

  /**
   * Animation type
   */
  @property() animation: AnimationType = AnimationType.None;

  /**
   * Animation speed
   */
  @property() speed: AnimationSpeed = AnimationSpeed.Medium;

  /**
   * Background color(s) - comma-separated for gradients
   */
  @property() colors: string = '#ef7801,#f97316,#fb923c';

  /**
   * Gradient direction (degrees for linear, shape for radial)
   */
  @property() direction: string = '135deg';

  /**
   * Whether the background is interactive
   */
  @property({ type: Boolean }) interactive: boolean = false;

  /**
   * Number of particles for particle field
   */
  @property({ type: Number, attribute: 'particle-count' }) particleCount: number = 50;

  /**
   * Opacity of the background effect
   */
  @property({ type: Number }) opacity: number = 1;

  /**
   * Custom shader code (for advanced users)
   */
  @property() shader?: string;

  /**
   * Whether to respond to mouse movement
   */
  @property({ type: Boolean, attribute: 'mouse-responsive' }) mouseResponsive: boolean = false;

  @state() private _particles: Particle[] = [];
  @state() private _mouseX: number = 0;
  @state() private _mouseY: number = 0;
  @state() private _animationId?: number;

  @query('.aw-background__canvas') private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.mouseResponsive) {
      document.addEventListener('mousemove', this._handleMouseMove);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    document.removeEventListener('mousemove', this._handleMouseMove);
    
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
  }

  firstUpdated() {
    this._setupCanvas();
    this._initializeParticles();
    
    if (this.type === BackgroundType.ParticleField || this.type === BackgroundType.Wave) {
      this._startAnimation();
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('colors')) {
      this._updateCSSColors();
    }
    
    if (changedProperties.has('direction')) {
      this.style.setProperty('--aw-gradient-direction', this.direction);
    }
    
    if (changedProperties.has('opacity')) {
      this.style.opacity = this.opacity.toString();
    }
  }

  private _updateCSSColors() {
    const colorArray = this.colors.split(',').map(c => c.trim());
    this.style.setProperty('--aw-gradient-colors', colorArray.join(', '));
  }

  private _setupCanvas() {
    if (!this._canvas) return;
    
    this._ctx = this._canvas.getContext('2d') || undefined;
    this._resizeCanvas();
    
    window.addEventListener('resize', this._resizeCanvas);
  }

  private _resizeCanvas = () => {
    if (!this._canvas) return;
    
    const rect = this.getBoundingClientRect();
    this._canvas.width = rect.width * devicePixelRatio;
    this._canvas.height = rect.height * devicePixelRatio;
    this._canvas.style.width = `${rect.width}px`;
    this._canvas.style.height = `${rect.height}px`;
    
    if (this._ctx) {
      this._ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  };

  private _initializeParticles() {
    if (this.type !== BackgroundType.ParticleField) return;
    
    const colors = this.colors.split(',').map(c => c.trim());
    this._particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this._particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private _startAnimation() {
    const animate = () => {
      this._updateParticles();
      this._renderCanvas();
      this._animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  private _updateParticles() {
    if (this.type !== BackgroundType.ParticleField || !this._canvas) return;
    
    const width = this._canvas.offsetWidth;
    const height = this._canvas.offsetHeight;
    
    this._particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
      
      // Mouse interaction
      if (this.mouseResponsive) {
        const dx = this._mouseX - particle.x;
        const dy = this._mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx -= dx * force * 0.01;
          particle.vy -= dy * force * 0.01;
        }
      }
      
      // Apply drag
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    });
  }

  private _renderCanvas() {
    if (!this._ctx || !this._canvas) return;
    
    const width = this._canvas.offsetWidth;
    const height = this._canvas.offsetHeight;
    
    this._ctx.clearRect(0, 0, width, height);
    
    if (this.type === BackgroundType.ParticleField) {
      this._renderParticles();
    } else if (this.type === BackgroundType.Wave) {
      this._renderWave();
    }
  }

  private _renderParticles() {
    if (!this._ctx) return;
    
    this._particles.forEach(particle => {
      this._ctx!.globalAlpha = particle.opacity;
      this._ctx!.fillStyle = particle.color;
      this._ctx!.beginPath();
      this._ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this._ctx!.fill();
      
      // Draw connections
      this._particles.forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this._ctx!.globalAlpha = (100 - distance) / 100 * 0.1;
          this._ctx!.strokeStyle = particle.color;
          this._ctx!.lineWidth = 1;
          this._ctx!.beginPath();
          this._ctx!.moveTo(particle.x, particle.y);
          this._ctx!.lineTo(otherParticle.x, otherParticle.y);
          this._ctx!.stroke();
        }
      });
    });
  }

  private _renderWave() {
    if (!this._ctx || !this._canvas) return;
    
    const width = this._canvas.offsetWidth;
    const height = this._canvas.offsetHeight;
    const time = Date.now() * 0.001;
    
    const colors = this.colors.split(',').map(c => c.trim());
    
    for (let i = 0; i < 3; i++) {
      this._ctx.globalAlpha = 0.3;
      this._ctx.fillStyle = colors[i % colors.length];
      this._ctx.beginPath();
      this._ctx.moveTo(0, height);
      
      for (let x = 0; x <= width; x += 10) {
        const y = height * 0.5 + Math.sin(x * 0.01 + time + i) * 50;
        this._ctx.lineTo(x, y);
      }
      
      this._ctx.lineTo(width, height);
      this._ctx.closePath();
      this._ctx.fill();
    }
  }

  private _handleMouseMove = (event: MouseEvent) => {
    this._mouseX = event.clientX;
    this._mouseY = event.clientY;
    
    if (this.interactive) {
      const awBackgroundInteractEvent = new CustomEvent('aw-background-interact', {
        detail: {
          x: this._mouseX,
          y: this._mouseY,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(awBackgroundInteractEvent);
    }
  };

  render() {
    const backgroundClasses = {
      'aw-background': true,
      [`aw-background--type-${this.type}`]: true,
      [`aw-background--animation-${this.animation}`]: this.animation !== AnimationType.None,
      [`aw-background--speed-${this.speed}`]: true,
      'aw-background--interactive': this.interactive,
    };

    const needsCanvas = [
      BackgroundType.ParticleField,
      BackgroundType.Wave,
      BackgroundType.Shader
    ].includes(this.type);

    return html`
      <div class=${classMap(backgroundClasses)}>
        ${needsCanvas ? html`
          <canvas 
            class="aw-background__canvas"
            @click=${this.interactive ? this._handleCanvasClick : null}
          ></canvas>
        ` : ''}
        
        <!-- Slot for additional content -->
        <slot></slot>
      </div>
    `;
  }

  private _handleCanvasClick = (event: MouseEvent) => {
    const awBackgroundClickEvent = new CustomEvent('aw-background-click', {
      detail: {
        x: event.offsetX,
        y: event.offsetY,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awBackgroundClickEvent);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-background': AwBackground;
  }
}