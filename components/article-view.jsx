import { useArticle } from "@pantheon-systems/pcc-react-sdk";
import { ArticleRenderer } from "@pantheon-systems/pcc-react-sdk/components";
import { clientSmartComponentMap } from "./smart-components";

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

  console.log(hydratedArticle);

  return (
    <ArticleRenderer
      __experimentalFlags={{ disableAllStyles: true }}
      article={hydratedArticle}
      renderTitle={() => (
        <div>
          <h1 className="pds-ts-5xl">{hydratedArticle.title}</h1>

          {article.updatedAt ? (
            <p>
              Last Updated:{" "}
              {new Date(article.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}

          <hr className="pds-spacing-mar-block-xl" />
        </div>
      )}
      smartComponentMap={clientSmartComponentMap}
    />
  );
}
