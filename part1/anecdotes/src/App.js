import React, { useState } from 'react'

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.quote}</p>
      <p>has {props.vote} votes</p>
    </div>
  )
}

const Button = (props) => 
  <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const nextAnecdote = () => {
    const min = 0
    const max = anecdotes.length
    
    setSelected(Math.floor(Math.random() * (max - min) + min))
  }

  const incrementVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotesIdx = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote quote={anecdotes[selected]} vote={votes[selected]}/>
      <Button handleClick={incrementVote} text={"vote"} />
      <Button handleClick={nextAnecdote} text={"next anecdote"} />
      <h1>Anecdote with most votes</h1>
      <Anecdote quote={anecdotes[mostVotesIdx]} vote={votes[mostVotesIdx]}/>
    </div>
  )
}

export default App