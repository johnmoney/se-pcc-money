import Image from "next/image";
import { PantheonProvider } from "@pantheon-systems/pcc-react-sdk";
import { NextSeo } from "next-seo";
import queryString from "query-string";
import ArticleView from "../../components/article-view";
import Layout from "../../components/layout";
import { Tags } from "../../components/tags";
import { getArticleBySlugOrId } from "../../lib/Articles";
import { buildPantheonClientWithGrant } from "../../lib/PantheonClient";
import { pantheonAPIOptions } from "../api/pantheoncloud/[...command]";
import {
  Container,
  SidebarLayout,
  TableOfContents,
} from "@pantheon-systems/pds-toolkit-react";
import { pdsConfig } from "../../pds.config";

export default function ArticlePage({ article, grant }) {
  const seoMetadata = getSeoMetadata(article);

  // Find how many times an h2 tag appears in the article.
  const articleJson = article.content;
  const h2TagCount = articleJson.split('"tag":"h2"').length;

  // If there are more than a certain number of h2 tags, show the table of contents.
  // This value is set in pds.config.js.
  const showTOC = h2TagCount > pdsConfig.tableOfContentsHeadingCount;

  // Main image styles
  const imageStyle = {
    height: "auto",
    marginInline: "auto",
  };

  // Preprocess metadata for display.
  const mainImage = article.metadata.image;
  const authorName = article.metadata.author;
  const publicationDate = article.metadata.publicationDate.msSinceEpoch;

  console.log(publicationDate);

  return (
    <PantheonProvider client={buildPantheonClientWithGrant(grant)}>
      <Layout>
        <NextSeo
          title={seoMetadata.title}
          description={seoMetadata.description}
          openGraph={{
            type: "website",
            title: seoMetadata.title,
            description: seoMetadata.description,
            article: {
              authors: seoMetadata.authors,
              tags: seoMetadata.tags,
              ...(seoMetadata.publishedTime && {
                publishedTime: seoMetadata.publishedTime,
              }),
            },
          }}
        />
        <Container width="standard">
          <div className="pds-spacing-pad-block-start-4xl max-w-screen-lg prose">
            <h1 className="pds-ts-5xl pds-spacing-mar-block-end-m">
              {article.title}
            </h1>
            <p className="pds-spacing-mar-block-end-2xl">
              {authorName && `By ${authorName}`}
              {authorName && publicationDate && (
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

              {new Date(publicationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

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

            {showTOC ? (
              <SidebarLayout sidebarMobileLocation="before">
                <article slot="content" id="pds-toc-source">
                  {<ArticleView article={article} id="article-content" />}
                </article>
                <TableOfContents slot="sidebar" />
              </SidebarLayout>
            ) : (
              <ArticleView article={article} id="article-content" />
            )}

            <hr className="pds-spacing-mar-block-m" />
            <Tags displayType="article" tags={article?.tags} />
          </div>
        </Container>
      </Layout>
    </PantheonProvider>
  );
}

export async function getServerSideProps({
  req: { cookies },
  query: { uri, publishingLevel, pccGrant, ...query },
}) {
  const slugOrId = uri[uri.length - 1];
  const grant = pccGrant || cookies["PCC-GRANT"] || null;

  const article = await getArticleBySlugOrId(
    slugOrId,
    publishingLevel ? publishingLevel.toString().toUpperCase() : "PRODUCTION",
  );

  if (!article) {
    return {
      notFound: true,
    };
  }

  if (
    article.slug?.trim().length &&
    article.slug.toLowerCase() !== slugOrId?.trim().toLowerCase()
  ) {
    // If the article was accessed by the id rather than the slug - then redirect to the canonical
    // link (mostly for SEO purposes than anything else).
    return {
      redirect: {
        destination: queryString.stringifyUrl({
          url: pantheonAPIOptions.resolvePath(article),
          query: { publishingLevel, ...query },
        }),
        permanent: false,
      },
    };
  }

  return {
    props: {
      article,
      grant,
    },
  };
}

function isDateInputObject(v) {
  return v.msSinceEpoch != null;
}

const getSeoMetadata = (article) => {
  const tags = article.tags && article.tags.length > 0 ? article.tags : [];
  let authors = [];
  let publishedTime = null;

  // Collecting data from metadata fields
  Object.entries(article.metadata || {}).forEach(([key, val]) => {
    if (key.toLowerCase().trim() === "author" && val) authors = [val];
    else if (key.toLowerCase().trim() === "date" && isDateInputObject(val))
      publishedTime = new Date(val.msSinceEpoch).toISOString();
  });

  return {
    title: article.title,
    description: "Article hosted using Pantheon Content Cloud",
    tags,
    authors,
    publishedTime,
  };
};
