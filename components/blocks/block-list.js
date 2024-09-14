import React from "react";

export default function BlockList({ data }) {
  console.log(data);

  const renderBlock = () => {
    switch (data.type[0].trim()) {
      case "content":
        return (
          <article className="grid grid-cols-12 gap-3 article-content">
            <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
              <div
                className="flex flex-col w-full gap-3 p-4 rounded"
                style={{ backgroundColor: "var(--surface1)" }}
              >
                {data.title && (
                  <h2
                    className="mb-4"
                    style={{ color: "var(--heading-color)" }}
                  >
                    {data.title}
                  </h2>
                )}
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div key={index} className="mb-3">
                      {item.title && (
                        <h3
                          className="mb-2 text-h4"
                          style={{ color: "var(--text-color)" }}
                        >
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <p style={{ color: "var(--subtext-color)" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </article>
        );

      case "feature":
      // ... (feature block code)

      case "timeline":
        return (
          <article className="flex flex-col gap-3 article-content">
            <div className="flex flex-col gap-3 p-8 justfy-between">
              <div className="flex flex-col w-full gap-3 p-4 rounded">
                {data.title && (
                  <h2
                    className="mb-4"
                    style={{ color: "var(--heading-color)" }}
                  >
                    {data.title}
                  </h2>
                )}
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex justify-between gap-3 pl-8"
                      style={{ backgroundColor: "var(--surface1)" }}
                    >
                      <span className="absolute bg-white w-[1px] h-full left-0"></span>

                      <div className="gap-2">
                        {item.title && (
                          <h3
                            className="col-span-4 mb-2 text-h2"
                            style={{ color: "var(--text-color)" }}
                          >
                            {item.title}
                          </h3>
                        )}
                        {item.content && (
                          <p style={{ color: "var(--subtext-color)" }}>
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
          <article className="grid grid-cols-12 gap-3 article-content">
            <h1>{data.type}</h1>
            <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
              <div
                className="flex flex-col w-full gap-3 p-4 rounded"
                style={{ backgroundColor: "var(--surface1)" }}
              >
                {data.title && (
                  <h2
                    className="mb-4"
                    style={{ color: "var(--heading-color)" }}
                  >
                    {data.title}
                  </h2>
                )}
                {data.itemsCollection &&
                  data.itemsCollection.items.map((item, index) => (
                    <div key={index}>
                      {item.title && (
                        <h3
                          className="mb-2 text-h4"
                          style={{ color: "var(--text-color)" }}
                        >
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <p style={{ color: "var(--subtext-color)" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
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
                      <span className="text-6xl font-semibold ">
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

  return renderBlock();
}
