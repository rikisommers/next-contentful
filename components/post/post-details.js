import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

export default function PostDetails({ post }) {
  // Destructure the properties from the post object
  const { description, intro, duration, client, role } = post || {};

  return (
    <div className="px-16 mb-36 xl:px-0">
      <div className="grid grid-cols-12 gap-3 py-10">
        <div className="flex flex-col self-start col-span-10 gap-3 rounded-lg md:col-span-7 lg:col-span-8">
          <div style={{ color: 'var(--text-color)' }}>
            <span
              className="inline mr-3 italic"
              style={{ color: 'var(--subtext-color)' }}
            >
              Overview
            </span>
            {description && <>{description}</>}
          </div>

          <div style={{ color: 'var(--text-color)' }}>
            {intro && (
              <>
                {documentToReactComponents(intro.json, RichTextOptions)}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col col-span-10 gap-8 text-sm md:col-span-4 lg:col-span-3">
          <div style={{ color: 'var(--text-color)' }}>
            <span
              className="mr-2 italic"
              style={{ color: 'var(--subtext-color)' }}
            >
              Duration
            </span>
            {duration && duration}
          </div>

          <div style={{ color: 'var(--text-color)' }}>
            <span
              className="mr-2 italic"
              style={{ color: 'var(--subtext-color)' }}
            >
              Client
            </span>
            {client && client}
          </div>

          <div style={{ color: 'var(--text-color)' }}>
            <span
              className="mr-2 italic"
              style={{ color: 'var(--subtext-color)' }}
            >
              Role
            </span>
            {role && role}
          </div>
        </div>
      </div>
    </div>
  );
}
