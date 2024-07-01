import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { themes } from "../../utils/theme";
import { getThemeByKey } from '../../utils/theme';

export default function FadeInWhenVisible({ color,children, enabled = true }) {

    
  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);
 // console.log(currentTheme)

    return (
      <motion.div
        className="w-full h-full"
        initial={ enabled ? "hidden": "visible"}
        whileInView="visible"
        viewport={{ once: true, threshold:0.2}}
        transition={{ duration: 0.3, delay:0.2 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 1 }
        }}
        style={{backgroundColor:currentTheme?.accent}}

      >
        {children}
      </motion.div>
    );
  }