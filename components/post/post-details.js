import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

export default function PostDetails({
  intro,
  tags,
  role,
  client,
  subtitle,
  duration,
}) {
  return (
    <div className="mb-36">
      <div className="grid grid-cols-12 gap-3 pt-32 pb-16">
        <div className="col-span-10  md:col-span-4 lg:col-span-3 flex flex-col gap-8 text-sm">

          <div>
            <span className="text-slate-400 italic mr-2">Duration</span>
            {duration}
          </div>

          <div>
            <span className="text-slate-400 italic mr-2">Client</span>
            {client}
          </div>

          <div>
          <span className="text-slate-400 italic mr-2">Role</span>
          {role}
          </div>

          <div>
            <span className="text-slate-400 italic mr-2">Tags</span>
            {tags}
          </div>
      </div>

      <div className="col-span-10 md:col-start-6 md:col-span-7 lg:col-start-5 lg:col-span-5 flex flex-col gap-3 text-sm">
          <h2 className="text-2xl">{subtitle}</h2>
          <div>
          <span className="text-slate-400 italic mr-3 inline">Info</span>
          {intro && (
            <>{documentToReactComponents(intro.json, RichTextOptions)}</>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
