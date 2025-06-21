import React, { useState, useRef } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "../../utils/motion";
import FadeInWhenVisible from "../utils/fade-in-visible";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

/**
 * @component
 * @description A post tile with Monks-specific styling and layout.
 * @category tiles
 * @param {object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.subtitle - The subtitle of the post.
 * @param {string} post.slug - The slug for the post URL.
 * @param {string} post.client - The client name for the project.
 * @param {string} post.date - The date of the project.
 * @param {array} post.tags - An array of tags for the post.
 * @param {object} post.img - The image object for the post.
 * @param {string} [aspect] - The aspect ratio of the tile (e.g., 'square', '16/9').
 * @param {string} [layout] - The layout style of the tile.
 * @example
 * // Monks Post Tile
 * <PostTileMonks 
 *   post={{
 *     title: "Project Title",
 *     subtitle: "A brief description of the project",
 *     slug: "project-slug",
 *     client: "Client Name",
 *     date: "January 2023",
 *     tags: ["Web Design", "Development"],
 *     img: {
 *       url: "https://example.com/image.jpg",
 *       width: 800,
 *       height: 600,
 *       description: "Project cover image"
 *     }
 *   }}
 *   aspect="16:9"
 *   layout="col"
 * />
 * @exports PostTileMonks
 */
export default function PostTileMonks({ post, aspect, layout }) {
  //   const [isHovered, setIsHovered] = useState(false); // State to track hover

  const ref = useRef(null); // Unique ref for each instance
  const inView = useInView(ref, { once: true, threshold: 0.5 }); // Trigger when 50% of the element is visible
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const controls = useAnimation();

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({
      x: [0, 30, 0], // Sequence of positions
      transition: {
        duration: 1, // Total duration of animation
        ease: "easeInOut",
      },
    });
  };

  // From https://easings.net/#easeOutBounce
  function bounceEase(x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }

  const bounce = {
    duration: 1.2,
    ease: bounceEase,
  };

  const ease = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <Link
      ref={ref}
      href={`/articles/${post.slug}`}
      style={{
        backgroundColor: "var(--surface1)",
      }}
      className={`relative flex flex-col w-full h-full overflow-hidden no-underline rounded-2xl group flex-${layout} ${aspect ? `aspect-${aspect}` : ""}`}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      {post.img && (
        <motion.div className={`overflow-hidden flex-grow w-full`}>
          <motion.div
            className="w-full h-full"
            animate={{
              scale: inView ? 1 : 1.3,
            }}
            transition={{
              duration: 4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <FadeInWhenVisible color={'var(--accent)'}>
              <BlendImage
                alt={`Cover Image for ${post?.title}`}
                src={post.img.url}
              />
            </FadeInWhenVisible>
          </motion.div>
        </motion.div>
      )}
      <div className={`flex flex-col gap-4 justify-start w-full row-span-1 p-4 ${layout == "col" ? "!h-1/2" : "h-full"}`}>
        <div
          className="flex flex-col gap-4 items-start w-full"
          style={{
            color: "var(--text-color-inv)",
          }}
        >
          <span
            className="text-xs"
            style={{
              color: "var(--subtext-color)",
            }}
          >
            {post?.title}
          </span>
          <AnimatedElement type={AnimStyleEl.FADEINLEFT}>
            <h2
              className="inline-flex flow-root items-center text-xl leading-normal"
              style={{
                color: "var(--text-color)",
              }}
            >
              <span className="font-light">{post?.subtitle}</span> •
              <span className="font-light">{post?.client}</span>
              <div className="inline-block">
                <motion.div
                  className={`flex overflow-hidden relative justify-center items-center ml-2 w-6 h-6 rounded-full opacity-50`}
                  style={{
                    backgroundColor: "var(--surface2)",
                    transform: "translateY(8px)",
                  }}
                  animate={{
                    x: isHovered ? [0, 30, 0] : 0, // Move to 300px and back to 0
                  }}
                  transition={{
                    duration: 1,
                    //ease: bounceEase
                    ease: ["easeOut", bounceEase], // Different easings for each segment
                    times: [0, 0.33, 1], // Control when each keyframe is reached
                  }}
                >
                  <motion.img
                    animate={{
                      x: isHovered ? [0, 40, -40, 0] : 0,
                      opacity: isHovered ? [1, 0, 0, 1] : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.33, 0.65, 1],
                      ease: "easeOut",
                      // repeat: 1,
                      // repeatType: "loop",
                    }}
                    src="arrow_forward.svg"
                    viewBox="0 0 20 20"
                    className="z-10 w-6 h-6"
                    style={{
                      color: "var(--accent-pri)",
                    }}
                  ></motion.img>
                </motion.div>
              </div>
            </h2>
          </AnimatedElement>

          {/* <h3
            className="text-sm"
            style={{
              color: "var(--subtext-color)",
            }}
          >
            {post?.subtitle}
          </h3> */}
        </div>

        <div
          className="flex justify-between mt-2 w-full"
          style={{
            color: "var(--subtext-color)",
          }}
        >
          {post.tags && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: "var(--body-background-color)",
                    }}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          )}

          <span className="text-xs">DATE</span>
        </div>
      </div>
    </Link>
  );
}
