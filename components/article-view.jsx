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
      __experimentalFlags={{ disableAllStyles: true }}
      article={hydratedArticle}
      bodyClassName="article-body"
      renderTitle={() => null}
      smartComponentMap={clientSmartComponentMap}
    />
  );
}
