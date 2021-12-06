import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import server from "../api"

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], finished: false, curr: 0, loaded: false, answers: [] }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    componentDidMount() {
        fetch("api/questions")
            .then(res => res.json())
            .then(res => {
                this.setState({ questions: res["questions"], loaded: true, answers: Array(res["questions"].length).fill(null) })
                this.getCorrectAnswers = this.getCorrectAnswers.bind(this);
            })
    }
    getCorrectAnswers() {
        let res = [];
        for (let i = 0; i < this.state.questions.length; i++)
            res.push(this.state.questions[i]["c"]);
        return res;
    }
    next() {
        let checked = document.querySelector('input:checked');
        if (this.state.answers[this.state.curr] == null)
            (checked) ? checked = checked.value : checked = null;
        else
        checked = this.state.answers[this.state.curr];
        let newAnswers = this.state.answers;
        newAnswers[this.state.curr] = checked;
        if (this.state.curr == this.state.questions.length - 1) this.setState({ finished: true });
        this.setState(s => {
            return ({ curr: s.curr + 1, answers: newAnswers })
        })
    }
    prev() {
        if (this.state.curr == 0) {
            alert("This is the first question");
            return 0;
        }
        this.setState(s => {
            return ({ curr: s.curr - 1 })
        })
    }
    render() {
        if (this.state.loaded)
            return (
                !this.state.finished ? <Question next={this.next} prev={this.prev} question={this.state.questions[this.state.curr]} /> : <Finish theme={this.props.theme} answers={this.state.answers} correctAnswers={this.getCorrectAnswers()} />
            )
        else return (
            <div>Loading</div>
        )
    }
}

class Question extends React.Component {
    render() {
        let variants = this.props.question["v"].map(el => {
            return(
                <div key={el}>
                    <input type="radio" value={el} name={el} id={el} />
                    <label htmlFor={el}>{el}</label> 
                </div>
            )
        })
        return (
            <div>
                <h2>{this.props.question["q"]}</h2>
                {variants}
                <button onClick={this.props.prev}>Prev</button>
                <button onClick={this.props.next}>Next</button>
            </div>
        )
    }
}

function Finish(props) {
    let result = 0;
    for (let i = 0; i < props.answers.length; i++)
        if (props.answers[i] == props.correctAnswers[i])
            result++;
    return (
        <div>
            <h2>
                You finished theme {props.theme}
            </h2>
            <div>Result: {result}/{props.answers.length}</div>
        </div>
    )
}

export default QuestionList