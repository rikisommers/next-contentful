import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useThemeContext } from '../context/themeContext';
import AnimatedText, { AnimStyle, AnimTextOrder } from '../motion/animated-text';
import PostTileImg from '../tile/post-tile-img';
import Button from '../base/button/button';
import ButtonWipe from '../base/button/button-wipe';
import ButtonMonks from '../base/button/button-monks';
import { ButtonType, ButtonSound } from '../base/button/button.util';
import ButtonSwap from '../base/button/button-swap';
import { motion, useTransform, useScroll } from '../../utils/motion';
import Ticker from '../base/ticker';

/**
 * Formatted footer layout with title, content, page navigation links,
 * social links, CTA button, and legal policy links.
 * @component
 * @category footer
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data for the footer
 * @param {string} [props.data.title] - Footer heading text
 * @param {string} [props.data.content] - Footer subheading or description text
 * @param {string} [props.data.cta] - Call-to-action button label
 * @param {string} [props.data.ctalink] - Call-to-action button URL
 * @param {string} [props.data.privacypolicy] - Privacy policy page URL
 * @param {string} [props.data.cookiespolicy] - Cookies policy page URL
 * @param {Object} [props.data.socialCollection] - Collection of social link entries
 * @param {Object[]} [props.data.socialCollection.items] - Array of social link items
 * @param {string} [props.data.socialCollection.items[].title] - Social link display name
 * @param {string} [props.data.socialCollection.items[].url] - Social link URL
 * @param {Object} [props.data.socialCollection.items[].icon] - Social link icon asset
 * @param {string} [props.data.socialCollection.items[].icon.url] - Social link icon image URL
 * @param {Object[]} props.pages - Array of page navigation entries
 * @param {string} props.pages[].id - Unique page identifier
 * @param {string} props.pages[].title - Page display name
 * @param {string} props.pages[].url - Page URL path
 * @example
 * // Footer with CTA and social links
 * <FooterFormat
 *   data={{
 *     title: "Get in Touch",
 *     content: "Let's build something together",
 *     cta: "Contact Us",
 *     ctalink: "/contact",
 *     privacypolicy: "/privacy",
 *     socialCollection: {
 *       items: [
 *         { title: "Twitter", url: "https://twitter.com", icon: { url: "/icons/twitter.svg" } }
 *       ]
 *     }
 *   }}
 *   pages={[
 *     { id: "1", title: "Home", url: "/" },
 *     { id: "2", title: "About", url: "/about" }
 *   ]}
 * />
 * @example
 * // Minimal footer with just pages
 * <FooterFormat
 *   data={{ title: "My Site" }}
 *   pages={[
 *     { id: "1", title: "Home", url: "/" }
 *   ]}
 * />
 */
export default function FooterFormat({ data, pages }) {
  const { currentTheme } = useThemeContext();
  return (
    <div className="flex z-10 flex-col justify-between w-full overflow-clip">
      <div className="grid grid-cols-12 gap-24 px-6 pt-16 pb-8">
        <div className="flex flex-col col-span-12 gap-6 items-start">
          {data?.title && (
            <h1 className="text-md uppercase font-normal text-[var(--heading-color)]">
              {data?.title}
            </h1>
          )}

          {data?.content && (
            <div>
              <h2 className="text-4xl font-normal text-[var(--heading-color)]">{data.content}</h2>
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-12 gap-8">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex gap-24 columns-2">
              <div className="flex flex-col">
                <h3 className="mb-4 text-sm font-normal" style={{ color: 'var(--subtext-color)' }}>
                  Pages
                </h3>
                <div className="flex flex-col col-span-1 gap-2">
                  {pages.map((page) => (
                    <Link
                      className="text-sm no-underline text-[var(--text-color)]"
                      key={page.id}
                      href={page.url}
                      scroll={false}
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="mb-4 text-sm font-normal" style={{ color: 'var(--subtext-color)' }}>
                  Links
                </h3>

                <div className="flex flex-col col-span-1 gap-2">
                  {data.socialCollection &&
                    data.socialCollection.items?.length &&
                    data.socialCollection.items.map((item, i) => (
                      <Link
                        href={item.url}
                        key={i}
                        className="text-sm no-underline text-[var(--text-color)]"
                      >
                        {item.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex justify-start items-end md:justify-end grow">
              {data?.ctalink && data?.cta && (
                <Link href={data.ctalink} className="no-underline">
                  <ButtonWipe label={data.cta} type={ButtonType.PRIMARY} />
                </Link>
              )}
            </div>
          </div>
        </div>



        <Ticker
          text="Lets make something great"
          className="w-[110vw] ml-[-5vw] rotate-[-3deg] bg-[var(--background-color)] font-medium uppercase leading-none text-8xl p-4 mt-16"
          speed={20}
          repetitions={4}
        />      
        <div className="flex flex-col col-span-12 gap-16 p-8 w-full justify-between rounded-lg bg-[var(--background-color)]">
          {data.socialCollection && data.socialCollection.items?.length && (
            <div className="flex col-span-12 gap-2 justify-end">
              {data.socialCollection.items.map((item, i) => (
                <Link
                  href={item.url}
                  key={i}
                  className={`text-xs no-underline text-[var(--text-color)]`}
                >
                  {item.title}
                  {/* <img
                    alt={item.title}
                    src={item.icon.url}
                    viewBox="0 0 24 24"
                  ></img> */}
                </Link>
              ))}
            </div>
          )}

          <div className="flex col-span-12 gap-2 items-end">
            <div className="flex">Logo</div>

            <div
              className="flex gap-4 items-center px-5 rounded-lg grow"
              style={{ color: 'var(--text-color)' }}
            >
              {data.privacypolicy && (
                <Link className="text-xs no-underline" href={data.privacypolicy}>
                  Privacy Policy
                </Link>
              )}
              {data.cookiespolicy && (
                <Link className="text-xs no-underline" href={data.cookiespolicy}>
                  Cookies Policy
                </Link>
              )}

              <span className="text-xs">Copywrite 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

FooterFormat.propTypes = {
  /** Contentful entry data for the footer */
  data: PropTypes.shape({
    /** Footer heading text */
    title: PropTypes.string,
    /** Footer subheading or description text */
    content: PropTypes.string,
    /** Call-to-action button label */
    cta: PropTypes.string,
    /** Call-to-action button URL */
    ctalink: PropTypes.string,
    /** Privacy policy page URL */
    privacypolicy: PropTypes.string,
    /** Cookies policy page URL */
    cookiespolicy: PropTypes.string,
    /** Collection of social link entries */
    socialCollection: PropTypes.shape({
      /** Array of social link items */
      items: PropTypes.arrayOf(
        PropTypes.shape({
          /** Social link display name */
          title: PropTypes.string,
          /** Social link URL */
          url: PropTypes.string,
          /** Social link icon asset */
          icon: PropTypes.shape({
            /** Social link icon image URL */
            url: PropTypes.string,
          }),
        })
      ),
    }),
  }),
  /** Array of page navigation entries */
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique page identifier */
      id: PropTypes.string,
      /** Page display name */
      title: PropTypes.string,
      /** Page URL path */
      url: PropTypes.string,
    })
  ),
};
