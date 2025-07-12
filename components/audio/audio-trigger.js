import { useCallback, useEffect } from 'react';
import { useThemeContext } from '../context/themeContext';
import { useAudioControls, playAudio } from '../navigation/audio-utils';

/**
 * @hook useRouteAudio
 * @description Enhanced audio hook with configurable options for adding click and hover sounds to components
 * @category hooks/audio
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} options.onClick - Enable click audio (default: true)
 * @param {boolean} options.onHover - Enable hover audio (default: true)
 * @param {string} options.clickSound - Custom click sound name (falls back to theme audioPageTransitionStart)
 * @param {string} options.hoverSound - Custom hover sound name (falls back to theme audioInternalLinkHover)
 * @param {string} options.fallbackSound - Fallback sound when no theme sound is available (default: 'click')
 * 
 * @returns {Object} Audio event handlers and utilities
 * @returns {Function} returns.onClick - Click event handler
 * @returns {Function} returns.onMouseEnter - Mouse enter event handler
 * @returns {Function} returns.playSound - Utility function to play custom sounds
 * 
 * @example
 * // Basic usage with defaults
 * const PostTile = ({ post }) => {
 *   const routeAudio = useRouteAudio();
 *   return <Link href={`/posts/${post.slug}`} {...routeAudio}>...</Link>
 * };
 * 
 * @example
 * // Custom configuration
 * const PostTile = ({ post }) => {
 *   const routeAudio = useRouteAudio({
 *     onClick: true,
 *     onHover: false,  // Disable hover sound
 *     clickSound: 'beepOn',
 *     hoverSound: 'plink',
 *     fallbackSound: 'click'
 *   });
 *   return <Link href={`/posts/${post.slug}`} {...routeAudio}>...</Link>
 * };
 * 
 * @example
 * // Destructured usage for specific control
 * const PostTile = ({ post }) => {
 *   const { onClick, onMouseEnter, playSound } = useRouteAudio({
 *     clickSound: 'beepOn'
 *   });
 *   
 *   const handleCustomAction = () => {
 *     playSound('marimba'); // Play custom sound
 *   };
 *   
 *   return (
 *     <Link 
 *       href={`/posts/${post.slug}`}
 *       onClick={onClick}
 *       onMouseEnter={onMouseEnter}
 *     >
 *       <button onClick={handleCustomAction}>Play Custom Sound</button>
 *       ...
 *     </Link>
 *   );
 * };
 * 
 * @example
 * // Conditional audio based on props
 * const PostTile = ({ post, enableAudio = true, audioType = 'default' }) => {
 *   const routeAudio = useRouteAudio({
 *     onClick: enableAudio,
 *     onHover: enableAudio,
 *     clickSound: audioType === 'premium' ? 'marimba' : 'beepOn'
 *   });
 *   return <Link href={`/posts/${post.slug}`} {...routeAudio}>...</Link>
 * };
 * 
 * @exports useRouteAudio
 */
export const useRouteAudio = (options = {}) => {
  const {
    onClick = true,
    onHover = true,
    clickSound,
    hoverSound,
    fallbackSound = 'click'
  } = options;

  const { currentTheme } = useThemeContext();
  const { audioRefs } = useAudioControls();

  const playSound = useCallback((soundName) => {
    if (!currentTheme.data.audioEnabled) return;
    
    console.log('playing sound', soundName);
    const audioRef = audioRefs[soundName];
    if (audioRef) {
      playAudio(audioRef, currentTheme.data.audioVolume, currentTheme.data.audioEnabled);
    }
  }, [audioRefs, currentTheme.data.audioEnabled, currentTheme.data.audioVolume]);

  const handleClick = useCallback(() => {
    if (!onClick) return;
    const sound = clickSound || currentTheme.data.audioPageTransitionStart || fallbackSound;
    playSound(sound);
  }, [onClick, clickSound, currentTheme.data.audioPageTransitionStart, fallbackSound, playSound]);

  const handleHover = useCallback(() => {
    if (!onHover) return;
    const sound = hoverSound || currentTheme.data.audioInternalLinkHover || fallbackSound;
    playSound(sound);
  }, [onHover, hoverSound, currentTheme.data.audioInternalLinkHover, fallbackSound, playSound]);

  return {
    onClick: handleClick,
    onMouseEnter: handleHover,
    // Utility functions (don't spread these onto DOM elements)
    playSound
  };
};

