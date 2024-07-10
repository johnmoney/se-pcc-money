import Link from "next/link";
import { Tags } from "./tags";
import { Card } from "@pantheon-systems/pds-toolkit-react";
import Moment from 'react-moment';

const placeholderGradient =
  "https://cdn.bfldr.com/MEM5087K/at/sv7z2hv795j7nv3qb3rvp3/gradient_1.png?auto=webp&format=png&width=600&height=380";

export const ArticleGrid = ({ articles, headingLevel }) => {
  return (
    <div className="pds-grid">
      {articles.map((article) => {
        // Preprocess metadata for display.
        const cardImage = article.metadata.cardImage;
        const articleSummary = article.metadata.Description;

        if (article.metadata['Content Type'] == "News") {
          return (
            <Card
              key={article.id}
              kickerText={<Moment unix fromNow>{article.publishedDate / 1000}</Moment>}
              headingLevel={headingLevel}
              headingText={article.title}
              isClickable={true}
              image={{
                src: cardImage || placeholderGradient,
                alt: "",
              }}
              primaryLink={<Link href={`/articles/${article.id}`}></Link>}
              bodyText={articleSummary}
              className="pds-grid-item pds-grid-item--sm-6 pds-grid-item--md-4 pds-grid-item--lg-4"
            />
            );
        }
        else
          return null;
  })}
    </div>
  );
};
