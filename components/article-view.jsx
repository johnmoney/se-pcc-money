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

  return (
    <ArticleRenderer
      article={hydratedArticle}
      renderTitle={(titleElement) => (
        <div>
          <div className="pds-ts-3xl">{titleElement}</div>

          {article.updatedAt ? (
            <p className="py-2">
              Last Updated:{" "}
              {new Date(article.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}

          <hr className="mt-6 mb-8" />
        </div>
      )}
      smartComponentMap={clientSmartComponentMap}
    />
  );
}