/**
 * @hook useDeclarativeAudio
 * @description Declarative audio hook using data attributes. Automatically detects and applies audio based on data-audio-* attributes
 * @category hooks/audio
 * 
 * @param {HTMLElement} elementRef - Ref to the target element
 * 
 * @returns {Object} Audio utilities
 * @returns {Function} returns.playSound - Utility function to play custom sounds
 * 
 * @example
 * // Using data attributes directly on JSX
 * const PostTile = ({ post }) => {
 *   return (
 *     <Link 
 *       href={`/posts/${post.slug}`}
 *       data-audio-click="beepOn"
 *       data-audio-hover="plink"
 *     >
 *       ...
 *     </Link>
 *   );
 * };
 * 
 * @example
 * // With dynamic values
 * const PostTile = ({ post, clickSound = 'beepOn' }) => {
 *   return (
 *     <Link 
 *       href={`/posts/${post.slug}`}
 *       data-audio-click={clickSound}
 *       data-audio-hover="plink"
 *     >
 *       ...
 *     </Link>
 *   );
 * };
 * 
 * @example
 * // Using with ref for programmatic control
 * const PostTile = ({ post }) => {
 *   const linkRef = useRef(null);
 *   const { playSound } = useDeclarativeAudio(linkRef);
 *   
 *   const handleCustomAction = () => {
 *     playSound('marimba');
 *   };
 *   
 *   return (
 *     <Link 
 *       ref={linkRef}
 *       href={`/posts/${post.slug}`}
 *       data-audio-click="beepOn"
 *       data-audio-hover="plink"
 *     >
 *       <button onClick={handleCustomAction}>Custom Sound</button>
 *       ...
 *     </Link>
 *   );
 * };
 * 
 * @exports useDeclarativeAudio
 */
export const useDeclarativeAudio = (elementRef) => {
  const { currentTheme } = useThemeContext();
  const { audioRefs } = useAudioControls();

  const playSound = useCallback((soundName) => {
    if (!currentTheme.data.audioEnabled) return;
    
    const audioRef = audioRefs[soundName];
    if (audioRef) {
      playAudio(audioRef, currentTheme.data.audioVolume, currentTheme.data.audioEnabled);
    }
  }, [audioRefs, currentTheme.data.audioEnabled, currentTheme.data.audioVolume]);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    const handleClick = () => {
      const clickSound = element.dataset.audioClick;
      if (clickSound) {
        playSound(clickSound);
      }
    };

    const handleMouseEnter = () => {
      const hoverSound = element.dataset.audioHover;
      if (hoverSound) {
        playSound(hoverSound);
      }
    };

    // Only add listeners if data attributes exist
    if (element.dataset.audioClick) {
      element.addEventListener('click', handleClick);
    }
    if (element.dataset.audioHover) {
      element.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      element.removeEventListener('click', handleClick);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [elementRef, playSound]);

  return { playSound };
};

/**
 * @component withDeclarativeAudio
 * @description Higher-order component for declarative audio. Wraps component and adds audio based on data attributes
 * @category hoc/audio
 * 
 * @param {React.Component} Component - The component to wrap with audio functionality
 * 
 * @returns {React.Component} Enhanced component with audio capabilities
 * 
 * @example
 * // Wrap your component
 * const AudioPostTile = withDeclarativeAudio(PostTile);
 * 
 * // Use with data attributes as props
 * <AudioPostTile 
 *   post={post}
 *   data-audio-click="beepOn"
 *   data-audio-hover="plink"
 * />
 * 
 * @example
 * // Create an audio-enabled grid component
 * const AudioGridTile = withDeclarativeAudio(({ post, children, ...props }) => (
 *   <Link href={`/posts/${post.slug}`} {...props}>
 *     {children}
 *   </Link>
 * ));
 * 
 * // Usage in grid
 * const GridBento = ({ items }) => (
 *   <div className="grid">
 *     {items.map((item, index) => (
 *       <AudioGridTile 
 *         key={index}
 *         post={item}
 *         data-audio-click="beepOn"
 *         data-audio-hover="plink"
 *       >
 *         <PostContent post={item} />
 *       </AudioGridTile>
 *     ))}
 *   </div>
 * );
 * 
 * @exports withDeclarativeAudio
 */
export const withDeclarativeAudio = (Component) => {
  return function AudioEnabledComponent({ 'data-audio-click': clickSound, 'data-audio-hover': hoverSound, ...props }) {
    const audioOptions = {};
    if (clickSound) audioOptions.clickSound = clickSound;
    if (hoverSound) audioOptions.hoverSound = hoverSound;
    
    const routeAudio = useRouteAudio(audioOptions);
    
    return <Component {...props} {...routeAudio} />;
  };
};

export default useRouteAudio;