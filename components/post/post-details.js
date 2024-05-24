import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

export default function PostDetails({
  post
}) {
  return (
    <div className="mb-36 bg-slate-50">
      <div className="grid grid-cols-12 gap-3 px-16 py-16">
        <div className="flex flex-col col-span-10 gap-8 text-sm md:col-span-4 lg:col-span-3">
          <div>
            <span className="mr-2 italic text-slate-400">Duration</span>
            {post?.duration && post?.duration}
          </div>

          <div>
            <span className="mr-2 italic text-slate-400">Client</span>
            {post?.client && post?.client}
          </div>

          <div>
            <span className="mr-2 italic text-slate-400">Role</span>
            {post?.role && post?.role}
          </div>

  
        </div>

        <div className="flex flex-col self-start col-span-10 gap-3 rounded-lg md:col-start-6 md:col-span-7 lg:col-start-5 lg:col-span-8">
          <div>
            <span className="inline mr-3 italic text-slate-400">Overview</span>
            <h2 className="mt-8 mb-2 text-2xl text-slate-800">{post?.  subtitle}</h2>
            {post?.description && <>{post?.description}</>}
          </div>

          <div>
            {post?.intro && (
              <>{documentToReactComponents(post?.intro.json, RichTextOptions)}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
