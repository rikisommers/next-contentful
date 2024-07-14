import React from "react";
import { useTheme } from "next-themes";
import { getThemeByKey } from "../../utils/theme";

import PostTile from "../post/post-tile";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";

export const BlockArticles = ({ data }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  return (
    <section className="p-8">
      {data.title && (
        <h1 style={{ color: currentTheme?.headingColor }}>
          {data.title}
          {data.type}
        </h1>
      )}

      <div className="grid grid-cols-12 gap-4">
        {data.articlesCollection?.items &&
          (() => {
            switch (data.type[0]) {
              case 'titledCardGrid':
                return data.articlesCollection.items.map((item, i) => (
                  <div key={i} className="col-span-12 md:col-span-6">
                    <PostTileCs post={item} />
                  </div>
                ));
              case 'tileGrid':
                return data.articlesCollection.items.map((item, i) => {
                  const isFullWidth = i > 0 && i % 2 === 0 ? 'col-span-12' : 'col-span-12 md:col-span-6';
                  return (
                    <div key={i} className={isFullWidth}>
                      <PostTileLg post={item} size={isFullWidth === 'col-span-12' ? 'rect' : 'sq'} />
                    </div>
                  );
                });
              case 'list':
                return data.articlesCollection.items.map((item, i) => (
                  <div key={i} className="col-span-12 md:col-span-6">
                    <PostTile post={item} />
                  </div>
                ));
              default:
                // Add a default case to handle unexpected data.type values
                return data.articlesCollection.items.map((item, i) => (
                  <div key={i} className="col-span-12 md:col-span-6">
                    <PostTileCs post={item} />
                  </div>
                ));
            }
          })()}
      </div>
    </section>
  );
};

export default BlockArticles;
