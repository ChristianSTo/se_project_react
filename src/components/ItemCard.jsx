import "../blocks/itemcard.css";

function ItemCard({ item, previewCard }) {
  if (!item) {
    console.error("Item is undefined");
    return null;
  }
  const handleCardClick = () => {
    previewCard(item);
  };
  //conditional src based on if the item has a link or url, so they are now interchangeable.
  const imgSrc = item.link || item.imageUrl || item.url;
  return (
    <li className="item-card" onClick={handleCardClick}>
      <h2 className="item-card__name">{item.name}</h2>
      <img src={imgSrc} alt={item.name} className="item-card__image"></img>
    </li>
  );
}

export default ItemCard;
