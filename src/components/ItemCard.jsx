import "../blocks/itemcard.css";

function ItemCard({ item, previewCard }) {
  const handleCardClick = () => {
    previewCard(item);
  };

  return (
    <li className="item-card" onClick={handleCardClick}>
      <h2 className="item-card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="item-card__image"></img>
    </li>
  );
}

export default ItemCard;
