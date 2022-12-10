export default function StartTimer(props) {
  const { setStartTimer, length } = props;

  return (
    <div className="startTimer">
      <h1>Click on the button to Start the Test</h1>
      <h2>{`Number of Questions : ${length}`}</h2>
      <p>Each question has 1 minute</p>
      <button className="btn" onClick={() => setStartTimer(true)}>
        Start Timer
      </button>
    </div>
  );
}
