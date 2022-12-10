import { QuestionList } from "../Data/data";
import StartTimer from "./StartTimer";

export default function SubmitModal({
  answerList,
  setStartTimer,
  setSubmitModal,
  timeOut,
  setTimeOut
}) {
  const handleReTest = () => {
    window.location.reload();
  };
  const correctAnswers = answerList.reduce((acc, item) => {
    if (item.value.toString() === item.answer.toString()) return ++acc;
    else return acc;
  }, 0);

  return (
    <div className="submitModal">
      <div className="content">
        {timeOut ? (
          <h2 style={{ color: "red" }}>Your Session has been Expired</h2>
        ) : (
          <h2 style={{ color: "green" }}>Submitted Successfully</h2>
        )}
        <div className="box">
          <p>You answered</p>
          <p>
            {answerList.length}/{QuestionList.length}
          </p>
        </div>
        <div className="box">
          <p>Unanswered</p>
          <p>{QuestionList.length - answerList.length}</p>
        </div>
        <div className="box">
          <p>Correct Answer</p>
          <p>{correctAnswers}/{QuestionList.length}</p>
        </div>
        <div className="box">
          <p>Score</p>
          <p style={{ color: "crimson" }}>
            {((Number(correctAnswers) / QuestionList.length) * 100).toFixed(2)}
          </p>
        </div>
        <button className="btn" onClick={handleReTest}>
          ReTest
        </button>
      </div>
    </div>
  );
}
