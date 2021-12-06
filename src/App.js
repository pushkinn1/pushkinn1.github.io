import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect,
} from "react-router-dom";
import './header.css'
import main_img from "./imgs/main_img.svg"
import main__img2 from "./imgs/main__img2.svg"
import prev from "./imgs/backwards.svg"
import next from "./imgs/forward.svg"
import logo from "./imgs/logo.svg"
import server from "./api"
import finish__img from "../src/imgs/five.svg"

class App extends React.Component {
    render() {
        return (
            <Router>
                <header className="header">
                    <div className="wrapper header__wrapper">
                        <div className="header__logo">
                            <Link to="/main"> </Link>
                            <img src={logo} className="logo"></img>
                        </div>
                        <nav className="header__nav">
                            <ul>
                                <li><NavLink activeClassName="header__li-selected" to="/main">Main</NavLink></li>
                                <li><NavLink activeClassName="header__li-selected" to="/themeSelection">Test</NavLink></li>
                                <li><NavLink activeClassName="header__li-selected" to="/aboutUs">About us</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/main" />
                        </Route>
                        <Route path="/main">
                            <Main />
                        </Route>
                        <Route path="/aboutUs">
                            <AboutUs />
                        </Route>
                        <Route path='/themeSelection'>
                            <ThemesList />
                        </Route>
                        <Route path='/aviation'>
                            <QuestionList theme="aviation" />
                        </Route>
                        <Route path='/medicine'>
                            <QuestionList theme="medicine" />
                        </Route>
                        <Route path='/architecture'>
                            <QuestionList theme="architecture" />
                        </Route>
                    </Switch>
                </main>
            </Router>
        )
    }
}

function Main() {
    return (
        <div className="wrapper wrapper_space">
            <div className="main__look">
                <h2 className="main__title">Improve your vocabulary in different topics </h2>
                <p className="main__subtitle">
                Free quiz that will help you improve your language skills in various industries
                </p>
                <Link to="/themeSelection">
                    <div className="btn main__btn">
                        <span>
                            Start
                        </span>
                    </div>
                </Link>
            </div>
            <img src={main_img} className="main__img" />
        </div>
    )
}

function AboutUs() {
    return (
        <div className="wrapper">
            <div>About us</div>
        </div>
    )
}

class ThemesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { themes: [] }
    }
    componentDidMount() {
        fetch("api/branches")
            .then(res => res.json())
            .then(res => this.setState({ themes: res.themes }));
    }
    render() {
        let themes = this.state.themes.map(el => {
            let _to = "/" + el.toLowerCase();
            return (
                <Link className="themes__link variant" to={_to} key={el}>
                    <span>
                        {el}
                    </span>
                </Link>
            )
        })
        return (
            <div className="wrapper_space wrapper">
                <div className="main__look">
                    <div className="main__title main__title-smaller">
                        Choose a topic

                    </div>
                    {themes.length > 0 ? themes : <div>Loading</div>}
                </div>
                <img src={main__img2} />
            </div>

        )
    }
}

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], finished: false, curr: 0, loaded: false, answers: [] }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    componentDidMount() {
        fetch("api/branch/" + this.props.theme)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({ questions: res, loaded: true, answers: Array(res.length).fill(null) })
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
                !this.state.finished ?
                    <Question
                        next={this.next}
                        prev={this.prev}
                        question={this.state.questions[this.state.curr]}
                        number={this.state.curr}
                    /> :
                    <Finish theme={this.props.theme}
                        answers={this.state.answers}
                        correctAnswers={this.getCorrectAnswers()}
                    />
            )
        else return (
            <div className="wrapper">Loading</div>
        )
    }
}

class Question extends React.Component {
    render() {
        let variants = this.props.question["v"].map(el => {
            return (
                <label key={el} htmlFor={el}>
                    <div className="variant question__variant" key={el}>
                        <span>
                            <input type="radio" value={el} name={this.props.number} id={el} />
                            {el}
                        </span>
                    </div>
                </label>
            )
        })
        return (
            <div className="wrapper question__wrapper">
                <h2 className="question__title"><span className="question__number">{this.props.number + 1}</span> {this.props.question["q"]}</h2>
                {variants}
                <div className="question__arrows">
                    <div className="question__btn" onClick={this.props.prev}>
                        <img className="question__arrow" src={prev} />
                    </div>
                    <div className="question__btn" onClick={this.props.next}>
                        <img className="question__arrow" src={next} />
                    </div>
                </div>
            </div>
        )
    }
}

class Finish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }
    componentDidMount() {
        this.img = new Image();
        this.img.src = finish__img;
        this.img.onload = () => this.setState({loaded: true});
    }
    render() {
        let result = 0;

        for (let i = 0; i < this.props.answers.length; i++)
            if (this.props.answers[i] == this.props.correctAnswers[i])
                result++;
        if (this.state.loaded)
            return (
                <div className="wrapper wrapper_space finish__wrapper">
                    <div>
                        <h2>
                            You have finished {this.props.theme} theme
                        </h2>
                        <div>Result: {result} / {this.props.answers.length}</div>
                        <Link to="/main">Go home</Link>
                    </div>
                    <img src={finish__img} />
                </div>
            )
        else
            return (
                <div></div>
            )
    }
}


export default App
