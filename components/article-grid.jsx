import Link from "next/link";
import { Card } from "@pantheon-systems/pds-toolkit-react";

export const ArticleGrid = ({ articles, headingLevel }) => {
  return (
    <div className="pds-grid">
      {articles.map((article) => {
        return (
          <Card
            key={article.id}
            headingLevel={headingLevel}
            headingText={article.title}
            isClickable={true}
            image={{
              src: "https://cdn.bfldr.com/MEM5087K/at/sv7z2hv795j7nv3qb3rvp3/gradient_1.png?auto=webp&format=png&width=600&height=380",
              alt: "",
            }}
            primaryLink={<Link href={`/articles/${article.id}`}></Link>}
            className="pds-grid-item pds-grid-item--sm-2 pds-grid-item--md-4 pds-grid-item--lg-4"
          />
        );
      })}
    </div>
  );
};
