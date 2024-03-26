import Image from "next/image";
import { useArticle } from "@pantheon-systems/pcc-react-sdk";
import { ArticleRenderer } from "@pantheon-systems/pcc-react-sdk/components";
import { clientSmartComponentMap } from "./smart-components";
import { Tags } from "./tags";
import {
  Container,
  SidebarLayout,
  TableOfContents,
} from "@pantheon-systems/pds-toolkit-react";
import { pdsConfig } from "../pds.config";

export default function ArticleView({ article }) {
  const { data } = useArticle(
    article.id,
    {
      publishingLevel: article.publishingLevel,
      contentType: "TREE_PANTHEON_V2",
    },
    {
      skip: article.publishingLevel !== "REALTIME",
    },
  );

  const hydratedArticle = data?.article ?? article;

  // Prepare the article metadata.
  const mainImage = hydratedArticle.metadata.mainImage;
  const authorName = hydratedArticle.metadata.author;

  let displayDate = null;
  if (typeof article.metadata.publicationDisplayDate !== "undefined") {
    displayDate = article.metadata.publicationDisplayDate.msSinceEpoch;
  }

  // Main image styles.
  const imageStyle = {
    height: "auto",
    marginInline: "auto",
  };

  // Find how many times an h2 tag appears in the article.
  const articleJson = hydratedArticle.content;
  const h2TagCount = articleJson.split('"tag":"h2"').length;

  // If there are more than a certain number of h2 tags, show the table of contents.
  // This value is set in pds.config.js.
  const showTOC = h2TagCount > pdsConfig.tableOfContentsHeadingCount;

  return (
    <Container width="standard">
      <div className="pds-spacing-pad-block-start-4xl max-w-screen-lg">
        {/* Render the header only. */}
        <ArticleRenderer
          article={hydratedArticle}
          __experimentalFlags={{ disableAllStyles: true }}
          headerClassName="pds-ts-5xl pds-spacing-mar-block-end-m font-bold"
          renderBody={() => null}
        />
        {/* Byline and date. */}
        <p className="pds-spacing-mar-block-end-2xl">
          {authorName && `By ${authorName}`}
          {authorName && displayDate && (
            <span
              className="pds-spacing-mar-inline-xs"
              style={{
                color: "var(--pds-color-text-default-secondary)",
                fontWeight: "400",
              }}
            >
              |
            </span>
          )}
          {displayDate &&
            new Date(displayDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
        {/* Main image. */}
        {mainImage && (
          <div className="pds-spacing-mar-block-end-m">
            <Image
              src={mainImage}
              alt={""}
              style={imageStyle}
              width={600}
              height={450}
            />
          </div>
        )}

        {/* Now render the body. */}
        {showTOC ? (
          <SidebarLayout sidebarMobileLocation="before">
            <article
              slot="content"
              id="pds-toc-source"
              class="max-w-screen-lg prose"
            >
              <ArticleRenderer
                __experimentalFlags={{ disableAllStyles: true }}
                article={hydratedArticle}
                bodyClassName="article-body"
                renderTitle={() => null}
                smartComponentMap={clientSmartComponentMap}
              />
            </article>
            <TableOfContents slot="sidebar" />
          </SidebarLayout>
        ) : (
          <article class="max-w-screen-lg prose">
            <ArticleRenderer
              __experimentalFlags={{ disableAllStyles: true }}
              article={hydratedArticle}
              bodyClassName="article-body"
              renderTitle={() => null}
              smartComponentMap={clientSmartComponentMap}
            />
          </article>
        )}
        {/* Article footer info. */}
        <hr className="pds-spacing-mar-block-m" />
        <div className="article-footer flex gap-x-1.5 justify-between">
          <Tags displayType="article" tags={hydratedArticle?.tags} />
          <div className="article-updated inline-flex gap-x-1.5 text-sm">
            <div className="font-bold">Updated: </div>
            {new Date(article.publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
