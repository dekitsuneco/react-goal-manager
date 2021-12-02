import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import styled from 'styled-components';
import GlobalStyle from './styles/Global.style';
import Goal from './components/Goal';

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 1rem 0;
`;

const base = new Airtable({ apiKey: 'key4vvm2HX4QpskuJ'}).base('app8aRnlMfNmjQ3Ob');

function App() {
  const [goals, setGoals] = useState([]);
  const [updates, setUpdates] = useState([]);

  /*const getRecordsFrom = tableName => {
    base(tableName)
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setGoals(records);
        fetchNextPage();
      });
  };*/

  useEffect(() => {
    /*getRecordsFrom('goals');
    getRecordsFrom('updates');*/
    base('goals')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setGoals(records);
        fetchNextPage();
      });

    base('updates')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setUpdates(records);
        fetchNextPage();
      });
  }, []);
    
  return (
    <>
      <GlobalStyle />
      <StyledH1>My Goals</StyledH1>
      {goals.map(goal => (
        <Goal
          key={goal.id}
          goal={goal}
          updates={updates.filter(update => update.fields.goalid[0] === goal.id)}
        />
      ))}
    </> 
  );
}

export default App;
