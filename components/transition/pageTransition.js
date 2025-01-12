import React, {useEffect} from "react";
import { useThemeContext } from '../context/themeContext';
import TransitionTilt from "./transition-tilt";
import TransitionFade from "./transition-fade";
import TransitionWipeWithChild from "./transition-wipewithchild";
import TransitionTiltAndWipe from "./transition-tiltandwipe";

const TransitionContainer = ({children}) => {
    const { currentTheme } = useThemeContext();

    // useEffect(() => {
    //     console.log('Theme updated in Layout:', currentTheme);
    //     // You can add any additional logic here that should run when the theme changes
    // }, [currentTheme]);
 

  return (
    <>
    {(() => {
        switch (currentTheme.data.pageTransition) {
            case 'tiltandwipe':
                return <TransitionTiltAndWipe>{children}</TransitionTiltAndWipe>;
            case 'tilt':
                return <TransitionTilt active={true} className="z-100">{children}</TransitionTilt>;
            case 'wipe':
                return <TransitionWipeWithChild>{children}</TransitionWipeWithChild>;
            case 'fade':
                return <TransitionFade>{children}</TransitionFade>;
            case 'none':
            default:
                return children;
        }
    })()}
    </>
  );
};

export default TransitionContainer;
