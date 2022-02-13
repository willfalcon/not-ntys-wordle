import React from 'react';
import styled from 'styled-components';

const DistributionChart = ({ stats }) => {
  const { guesses } = stats;
  const guessesArr = [guesses[1], guesses[2], guesses[3], guesses[4], guesses[5], guesses[6]];

  const max = guessesArr.reduce((a, b) => (b > a ? b : a));

  const todaysGuesses = localStorage.getItem('todaysGuesses');

  return (
    <Chart>
      {guessesArr.map((no, i) => {
        return (
          <Row key={i} todays={parseInt(todaysGuesses) === i + 1} no={no} max={max}>
            <span className="label">{i + 1}</span>
            <span className="bar">{no}</span>
          </Row>
        );
      })}
    </Chart>
  );
};

const Chart = styled.div`
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  .label {
    font-size: 2rem;
  }
  .bar {
    width: ${({ no, max }) => (no / max) * 100}%;
    background: ${({ theme, todays }) => (todays ? theme.green : theme.dark)};
    height: 100%;
    color: ${({ theme }) => theme.white};
    min-width: 20px;
    text-align: right;
    padding: 0 4px;
    margin-left: 2px;
  }
`;

export default DistributionChart;
