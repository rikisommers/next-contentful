export const RotarySize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
};

export const getRotaryClasses = ({ size = RotarySize.MD, className = '' }) => {
  const baseClasses = {
    container: 'flex flex-col items-start gap-2',
    label: 'text-xs text-gray-600',
    rotaryContainer: 'relative inline-block',
    rotaryTrack: [
      'absolute inset-0',
      'rounded-full',
      'bg-gray-100 dark:bg-gray-800',
      'border-2 border-gray-200 dark:border-gray-700',
      'pointer-events-none'
    ].join(' '),
    rotaryKnob: [
      'absolute',
      'rounded-full',
      'bg-white dark:bg-gray-700',
      'cursor-ns-resize',
      'shadow-sm hover:shadow-md active:shadow-sm',
      'user-select-none',
      'z-10',
      size === RotarySize.SM ? 'top-[15%] left-[15%] w-[70%] h-[70%]' :
      size === RotarySize.MD ? 'top-[10%] left-[10%] w-[80%] h-[80%]' :
      'top-[5%] left-[5%] w-[90%] h-[90%]'
    ].join(' '),
    knobIndicator: [
      'absolute',
      'left-1/2 -translate-x-1/2',
      'bg-gray-600 dark:bg-gray-300',
      'rounded-full',
      'pointer-events-none',
      size === RotarySize.SM ? 'w-0.5 h-[15%] top-[15%]' :
      size === RotarySize.MD ? 'w-1 h-[20%] top-[10%]' :
      'w-1.5 h-[25%] top-[5%]'
    ].join(' ')
  };

  return {
    ...baseClasses,
    rotaryContainer: `${baseClasses.rotaryContainer} ${className}`.trim()
  };
};

export const getRotarySize = (size = RotarySize.MD) => {
  const sizes = {
    [RotarySize.SM]: 40,
    [RotarySize.MD]: 50,
    [RotarySize.LG]: 60
  };
  
  return sizes[size] || sizes[RotarySize.MD];
};