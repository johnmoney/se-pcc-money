import Link from "next/link";
import { Tags } from "./tags";
import { Card } from "@pantheon-systems/pds-toolkit-react";

const placeholderIcon = "logo-govicons";

export const DepartmentGrid = ({ articles, headingLevel }) => {
  return (
    <div className="pds-grid">
      {articles.map((article) => {
        // Preprocess metadata for display.
        const cardIcon = article.metadata.cardIcon;
        if (article.metadata.Category == "Department") {
          return (
            <IconCard
              key={article.id}
              iconName={cardIcon || placeholderIcon}
              headingText={article.title}
              bodyText={article.metadata.Description}
              primaryLink={`/department/${article.id}`}
            />
          );
        }
        else
          return null;
      })}
    </div>
  );
};

export default function IconCard({ iconName, headingText, bodyText, primaryLink }) {
  const iconClass = "gi gi-4x gi-inverse gi-" + iconName;
  return (
    <a className="pds-card pds-card--clickable pds-grid-item pds-grid-item--sm-2 pds-grid-item--md-4 pds-grid-item--lg-3" href={primaryLink}>
      <div className="pds-card-icon">
        <i className={iconClass}></i>
      </div>
      <div className="pds-card__text-elements pad-top-0">
        <h2 className="pds-card__heading">{headingText}</h2>
        <div className="pds-card__bodytext"><p>{bodyText}</p></div>
      </div>
    </a>
  );
}
