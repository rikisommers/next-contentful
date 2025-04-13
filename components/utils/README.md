# Text Animation Utilities

This directory contains utility functions for text animation components. These utilities help with processing text content, managing animation timing, and rendering text with animations.

## Text Processing Utilities (`splitText.js`)

These utilities help process text content for animation.

### `processContent(content)`

Processes content into words, handling images and formatting.

**Parameters:**
- `content` (string): The content to process

**Returns:**
- Array of processed word objects with the following structure:
  ```javascript
  {
    type: 'text' | 'image',
    text?: string,
    hasItalic?: boolean,
    processedText?: string,
    altText?: string,
    imageUrl?: string,
    segmentIndex: number
  }
  ```

**Use case:**
- When you need to process text with images and formatting for animation

### `splitTextLine(words)`

Split words into lines based on segment indices.

**Parameters:**
- `words` (Array): Array of processed word objects

**Returns:**
- Array of lines, each containing an array of words

**Use case:**
- When you need to display text in a vertical stack

### `splitTextWords(content)`

Split text content into individual words, removing images.

**Parameters:**
- `content` (string): The content to process

**Returns:**
- Array of words

**Use case:**
- When you only need simple text animation without images or formatting

## Animation Timing Utilities (`animationTiming.js`)

These utilities help manage animation timing.

### `calculateAnimationTimers(words, options, setAnimationStep)`

Calculates animation timers for loading in, loading out, and text appearance.

**Parameters:**
- `words` (Array): Array of words to animate
- `options` (Object): Animation options
  - `itemDuration` (number): Duration of each item animation in seconds
  - `itemGap` (number): Gap between item animations in seconds
  - `buffer` (number): Buffer time after all loading spans appear in seconds
- `setAnimationStep` (Function): Function to update animation step

**Returns:**
- Object containing cleanup function and timers

**Use case:**
- When you need to create a custom animation sequence

### `createAnimationSequence(words, options, setAnimationStep)`

Creates animation sequence for text animation.

**Parameters:**
- `words` (Array): Array of words to animate
- `options` (Object): Animation options
  - `itemDuration` (number): Duration of each item animation in seconds
  - `itemGap` (number): Gap between item animations in seconds
  - `buffer` (number): Buffer time after all loading spans appear in seconds
  - `textDelay` (number): Delay before text appears in seconds
- `setAnimationStep` (Function): Function to update animation step

**Returns:**
- Object containing cleanup function

**Use case:**
- When you need to create a complete animation sequence

## Text Rendering Utilities (`textRendering.js`)

These utilities help render text with animations.

### `renderWord(word, index, animationStep, totalWords, options)`

Renders a single word with loading and text animations.

**Parameters:**
- `word` (Object): Word object to render
- `index` (number): Index of the word in the array
- `animationStep` (number): Current animation step
- `totalWords` (number): Total number of words
- `options` (Object): Animation options
  - `itemDuration` (number): Duration of each item animation in seconds
  - `textDelay` (number): Delay before text appears in seconds

**Returns:**
- JSX.Element: Rendered word component

**Use case:**
- When you need to render a single word with animation

### `renderLine(line, lineIndex, allWords, animationStep, options)`

Renders a line of words.

**Parameters:**
- `line` (Array): Array of words in the line
- `lineIndex` (number): Index of the line
- `allWords` (Array): All words array (for finding indices)
- `animationStep` (number): Current animation step
- `options` (Object): Animation options

**Returns:**
- JSX.Element: Rendered line component

**Use case:**
- When you need to render a line of words with animation

### `renderContent(words, animationStep, options)`

Renders the entire content with vertical stacking.

**Parameters:**
- `words` (Array): Array of processed word objects
- `animationStep` (number): Current animation step
- `options` (Object): Animation options

**Returns:**
- JSX.Element: Rendered content component

**Use case:**
- When you need to render the entire content with vertical stacking

### `renderSimpleContent(words, animationStep, options)`

Renders simple content (just words, no images or formatting).

**Parameters:**
- `words` (Array): Array of words
- `animationStep` (number): Current animation step
- `options` (Object): Animation options

**Returns:**
- JSX.Element: Rendered content component

**Use case:**
- When you need to render simple content without images or formatting

## Example Usage

```jsx
import { processContent, splitTextWords, splitTextLine } from '../utils/splitText';
import { createAnimationSequence } from '../utils/animationTiming';
import { renderContent, renderSimpleContent } from '../utils/textRendering';

// In your component
const [words, setWords] = useState([]);
const [animationStep, setAnimationStep] = useState(0);

// Process content
useEffect(() => {
  if (content) {
    // Choose between advanced or simple processing
    const processedWords = useSimpleContent 
      ? splitTextWords(content)
      : processContent(content);
    
    setWords(processedWords);
  }
}, [content, useSimpleContent]);

// Create animation sequence
useEffect(() => {
  if (words.length === 0) return;
  
  const { cleanup } = createAnimationSequence(
    words,
    { itemDuration, itemGap, buffer, textDelay },
    setAnimationStep
  );
  
  return cleanup;
}, [words, itemDuration, itemGap, buffer, textDelay]);

// Render content
return (
  <div>
    {useSimpleContent 
      ? renderSimpleContent(words, animationStep, { itemDuration, textDelay })
      : renderContent(words, animationStep, { itemDuration, textDelay })}
  </div>
);
``` 