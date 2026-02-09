import React from "react";
import PropTypes from "prop-types";
import CoverImage from "../image/cover-image";
import BlendImage from "../image/blend-image";
import GridLayout from "../grid/basic";
/**
 * Image gallery block that renders a collection of images in a grid layout
 * with blend effects and overlay captions.
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data for the images block
 * @param {Object} [props.data.imagesCollection] - Collection of image assets from Contentful
 * @param {Object[]} [props.data.imagesCollection.items] - Array of image entries
 * @param {string} [props.data.imagesCollection.items[].title] - Image title used for alt text and caption
 * @param {string} [props.data.imagesCollection.items[].url] - Image source URL
 * @example
 * // Image gallery with multiple images
 * <BlockImages
 *   data={{
 *     imagesCollection: {
 *       items: [
 *         { title: "Mountain view", url: "https://images.example.com/mountain.jpg" },
 *         { title: "Ocean sunset", url: "https://images.example.com/ocean.jpg" }
 *       ]
 *     }
 *   }}
 * />
 * @example
 * // Single image gallery
 * <BlockImages
 *   data={{
 *     imagesCollection: {
 *       items: [
 *         { title: "Hero image", url: "https://images.example.com/hero.jpg" }
 *       ]
 *     }
 *   }}
 * />
 */
export const BlockImages = ({ data }) => {
  return (
    <figure>

      <GridLayout>
        {data.imagesCollection &&
          data.imagesCollection.items.map((image) => {
            return (
              <figure className="overflow-hidden relative w-full h-full rounded-lg" key={image.url}>
                <BlendImage title={image.title} src ={image.url} />
       
                <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
                <p className="text-[var(--text-color)] text-xs">{image.title}</p>
                </figcaption>
              </figure>
            );
          })}
      </GridLayout>
    </figure>
  );
};

BlockImages.propTypes = {
  /** Contentful entry data for the images block */
  data: PropTypes.shape({
    /** Collection of image assets from Contentful */
    imagesCollection: PropTypes.shape({
      /** Array of image entries */
      items: PropTypes.arrayOf(
        PropTypes.shape({
          /** Image title used for alt text and caption */
          title: PropTypes.string,
          /** Image source URL */
          url: PropTypes.string,
        })
      ),
    }),
  }),
};

export default BlockImages;
