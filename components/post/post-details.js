import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";

export default function PostDetails({ intro, tags, role, client, subtitle }) {
  return (
    <div className="mb-36">
      <div className="grid grid-cols-12 gap-3 pt-32 pb-16">

        <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8">
        <h2 className="mb-10"> {subtitle}</h2>

        <div className="flex flex-col gap-8 text-sm">


          <div>
            <span className="text-slate-400 italic mr-3 inline">Info</span>
            {intro && (
              <>{documentToReactComponents(intro.json, RichTextOptions)}</>
            )}
          </div>

            <div>
              <div className="text-slate-400 italic mr-2">Role</div>
              {role}
            </div>

            <div>
              <span className="text-slate-400 italic mr-2">Client</span>
              {client}
            </div>

            <div>
              <span className="text-slate-400 italic mr-2">Tags</span>
              {tags}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
