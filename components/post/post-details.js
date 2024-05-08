import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

export default function PostDetails({
  post
}) {
  return (
    <div className="mb-36 bg-slate-50">
      <div className="px-16 py-16 grid grid-cols-12 gap-3">
        <div className="col-span-10  md:col-span-4 lg:col-span-3 flex flex-col gap-8 text-sm">
          <div>
            <span className="text-slate-400 italic mr-2">Duration</span>
            {post?.duration && post?.duration}
          </div>

          <div>
            <span className="text-slate-400 italic mr-2">Client</span>
            {post?.client && post?.client}
          </div>

          <div>
            <span className="text-slate-400 italic mr-2">Role</span>
            {post?.role && post?.role}
          </div>

  
        </div>

        <div className="col-span-10 md:col-start-6 md:col-span-7 lg:col-start-5 lg:col-span-8 flex flex-col self-start gap-3 rounded-lg">
          <div>
            <span className="text-slate-400 italic mr-3 inline">Overview</span>
            <h2 className="text-2xl text-slate-800 mt-8 mb-2">{post?.  subtitle}</h2>
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
