export default function AnswerList({ startTimer, answerList }) {
  return (
    <div
      className="answerListparent"
      style={{ visibility: startTimer ? "visible" : "hidden" }}
    >
      <div className="answerList">
        <div className="answers">
          {answerList
            .sort((a, b) => a.id - b.id)
            .map((ans) => {
              return (
                <div className="box1" key={ans?.id}>
                  <div className="num">{`#${ans.id}. `}</div>

                  <div>{ans.text}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
