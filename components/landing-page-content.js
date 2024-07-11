import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../utils/theme';
import { TextTitle } from "../components/rich-text/text-title";
import { TextSubtitle } from "../components/rich-text/text-subtitle";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
import BlockHeader from "./blocks/block-header";

const LandingPageContent = ({ data }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
 
  return (
    <>
   

      {data.csblocksCollection && data.csblocksCollection.items && (
        <PostBody content={data.csblocksCollection} />
      )}
      
    </>
  );
};

export default LandingPageContent;
