import React, { useState } from 'react'
import InterInner from '../components/InterInner';
import { useLocation } from 'react-router-dom';

const InterviewPrep = () => {
  const location = useLocation();
  const response = location.state && location.state.data;
  const [selectedKeyword, setSelectedKeyword] = useState('ALL');

  const filterQuestions = (keyword) => {
    if (keyword === 'ALL') return response.matchingQuestions;
    return response.matchingQuestions.filter(question => question.topic === keyword);
  };

  const keywords = response.keywords;
  const filteredQuestions = filterQuestions(selectedKeyword);

  return (
    <div>
      <div>
        Filter
        <select value={selectedKeyword} onChange={(e) => setSelectedKeyword(e.target.value)}>
          <option value="ALL">ALL</option>
          {
            keywords.map((keyword) => <option key={keyword} value={keyword}>{keyword}</option>)
          }
        </select>
      </div>
      <div><InterInner response={{...response, matchingQuestions: filteredQuestions}}/></div>
    </div>
  )
}

export default InterviewPrep