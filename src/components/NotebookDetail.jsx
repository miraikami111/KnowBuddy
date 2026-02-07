import WordCard from "./WordCard";
import AddWordForm from "./AddWordForm";

function NotebookDetail({ notebook, onBack, onAddWord, onDeleteWord }) {
  if (!notebook) {
  return (
    <div>
      <p>Notebook not found.</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
 
  return (
    <div>
      <h2>{notebook.title}</h2>
      <button onClick={onBack}>Back</button>

      <AddWordForm onAddWord={onAddWord} />

      {notebook.words.map((word) => (
        <WordCard
          key={word.id}
          question={word.question}
          answer={word.answer}
          onDelete={() => onDeleteWord(word.id)}
        />
      ))}
    </div>
  );
}

export default NotebookDetail;