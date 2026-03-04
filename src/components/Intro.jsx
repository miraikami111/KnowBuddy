function Intro({ onClose }) {
  return (
    <div className="intro-overlay" onClick={onClose}>
      <div
        className="intro-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>How to use KnowBuddy❔</h1>

        <ol>
          <li>Enter a title in the input box</li>
          <li>Click "Add My note"</li>
          <li>Your topic will appear in "My Topics"(You can delete it anytime)</li>
          <li></li>

        </ol>

      </div>
    </div>
  );
}

export default Intro;