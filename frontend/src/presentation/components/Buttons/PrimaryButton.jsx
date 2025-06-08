
const PrimaryButton = ({ text, onClick }) => {
  return (
    <button className="cta-button primary" onClick={onClick}>
      {text}
    </button>
  );
}

export default PrimaryButton;