import { useTheme } from 'next-themes';
import { getThemeByKey } from '../utils/theme';
import PostBody from "../components/post/post-body";

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
