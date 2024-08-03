import "../blocks/hamburger.css";
function Hamburger({ handleClick }) {
  return (
    <div className="hamburger">
      <button
        type="button"
        className="hamburger__icon"
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default Hamburger;
