import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { Size } from '../../../types';

/**
 * File information interface
 */
export interface AwFileInfo {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  error?: string;
}

/**
 * AW File Input Component
 * 
 * A comprehensive file upload component with drag & drop, multiple file support,
 * file preview, progress tracking, and validation. Supports images, documents,
 * and various file types with customizable restrictions.
 * 
 * @element aw-file-input
 * 
 * @fires aw-file-input-change - Fired when files are selected or removed
 * @fires aw-file-input-drop - Fired when files are dropped
 * @fires aw-file-input-error - Fired when validation errors occur
 * @fires aw-file-input-progress - Fired during upload progress (if supported)
 * @fires aw-file-input-preview - Fired when a file preview is requested
 * 
 * @csspart container - The main container
 * @csspart dropzone - The drag & drop area
 * @csspart input - The hidden file input
 * @csspart trigger - The upload trigger button
 * @csspart preview - The file preview area
 * @csspart file-item - Individual file items
 * @csspart remove-button - File remove buttons
 * 
 * @example
 * ```html
 * <aw-file-input
 *   name="attachments"
 *   accept="image/*,.pdf,.doc,.docx"
 *   multiple
 *   max-files="5"
 *   max-size="10485760"
 *   show-preview
 *   drag-drop
 * >
 *   <span slot="trigger">Choose files or drag them here</span>
 *   <span slot="help">Max 5 files, 10MB each. Images, PDF, or Word documents only.</span>
 * </aw-file-input>
 * ```
 */
