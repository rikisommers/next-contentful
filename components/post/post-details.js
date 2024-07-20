import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

export default function PostDetails({ post }) {


  return (
    <div className="mb-36 ">
      <div className="grid grid-cols-12 gap-3 py-10"
      >
        {/* style={{ backgroundColor: currentTheme?.bodyBackgroundColor }} */}
        <div className="flex flex-col self-start col-span-10 gap-3 rounded-lg md:col-span-7 lg:col-span-8">
          <div style={{ color: 'var(--text-color)' }}>
            <span
              className="inline mr-3 italic"
              style={{ color: 'var(--accent)' }}
            >
              Overview
            </span>
            {post?.description && <>{post?.description}</>}
          </div>

          <div style={{ color: 'var(--text-color)' }}>
            {post?.intro && (
              <>
                {documentToReactComponents(post?.intro.json, RichTextOptions)}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col col-span-10 gap-8 text-sm md:col-span-4 lg:col-span-3">
          <div style={{ color:'var(--text-color)'}}>
            <span
              className="mr-2 italic"
              style={{ color:  'var(--accent)' }}
            >
              Duration
            </span>

            {post?.duration && post?.duration}
          </div>

          <div style={{ color: 'var(--text-color)' }}>
            <span
              className="mr-2 italic"
              style={{ color: 'var(--accent)' }}
            >
              Client
            </span>
            {post?.client && post?.client}
          </div>

          <div style={{ color:  'var(--text-color)' }}>
            <span
              className="mr-2 italic"
              style={{ color:  'var(--accent)' }}
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
