
import AnimatedText, {
  AnimTextOrder,
} from "../motion/animated-text";
import { useThemeContext } from "../context/themeContext";
import { getGridPositionClass, getJustifyClass } from "../../utils/styleUtils";

export default function   PostIntro({ title, content, tag }) {
  const { currentTheme } = useThemeContext();
  const headingPosition = currentTheme.data.heroTextPosition;

//  console.log('titlecontent---------',title)
  return (
    //pt-[16rem] pb-8
    <div className={`grid z-10 grid-cols-4 gap-6 content-end items-end w-full ${currentTheme.data.fontScale === 'fluid' ? 'fluid-type' : ''}`}>
       <div className={`col-span-2 ${getJustifyClass(currentTheme.data.headerTextAlign)} ${getGridPositionClass(currentTheme.data.headerTextPosition, { maxCols: 4, responsive: "", alignment: "" })}`}>
        <>
          {tag && (
            <div
              className="inline-flex px-2 py-1 mb-8 ml-2 text-xs font-medium uppercase rounded-full"
              style={{
                color: "var(--text-color-inv)",
                backgroundColor: "var(--accent-pri)",
              }}
            >
              {tag}
            </div>
          )}
          {title && (
            <h1 className="text-4xl leading-normal text-balance">
              <AnimatedText
                content={title}
                align={currentTheme.data.headerTextAlign}
                type={currentTheme.data.textAnimation}
                delay={AnimTextOrder.ONE}
              />
              {/* <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/> */}
            </h1>
          )}
        </>
      </div>
      <div className="col-span-12 text-left md:col-span-8 lg:col-span-4 text-balance">
        <p className="text-sm font-normal"
                      style={{
                        color: "var(--subtext-color)",
                      }}
        >
          {content && (
            <AnimatedText
              align={currentTheme.data.headerTextAlign}
              type={currentTheme.data.textAnimationSec}
              content={content}
              delay={AnimTextOrder.THREE}
            />
          )}
        </p>
      </div>
    </div>
  );
}
