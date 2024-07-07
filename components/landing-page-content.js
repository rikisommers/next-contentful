import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../utils/theme';
import { TextTitle } from "../components/rich-text/text-title";
import { TextSubtitle } from "../components/rich-text/text-subtitle";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";

const LandingPageContent = ({ data }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  const date = new Date(data.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);

  return (
    <>
      <div className={`transition ease-in-out w-screen h-screen bg-gray-900`} style={{ backgroundColor: currentTheme?.bodyBackgroundColor }}>
        <div className="z-10 home">
          <div className="grid items-end h-full grid-cols-12 px-32 py-32">
            <div className="flex flex-col col-span-12 gap-6 md:col-span-6 ">
              <TextTitle content={data.titlealt} />
              <TextSubtitle content={data.contentalt} color={currentTheme?.textColor} />
            </div>
          </div>

          <div className="flex self-end justify-between p-3">
            <div className="flex gap-3">
              <div className="flex gap-1 text-xs lg:col-span-2">
                <span className="uppercase text-slate-400">Location:</span>
                <a href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu" className="text-slate-500">
                  @-43.5093881,172.6992615
                </a>
              </div>

              <div className="flex gap-1 text-xs lg:col-span-2">
                <span className="uppercase text-slate-400">Last Updated:</span>
                <span className="text-slate-500">{dateString}</span>
              </div>
            </div>

            <div className="sound">
              {/* Assuming this is where your audio component goes */}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute flex items-center justify-end w-full h-full bg-gray-900 opacity-75"
          initial={{ clipPath: "inset(1.0rem 1.0rem 6.0rem round 0.5rem)" }}
          animate={{ clipPath: "inset( 1.5rem round 1rem )" }}
          exit={{ clipPath: "inset( 1.5rem 1.5rem 90vh 1.5rem round 1rem )" }}
          transition={{
            duration: 0.6,
            ease: [0.33, 1, 0.68, 1],
          }}
        />
      </div>

      {data.csblocksCollection.items && (
        <PostBody content={data.csblocksCollection} />
      )}

      <BlockFooter />
    </>
  );
};

export default LandingPageContent;
