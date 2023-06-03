import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";

export default function CaseStudyHeader({ title, img, subtitle}) {
  return (
    
    <div className="mb-36">
      <div className="o-content-grid pt-32 pb-16">
        <div className="title">
          <PostTitle>{title}</PostTitle>
          <h3 className="u-c--light">sssss</h3>
        </div>
        {subtitle && <h2 className="content p-">{subtitle}</h2>}
      </div>

      {img && (
        <div className="h-vhh rounded-xl overflow-hidden">
          <CoverImage title={img.title} url={img.url} layout="landscape" />
        </div>
      )}
    </div>
  );
}
