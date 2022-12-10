import { useState, Suspense } from "react";
import AnswerList from "./Component/AnswerList";
import Questions from "./Component/Questions";
import StartTimer from "./Component/StartTimer";
import SubmitModal from "./Component/SubmitModal";
import Timer from "./Component/Timer";
import { QuestionList } from "./Data/data";
import "./styles.css";

export default function App() {
  const [answerList, setAnswerList] = useState([]);
  const [submitModal, setSubmitModal] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  return (
    <Suspense fallback="Loading.........">
      <div className="main">
        <div className="App">
          <Timer
            startTimer={startTimer}
            timeOut={timeOut}
            setTimeOut={setTimeOut}
          />

          <div className="container">
            {timeOut ? (
              <SubmitModal
                answerList={answerList}
                setSubmitModal={setSubmitModal}
                timeOut={timeOut}
                setTimeOut={setTimeOut}
                setStartTimer={setStartTimer}
              />
            ) : (
              <>
                <AnswerList startTimer={startTimer} answerList={answerList} />
                {startTimer ? (
                  <Questions
                    answerList={answerList}
                    setAnswerList={setAnswerList}
                    setSubmitModal={setSubmitModal}
                  />
                ) : (
                  <StartTimer
                    length={QuestionList.length}
                    setStartTimer={setStartTimer}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {submitModal && (
          <SubmitModal
            timeOut={timeOut}
            answerList={answerList}
            setSubmitModal={setSubmitModal}
            setStartTimer={setStartTimer}
            setTimeOut={setTimeOut}
          />
        )}
      </div>
    </Suspense>
  );
}
