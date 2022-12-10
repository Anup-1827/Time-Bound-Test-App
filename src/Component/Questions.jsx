import { useState } from "react";
import { QuestionList } from "../Data/data";

export default function Questions({
  answerList,
  setAnswerList,
  setSubmitModal
}) {
  const [details, setDetails] = useState({
    prev: -1,
    current: 0,
    next: 1
  });

  const handleChangeQuestion = (param) => {
    const obj = { ...details };
    const totalQuestions = QuestionList.length;

    switch (param.toUpperCase()) {
      case "PREV":
        if (details.prev > -1) {
          --obj.prev;
          --obj.current;
          --obj.next;
          setDetails(obj);
        }
        return;
      case "NEXT":
        if (obj.next !== -1) {
          ++obj.prev;
          ++obj.current;
          ++obj.next;

          if (obj.next === totalQuestions) {
            obj.next = -1;
          }
          setDetails(obj);
        }

        return;
      default:
        return;
    }
  };

  const handleInputChange = (e) => {
    const currentQuestion = QuestionList[details.current];
    const isInTheList = answerList.some((ans) => ans.id === currentQuestion.id);

    if (isInTheList) {
      setAnswerList(
        answerList.map((ans) =>
          ans.id === currentQuestion.id
            ? {
                ...ans,
                value: e.target.value,
                text: e.target.nextSibling.innerHTML
              }
            : ans
        )
      );
    } else {
      setAnswerList((prev) => [
        ...prev,
        {
          id: currentQuestion.id,
          value: e.target.value,
          text: e.target.nextSibling.innerHTML,
          answer: currentQuestion.answer
        }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitModal(true);
  };

  return (
    <div className="questions">
      <div className="header">
        <button
          className="previous btn"
          onClick={() => handleChangeQuestion("prev")}
          disabled={details.prev === -1}
        >
          {"<"}
        </button>
        <div className="heading">
          Question{` ${Number(details.current) + 1}/${QuestionList.length}`}
        </div>
        <button
          className="next btn"
          onClick={() => handleChangeQuestion("next")}
          disabled={details.next === -1}
        >
          {">"}
        </button>
      </div>
      <div className="mainQuestion">
        <h3>{QuestionList[details.current].question}</h3>
        <div onChange={handleInputChange}>
          {QuestionList[details.current].options.map((opt, index) => {
            const objArr = answerList.filter(
              (ans) => ans.id === QuestionList[details.current].id
            );
            const value = objArr.length > 0 ? objArr[0].value : "";
            return (
              <div className="radioBtn" key={index}>
                <input
                  type="radio"
                  value={opt.value}
                  id={opt.string}
                  name={QuestionList[details.current].name}
                  checked={value === opt.value}
                />
                <label
                  htmlFor={opt.string}
                >{`${opt.string[0].toUpperCase()}${opt.string.slice(
                  1
                )}`}</label>
                <br />
              </div>
            );
          })}
        </div>
      </div>
      {details.next === -1 ? (
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