@customElement('aw-file-input')
export class AwFileInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-file-input */
    .aw-file-input {
      width: 100%;
    }

    .aw-file-input__dropzone {
      position: relative;
      border: 2px dashed var(--aw-color-neutral-300, #d1d5db);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      padding: var(--aw-spacing-xl, 1.5rem);
      text-align: center;
      transition: all var(--aw-transition-duration-default, 0.2s);
      cursor: pointer;
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-file-input__dropzone:hover {
      border-color: var(--aw-color-primary-400, #60a5fa);
      background-color: var(--aw-color-primary-25, #fefeff);
    }

    .aw-file-input__dropzone--active {
      border-color: var(--aw-color-primary-500, #3b82f6);
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    .aw-file-input__dropzone--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--aw-color-neutral-50, #f9fafb);
    }

    .aw-file-input__dropzone--disabled:hover {
      border-color: var(--aw-color-neutral-300, #d1d5db);
      background-color: var(--aw-color-neutral-50, #f9fafb);
    }

    .aw-file-input__dropzone--error {
      border-color: var(--aw-color-danger-400, #f87171);
      background-color: var(--aw-color-danger-25, #fffbfb);
    }

    .aw-file-input__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      overflow: hidden;
    }

    .aw-file-input__trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      background-color: var(--aw-color-primary-500, #3b82f6);
      color: var(--aw-color-neutral-white, #ffffff);
      border: none;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s);
      text-decoration: none;
      outline: none;
    }

    .aw-file-input__trigger:hover:not(:disabled) {
      background-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-file-input__trigger:focus {
      box-shadow: 0 0 0 2px var(--aw-color-primary-100, #dbeafe);
    }

    .aw-file-input__trigger:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .aw-file-input__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-file-input__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-file-input__help {
      font-size: var(--aw-font-size-sm, 0.875rem);
      color: var(--aw-color-neutral-600, #4b5563);
      margin-top: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-file-input__preview {
      margin-top: var(--aw-spacing-lg, 1rem);
    }

    .aw-file-input__files {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-file-input__file {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-spacing-sm, 0.5rem);
      border: 1px solid var(--aw-color-neutral-200, #e5e7eb);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-file-input__file--error {
      border-color: var(--aw-color-danger-300, #fca5a5);
      background-color: var(--aw-color-danger-25, #fffbfb);
    }

    .aw-file-input__file-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-600, #4b5563);
      flex-shrink: 0;
    }

    .aw-file-input__file-info {
      flex: 1;
      min-width: 0;
    }

    .aw-file-input__file-name {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-900, #111827);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .aw-file-input__file-size {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-file-input__file-error {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-danger-600, #dc2626);
    }

    .aw-file-input__file-progress {
      width: 100%;
      height: 4px;
      background-color: var(--aw-color-neutral-200, #e5e7eb);
      border-radius: 2px;
      margin-top: var(--aw-spacing-xs, 0.25rem);
      overflow: hidden;
    }

    .aw-file-input__file-progress-bar {
      height: 100%;
      background-color: var(--aw-color-primary-500, #3b82f6);
      border-radius: 2px;
      transition: width var(--aw-transition-duration-default, 0.2s);
    }

    .aw-file-input__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--aw-color-neutral-500, #6b7280);
      transition: all var(--aw-transition-duration-fast, 0.1s);
      flex-shrink: 0;
    }

    .aw-file-input__remove:hover {
      color: var(--aw-color-danger-600, #dc2626);
      background-color: var(--aw-color-danger-50, #fef2f2);
    }

    .aw-file-input__image-preview {
      width: 32px;
      height: 32px;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      object-fit: cover;
      flex-shrink: 0;
    }

    /* Size variants */
    .aw-file-input--size-sm .aw-file-input__dropzone {
      padding: var(--aw-spacing-lg, 1rem);
    }

    .aw-file-input--size-sm .aw-file-input__trigger {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-file-input--size-sm .aw-file-input__icon {
      width: 32px;
      height: 32px;
    }

    .aw-file-input--size-lg .aw-file-input__dropzone {
      padding: var(--aw-spacing-2xl, 2rem);
    }

    .aw-file-input--size-lg .aw-file-input__trigger {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-xl, 1.5rem);
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-file-input--size-lg .aw-file-input__icon {
      width: 64px;
      height: 64px;
    }

    /* Compact variant */
    .aw-file-input--variant-compact .aw-file-input__dropzone {
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      border-style: solid;
      padding: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-file-input--variant-compact .aw-file-input__content {
      flex-direction: row;
      justify-content: center;
      text-align: left;
    }

    .aw-file-input--variant-compact .aw-file-input__icon {
      display: none;
    }
  `;

  /**
   * Input name attribute
   */
  @property() file_name: string = '';

  /**
   * Input ID attribute
   */
  @property() file_id: string = '';

  /**
   * Accepted file types
   */
  @property() accept: string = '*/*';

  /**
   * Allow multiple files
   */
  @property({ type: Boolean }) multiple: boolean = false;

  /**
   * Maximum number of files (0 = unlimited)
   */
  @property({ type: Number }) max_files: number = 0;

  /**
   * Maximum file size in bytes
   */
  @property({ type: Number }) max_size: number = 0;

  /**
   * Size variant
   */
  @property() size: Size = 'md';

  /**
   * Visual variant
   */
  @property() variant: 'default' | 'compact' = 'default';

  /**
   * Enable drag and drop
   */
  @property({ type: Boolean }) drag_drop: boolean = true;

  /**
   * Show file previews
   */
  @property({ type: Boolean }) show_preview: boolean = true;

  /**
   * Show progress bars (for upload progress)
   */
  @property({ type: Boolean }) show_progress: boolean = false;

  /**
   * Disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Required state
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * Error state
   */
  @property({ type: Boolean }) has_error: boolean = false;

  /**
   * Trigger button text
   */
  @property() trigger_text: string = 'Choose Files';

  /**
   * Help text
   */
  @property() help_text: string = '';

  @state() private files: AwFileInfo[] = [];
  @state() private isDragActive: boolean = false;
  @state() private dragCounter: number = 0;

  @query('.aw-file-input__input') private fileInput!: HTMLInputElement;

  /**
   * Get current files
   */
  getFiles(): AwFileInfo[] {
    return [...this.files];
  }

  /**
   * Clear all files
   */
  clearFiles(): void {
    this.files = [];
    if (this.fileInput) {
      this.fileInput.value = '';
    }
    this.dispatchChangeEvent();
  }

  /**
   * Add files programmatically
   */
  addFiles(newFiles: File[]): void {
    this.processFiles(newFiles);
  }

  /**
   * Remove a specific file
   */
  removeFile(id: string): void {
    this.files = this.files.filter(f => f.id !== id);
    this.dispatchChangeEvent();
  }

  /**
   * Update file progress
   */
  updateFileProgress(id: string, progress: number): void {
    const file = this.files.find(f => f.id === id);
    if (file) {
      file.progress = Math.max(0, Math.min(100, progress));
      this.requestUpdate();

      const progressEvent = new CustomEvent('aw-file-input-progress', {
        detail: {
          fileId: id,
          progress: file.progress,
          file: file.file,
          name: this.file_name
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(progressEvent);
    }
  }

  /**
   * Set file error
   */
  setFileError(id: string, error: string): void {
    const file = this.files.find(f => f.id === id);
    if (file) {
      file.error = error;
      this.requestUpdate();
    }
  }

  private generateFileId(): string {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private validateFile(file: File): string | null {
    // Check file size
    if (this.max_size > 0 && file.size > this.max_size) {
      return `File size exceeds ${this.formatFileSize(this.max_size)} limit`;
    }

    // Check file type
    if (this.accept && this.accept !== '*/*') {
      const acceptedTypes = this.accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        } else if (type.includes('*')) {
          const [mainType] = type.split('/');
          return file.type.startsWith(mainType);
        } else {
          return file.type === type;
        }
      });

      if (!isAccepted) {
        return `File type not accepted. Allowed: ${this.accept}`;
      }
    }

    return null;
  }

  private processFiles(fileList: File[]): void {
    const validFiles: AwFileInfo[] = [];
    const errors: string[] = [];

    // Check max files limit
    if (this.max_files > 0) {
      const totalFiles = this.files.length + fileList.length;
      if (totalFiles > this.max_files) {
        errors.push(`Maximum ${this.max_files} files allowed`);
        return this.dispatchErrorEvent(errors);
      }
    }

    fileList.forEach(file => {
      const validationError = this.validateFile(file);
      
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        const fileInfo: AwFileInfo = {
          id: this.generateFileId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: this.show_progress ? 0 : undefined
        };

        // Create preview URL for images
        if (this.show_preview && file.type.startsWith('image/')) {
          fileInfo.url = URL.createObjectURL(file);
        }

        validFiles.push(fileInfo);
      }
    });

    if (errors.length > 0) {
      this.dispatchErrorEvent(errors);
    }

    if (validFiles.length > 0) {
      this.files = this.multiple ? [...this.files, ...validFiles] : validFiles;
      this.dispatchChangeEvent();
    }
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  private getFileIcon(file: AwFileInfo): string {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type === 'application/pdf') return '📄';
    if (file.type.includes('word') || file.type.includes('document')) return '📝';
    if (file.type.includes('sheet') || file.type.includes('excel')) return '📊';
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return '📈';
    return '📎';
  }

  private handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(Array.from(input.files));
    }
  };

  private handleTriggerClick = () => {
    if (!this.disabled) {
      this.fileInput.click();
    }
  };

  private handleDragEnter = (event: DragEvent) => {
    if (!this.drag_drop || this.disabled) return;
    
    event.preventDefault();
    this.dragCounter++;
    this.isDragActive = true;
  };

  private handleDragLeave = (event: DragEvent) => {
    if (!this.drag_drop || this.disabled) return;
    
    event.preventDefault();
    this.dragCounter--;
    
    if (this.dragCounter === 0) {
      this.isDragActive = false;
    }
  };

  private handleDragOver = (event: DragEvent) => {
    if (!this.drag_drop || this.disabled) return;
    event.preventDefault();
  };

  private handleDrop = (event: DragEvent) => {
    if (!this.drag_drop || this.disabled) return;
    
    event.preventDefault();
    this.isDragActive = false;
    this.dragCounter = 0;

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      this.processFiles(files);
      
      const dropEvent = new CustomEvent('aw-file-input-drop', {
        detail: {
          files,
          name: this.file_name
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(dropEvent);
    }
  };

  private handleRemoveFile = (id: string) => {
    this.removeFile(id);
  };

  private dispatchChangeEvent(): void {
    const changeEvent = new CustomEvent('aw-file-input-change', {
      detail: {
        files: this.getFiles(),
        fileList: this.files.map(f => f.file),
        name: this.file_name
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  private dispatchErrorEvent(errors: string[]): void {
    const errorEvent = new CustomEvent('aw-file-input-error', {
      detail: {
        errors,
        name: this.file_name
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(errorEvent);
  }

  private renderFilePreview(file: AwFileInfo) {
    return html`
      <div 
        class=${classMap({
          'aw-file-input__file': true,
          'aw-file-input__file--error': Boolean(file.error)
        })} 
        part="file-item"
      >
        ${file.url ? html`
          <img 
            src=${file.url} 
            alt=${file.name}
            class="aw-file-input__image-preview"
          />
        ` : html`
          <div class="aw-file-input__file-icon">
            ${this.getFileIcon(file)}
          </div>
        `}
        
        <div class="aw-file-input__file-info">
          <div class="aw-file-input__file-name" title=${file.name}>
            ${file.name}
          </div>
          <div class="aw-file-input__file-size">
            ${this.formatFileSize(file.size)}
          </div>
          
          ${file.error ? html`
            <div class="aw-file-input__file-error">
              ${file.error}
            </div>
          ` : ''}
          
          ${this.show_progress && file.progress !== undefined ? html`
            <div class="aw-file-input__file-progress">
              <div 
                class="aw-file-input__file-progress-bar"
                style="width: ${file.progress}%"
              ></div>
            </div>
          ` : ''}
        </div>
        
        <button
          type="button"
          class="aw-file-input__remove"
          part="remove-button"
          @click=${() => this.handleRemoveFile(file.id)}
          aria-label="Remove ${file.name}"
        >
          ×
        </button>
      </div>
    `;
  }

  render() {
    const inputId = this.file_id || `aw-file-input-${Math.random().toString(36).substr(2, 9)}`;
    
    return html`
      <div
        class=${classMap({
          'aw-file-input': true,
          [`aw-file-input--size-${this.size}`]: true,
          [`aw-file-input--variant-${this.variant}`]: true
        })}
        part="container"
      >
        <div
          class=${classMap({
            'aw-file-input__dropzone': true,
            'aw-file-input__dropzone--active': this.isDragActive,
            'aw-file-input__dropzone--disabled': this.disabled,
            'aw-file-input__dropzone--error': this.has_error
          })}
          part="dropzone"
          @click=${this.handleTriggerClick}
          @dragenter=${this.handleDragEnter}
          @dragleave=${this.handleDragLeave}
          @dragover=${this.handleDragOver}
          @drop=${this.handleDrop}
        >
          <input
            type="file"
            id=${inputId}
            name=${this.file_name}
            class="aw-file-input__input"
            part="input"
            accept=${this.accept}
            ?multiple=${this.multiple}
            ?required=${this.required}
            ?disabled=${this.disabled}
            @change=${this.handleFileSelect}
          />
          
          <div class="aw-file-input__content">
            <div class="aw-file-input__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            
            <button 
              type="button" 
              class="aw-file-input__trigger"
              part="trigger"
              ?disabled=${this.disabled}
            >
              <slot name="trigger">${this.trigger_text}</slot>
            </button>
            
            ${this.help_text ? html`
              <div class="aw-file-input__help">
                <slot name="help">${this.help_text}</slot>
              </div>
            ` : ''}
          </div>
        </div>
        
        ${this.show_preview && this.files.length > 0 ? html`
          <div class="aw-file-input__preview" part="preview">
            <div class="aw-file-input__files">
              ${repeat(this.files, f => f.id, file => this.renderFilePreview(file))}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up object URLs to prevent memory leaks
    this.files.forEach(file => {
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-file-input': AwFileInput;
  }
}