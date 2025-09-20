/**
 * Text Swap Animation Utility for Lit Components
 * Provides smooth character-level text swapping animations
 */

export interface TextSwapOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  staggerDelay?: number;
}

export interface SwapAnimationState {
  currentText: string;
  targetText: string;
  isAnimating: boolean;
  progress: number;
}

export class TextSwapAnimation {
  private element: HTMLElement;
  private currentChars: HTMLElement[] = [];
  private isAnimating = false;
  private currentText = '';
  private targetText = '';

  constructor(element: HTMLElement) {
    this.element = element;
  }

  /**
   * Animate text swap with character-level transitions
   */
  async swapText(
    newText: string, 
    options: TextSwapOptions = {}
  ): Promise<void> {
    if (this.isAnimating) {
      return;
    }

    const {
      duration = 300,
      delay: _delay = 0,
      ease = 'ease-out',
      staggerDelay = 20
    } = options;

    this.isAnimating = true;
    this.targetText = newText;
    
    // If first time, just set the text
    if (!this.currentText) {
      this.currentText = newText;
      this.element.textContent = newText;
      this.isAnimating = false;
      return;
    }

    // Create character elements if needed
    if (this.currentChars.length === 0) {
      this.createCharacterElements(this.currentText);
    }

    try {
      // Phase 1: Animate out current characters
      await this.animateOut(duration / 2, ease, staggerDelay);
      
      // Phase 2: Update text and animate in new characters
      this.updateText(newText);
      await this.animateIn(duration / 2, ease, staggerDelay);
      
      this.currentText = newText;
    } catch (error) {
      // Fallback to instant text change
      this.element.textContent = newText;
      this.currentText = newText;
    } finally {
      this.isAnimating = false;
    }
  }

  /**
   * Create individual character elements for animation
   */
  private createCharacterElements(text: string): void {
    this.element.innerHTML = '';
    this.currentChars = [];

    for (let i = 0; i < text.length; i++) {
      const char = document.createElement('span');
      char.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Non-breaking space
      char.style.cssText = `
        display: inline-block;
        transition: transform 300ms ease-out, opacity 300ms ease-out;
        transform: translateY(0);
        opacity: 1;
      `;
      this.currentChars.push(char);
      this.element.appendChild(char);
    }
  }

  /**
   * Animate characters out (up and fade)
   */
  private animateOut(duration: number, ease: string, staggerDelay: number): Promise<void> {
    return new Promise((resolve) => {
      const chars = this.currentChars;
      let completedCount = 0;

      chars.forEach((char, index) => {
        setTimeout(() => {
          char.style.transition = `transform ${duration}ms ${ease}, opacity ${duration}ms ${ease}`;
          char.style.transform = 'translateY(-20px)';
          char.style.opacity = '0';

          // Resolve when last character completes
          if (index === chars.length - 1) {
            setTimeout(() => resolve(), duration);
          }
        }, index * staggerDelay);
      });

      // Safety timeout
      setTimeout(() => resolve(), (chars.length * staggerDelay) + duration + 100);
    });
  }

  /**
   * Update text content and create new character elements
   */
  private updateText(newText: string): void {
    this.element.innerHTML = '';
    this.currentChars = [];

    for (let i = 0; i < newText.length; i++) {
      const char = document.createElement('span');
      char.textContent = newText[i] === ' ' ? '\u00A0' : newText[i];
      char.style.cssText = `
        display: inline-block;
        transition: transform 300ms ease-out, opacity 300ms ease-out;
        transform: translateY(20px);
        opacity: 0;
      `;
      this.currentChars.push(char);
      this.element.appendChild(char);
    }
  }

  /**
   * Animate characters in (from below and fade in)
   */
  private animateIn(duration: number, ease: string, staggerDelay: number): Promise<void> {
    return new Promise((resolve) => {
      const chars = this.currentChars;

      // Force reflow before animating
      this.element.offsetHeight;

      chars.forEach((char, index) => {
        setTimeout(() => {
          char.style.transition = `transform ${duration}ms ${ease}, opacity ${duration}ms ${ease}`;
          char.style.transform = 'translateY(0)';
          char.style.opacity = '1';

          // Resolve when last character completes
          if (index === chars.length - 1) {
            setTimeout(() => resolve(), duration);
          }
        }, index * staggerDelay);
      });

      // Safety timeout
      setTimeout(() => resolve(), (chars.length * staggerDelay) + duration + 100);
    });
  }

  /**
   * Get current animation state
   */
  getState(): SwapAnimationState {
    return {
      currentText: this.currentText,
      targetText: this.targetText,
      isAnimating: this.isAnimating,
      progress: this.isAnimating ? 0.5 : 1
    };
  }

  /**
   * Cleanup animation resources
   */
  destroy(): void {
    this.currentChars = [];
    this.element.innerHTML = this.currentText;
    this.isAnimating = false;
  }
}

/**
 * Factory function to create text swap animation
 */
export function createTextSwapAnimation(element: HTMLElement): TextSwapAnimation {
  return new TextSwapAnimation(element);
}