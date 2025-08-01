import React from "react";
import { useThemeContext } from "../context/themeContext";


const getContentClass = (height) => {
  switch (height) {
    case "center":
      return "mx-auto max-w-prose";
    case "left":
      return "max-w-prose";
      case "split":
        return "w-full grid grid-cols-2";
    default:
      return "mx-auto max-w-prose";
  }
};

export default function BlockList({ data }) {
  
  const { currentTheme } = useThemeContext();

  const renderBlock = () => {
    if (!data || !data.type || !data.type?.length) {
      return <div>No data available</div>; // Handle the case when data is not available
    }

    switch (data.type[0].trim()) {
      case "content":
        return (
          <article className="flex flex-col gap-4" id={data.title}>
              <div
                className="flex flex-col gap-2 p-4 w-full rounded"
              
              >
                {data.title && (
                  <h2
                    className="mb-4 text-sm"
                    style={{ color: "var(--subtext-color)" }}
                  >
                    {data.title}
                  </h2>
                )}
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div key={index} className="p-4 mb-3 rounded-b-lg"
                    style={{ backgroundColor: "var(--surface2)" }}
                    >
                      {item.title && (
                        <h3
                          className="mb-2 text-h4"
                          style={{ color: "var(--heading-color)" }}
                        >
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <p className="text-sm" style={{ color: "var(--text-color)" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
          </article>
        );

      case "feature":
        return (
          <article className="flex flex-col" id={data.title}>
            {data.title && (
              <h2 className="mb-4 text-sm font-normal" style={{color: 'var(--subtext-color)'}}>{data.title}</h2>
            )}

              <div
                className="grid grid-cols-12 gap-3 @container"
              >
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div key={index} className="col-span-1 @lg:col-span-4 px-6 py-4 rounded-md"
                    style={{ backgroundColor: "var(--surface1)" }}

                    >
                      {item.title && (
                        <>
                         {/* <h2
                         className="text-lg font-light text-balance"
                         style={{
                           color: "var(--text-color)",
                         }}
                       >
                         {item.title}
                       </h2> */}

                        <h3
                          className="mb-2 text-base font-medium"
                          style={{ color: "var(--text-color)" }}
                        >
                          {item.title}
                        </h3>
                        </>
                      )}
                      {item.content && (
                        <p className="text-sm leading-normal"
                        style={{ color: "var(--subtext-color)" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
          </article>
        );


      case "timeline":
        return (
          <article className="flex flex-col gap-3" id={data.title}>
            <div className="flex flex-col gap-3 justfy-between">
              <div className="flex flex-col gap-2 w-full rounded">
                {data.title && (
                  <h2 className="mb-4 text-sm font-normal" style={{color: 'var(--subtext-color)'}}>{data.title}</h2>
                )}
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div key={index} className="flex relative pl-16">
                      <div className="flex absolute left-0 flex-col flex-1 h-full">
                        {item.number && (
                          <span
                            className="pb-2"
                            style={{ color: "var(--text-accent)" }}
                          >
                            {item.number}
                          </span>
                        )}
                        {index !== data.itemsCollection.items?.length - 1 && (
                          <span
                            className="h-full ml-3 w-[1px]"
                            style={{ backgroundColor: "var(--subtext-color)" }}
                          ></span>
                        )}
                      </div>

                      <div className="flex flex-col mb-6">
                        {item.title && (
                          <h3
        className="mb-2 text-base font-medium"
                            style={{ color: "var(--text-color)" }}
                          >
                            {item.title}
                          </h3>
                        )}
                        {item.content && (
                          <p
                          className="text-sm leading-normal" 
                            style={{ color: "var(--text-color)" }}
                          >
                            {item.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </article>
        );

      case "results":
        return (
          <article className="flex flex-col gap-3" id={data.title}>
              <div
                className="flex flex-col gap-3 p-6 pb-8 w-full rounded"
                style={{ backgroundColor: "var(--surface1)" }}
              >
                {data.title && (
                  <h2
                    className="mb-4 text-sm"
                    style={{ color: "var(--heading-color)" }}
                  >
                    {data.title}
                  </h2>
                )}
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div key={index} className="mb-4">
                      {item.title && (
                        <h3
                        className="mb-2 text-base font-medium"
                        style={{ color: "var(--text-color)" }}
                        >
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <p className="text-sm leading-normal" 
                           style={{ color: "var(--subtext-color)" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  ))}
              </div>  
          </article>
        );

      default:
        return (
          <article className="flex flex-col gap-8 px-8">
            <h1>{data.type}</h1>

            {data.title && (
              <h2
                className="text-3xl"
                style={{ color: "var(--heading-color)" }}
              >
                {data.title}
              </h2>
            )}

            <div className="grid grid-cols-12 gap-6">
              {data.itemsCollection &&
                data.itemsCollection.items.map((item, index) => (
                  <div key={index} className="flex flex-col col-span-3 gap-2">
                    {item.title && (
                      <h3
                        className="text-h4"
                        style={{ color: "var(--text-color)" }}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.number && (
                      <span className="text-6xl font-semibold">
                        {item.number}
                      </span>
                    )}
                    {item.content && (
                      <p
                        className="text-sm"
                        style={{ color: "var(--subtext-color)" }}
                      >
                        {item.content}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </article>
        );
    }
  };

  return( 
  <div className={getContentClass(currentTheme.data.bodyTextAlign)}>
    { 
    renderBlock()
    }
  </div>
 
  )
}
