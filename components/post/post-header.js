import CoverImage from "../image/cover-image";
import FadeInWhenVisible from "../utils/fade-in-visible";

export default function PostHeader({
  title,
  img,
  subtitle,
  tags,
  client,
  role,
  duration,
}) {
  return (
      <FadeInWhenVisible>
      <div className="grid grid-cols-12 gap-3 pt-32 pb-16">
        <div className="col-span-6">
          <p className="text-xs text-slate-400">{duration && duration}</p>
          <h1 className="text-7xl">{title && title}</h1>
          {/* <TextAnimation title={title}/> */}
        </div>
      </div>

      {img && (
        <div className="h-vhh rounded-xl overflow-hidden">
          <CoverImage title={img && img.title} url={img && img.url} layout="landscape" />
        </div>
      )}
      </FadeInWhenVisible>
  );
}
