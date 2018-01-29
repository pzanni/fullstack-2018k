import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            selectedAnecdote: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    vote = (grade, state) => {
        return () => {
            this.setState({ [grade]: state[grade] + 1 })
        }
    }

    nextAnecdote = (state) => {
        return () => {
            let max = this.props.anecdotes.length - 1
            let min = 0
            let ran = Math.floor(Math.random() * (max - min + 1)) + min;
            this.setState({ selectedAnecdote: ran })
        }
    }

    voteAnecdote = (state) => {
        return () => {
            const kopio = [...state.votes]
            const anecdoteCopy = 
            kopio[state.selectedAnecdote] += 1
            this.setState({ votes: kopio })
        }
    }

    getHighestVoteIndex = (state) => {

    }

    render() {
        return (
            <div>
                <Otsikko otsikko={'Anna arvostelu'} />
                <div>
                    <Button name={'Hyvä'} func={this.vote('hyva', this.state)} />
                    <Button name={'Neutraali'} func={this.vote('neutraali', this.state)} />
                    <Button name={'Huono'} func={this.vote('huono', this.state)} />
                </div>
                <Otsikko otsikko={'Statistiikka'} />
                {this.renderStatisctics()}

                <Otsikko otsikko={'Anecdote'} />
                <Button name={'Next anecdote'} func={this.nextAnecdote()} />
                <div>
                    {this.props.anecdotes[this.state.selectedAnecdote]}
                </div>
                {this.renderVoteCount(this.state.selectedAnecdote)}
                <Button name={'Vote'} func={this.voteAnecdote(this.state)} />
                
            </div>
        )
    }

    renderStatisctics() {
        if (this.state.hyva + this.state.neutraali + this.state.huono) {
            return (
                <div>
                    <Statistics state={this.state} />
                </div>
            )
        } else {
            return (
                <p>Ei yhtään palautetta annettu.</p>
            )
        }
    }

    renderVoteCount(selectedAnecdote) {
        if (this.state.votes && this.state.selectedAnecdote >= 0) {
            return (
                <div>
                   has {this.state.votes[selectedAnecdote]} votes
                </div>
            )
        }
    }
}

const Button = ({ name, func }) => {
    return (
        <button onClick={func}>
            {name}
        </button>
    )
}

const Otsikko = ({ otsikko }) => {
    return (
        <div>
            <h2>{otsikko}</h2>
        </div>
    )
}

const Statistics = ({ state }) => {
    return (
        <div>
            <table>
                <tbody>
                    <Statistic name={'Hyvä'} count={state.hyva} />
                    <Statistic name={'Neutraali'} count={state.neutraali} />
                    <Statistic name={'Huono'} count={state.huono} />
                </tbody>
            </table>
            <Keskiarvo state={state} />
            <Positiivisia state={state} />
        </div>
    )
}

const Statistic = ({ name, count }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{count}</td>
        </tr>
    )
}

const Votes = ({})

const Keskiarvo = ({ state }) => {
    let sum = state.hyva - state.huono
    let ka = sum / (state.hyva + state.neutraali + state.huono)
    return (
        <div>
            <p>Keskiarvo {ka}</p>
        </div>
    )
}

const Positiivisia = ({ state }) => {
    let positiivisia = state.hyva / (state.hyva + state.neutraali + state.huono)
    return (
        <div>
            <p>Positiivisia {positiivisia * 100}%</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
