import { processItalicText } from "../utils/textFormatting";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimNone = ({ 
  content, 
  className,
  highlight,
  type = 'text'
}) => {

  const renderLine = (line, lineIndex) => {
    const segments = line.split('__');
    
    return (
      <span
        key={lineIndex}
        style={{ 
          overflow: 'hidden',
          position: 'relative',
          display: 'block'
        }}
        className="leading-snug"
      >
        <span
          style={{ 
            position: 'relative',
            display: 'inline'
          }}
        >
          {segments.map((segment, segmentIndex) => {
                // Handle image markdown
                const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
                if (imageMatch) {
                  const altText = imageMatch[1];
                  const imageUrl = imageMatch[2].startsWith('//') ? `https:${imageMatch[2]}` : imageMatch[2];
                  return (
                    <img
                      key={segmentIndex}
                      src={imageUrl}
                      alt={altText}
                      style={{ maxWidth: "40px", height: "auto", display: "inline-block", verticalAlign: 'middle' }}
                      className="inline-block align-middle"
                    />
                  );
                }

                // Handle regular text vs highlighted text
                if (segmentIndex % 2 === 0) {
                  const { processed: processedSegment, hasItalic } = processItalicText(segment);
                  if (hasItalic) {
                    return (
                      <span 
                        key={segmentIndex}
                        dangerouslySetInnerHTML={{ __html: processedSegment }}
                      />
                    );
                  } else {
                    return <span key={segmentIndex}>{segment}</span>;
                  }
                } else {
                  return (
                    <HighlightedSegment
                      key={segmentIndex}
                      segment={segment}
                      highlight={highlight}
                    />
                  );
                }
          })}
        </span>
      </span>
    );
  };

  const renderContent = (content) => {
    if (content) {
      const lines = content.split('\n');  
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
  };

  return (
    <span className={className}>
      {renderContent(content)}
    </span>
  );
};