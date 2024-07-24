import { useState } from "react";

export default function EmailControls({ onSelectEmails, onClassify }) {
  const [numEmails, setNumEmails] = useState(10);

  const handleFetchChange = (e) => {
    const count = parseInt(e.target.value);
    setNumEmails(count);
    onSelectEmails(count);
  };

  const handleClassify = () => {
    onClassify();
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 max-w-2xl mx-auto mt-5">
      <div className="flex items-center">
        <label htmlFor="emailCount" className="mr-2">
          Fetch:
        </label>
        <select
          id="emailCount"
          value={numEmails}
          onChange={handleFetchChange}
          className="mr-4 p-2 border border-gray-300 rounded"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="14">15</option>
        </select>
      </div>
      <button
        onClick={handleClassify}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Classify
      </button>
    </div>
  );
}
