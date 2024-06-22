import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

import { useTheme } from "next-themes";
import { themes } from "../../utils/theme";
import { getThemeByKey } from "../../utils/theme";

export default function PostDetails({ post }) {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  return (
    <div className="mb-36 ">
      <div className="grid grid-cols-12 gap-3 py-10"
      >
        {/* style={{ backgroundColor: currentTheme?.bodyBackgroundColor }} */}
        <div className="flex flex-col self-start col-span-10 gap-3 rounded-lg md:col-span-7 lg:col-span-8">
          <div style={{ color: currentTheme?.textColor }}>
            <span
              className="inline mr-3 italic"
              style={{ color: currentTheme?.accent }}
            >
              Overview
            </span>
            {post?.description && <>{post?.description}</>}
          </div>

          <div style={{ color: currentTheme?.textColor }}>
            {post?.intro && (
              <>
                {documentToReactComponents(post?.intro.json, RichTextOptions)}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col col-span-10 gap-8 text-sm md:col-span-4 lg:col-span-3">
          <div style={{ color: currentTheme?.textColor }}>
            <span
              className="mr-2 italic text-slate-400"
              style={{ color: currentTheme?.accent }}
            >
              Duration
            </span>

            {post?.duration && post?.duration}
          </div>

          <div style={{ color: currentTheme?.textColor }}>
            <span
              className="mr-2 italic text-slate-400"
              style={{ color: currentTheme?.accent }}
            >
              Client
            </span>
            {post?.client && post?.client}
          </div>

          <div style={{ color: currentTheme?.textColor }}>
            <span
              className="mr-2 italic text-slate-400"
              style={{ color: currentTheme?.accent }}
            >
              Role
            </span>
            {post?.role && post?.role}
          </div>
        </div>
      </div>
    </div>
  );
}
