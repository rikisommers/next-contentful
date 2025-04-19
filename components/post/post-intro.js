
import AnimatedText, {
  AnimTextOrder,
} from "../motion/animated-text";
import { useThemeContext } from "../context/themeContext";

export default function PostIntro({ title, content, tag }) {
  const { currentTheme } = useThemeContext();

  console.log('titlecontent---------',title)
  return (
    //pt-[16rem] pb-8
    <div className="z-10 grid items-end content-end w-full grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        <>
          {tag && (
            <div
              className="inline-flex px-2 py-1 mb-8 ml-2 text-xs font-medium uppercase rounded-full"
              style={{
                color: "var(--text-accent)",
                backgroundColor: "var(--body-background-color)",
              }}
            >
              {tag}
            </div>
          )}
          {title && (
            <h1 className="text-4xl leading-normal text-balance">
              <AnimatedText
                content={title}
                type={currentTheme.data.textAnimation}
                delay={AnimTextOrder.ONE}
              />
              {/* <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/> */}
            </h1>
          )}
        </>
      </div>
      <div className="col-span-12 text-left md:col-span-8 lg:col-span-4 text-balance">
        <h4 className="text-sm font-normal"
                      style={{
                        color: "var(--subtext-color)",
                      }}
        >
          {content && (
            <AnimatedText
              type={currentTheme.data.textAnimationSec}
              content={content}
              delay={AnimTextOrder.THREE}
            />
          )}
        </h4>
      </div>
    </div>
  );
}
