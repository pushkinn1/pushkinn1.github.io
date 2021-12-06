import React from "react"
import QuestionList from "./questions";
import main__img2 from "../imgs/main__img2.svg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

class ThemeSelection extends React.Component {
    render() {
        return (
            <div className="wrapper main__wrapper">
                <Switch>

                    <Route path='/themeSelection'>
                        <ThemesList />
                    </Route>

                    <Route path="/aviation">
                        <QuestionList theme="aviation" />
                    </Route>

                </Switch>
            </div>
        )
    }
}
/* ! */
class ThemesList extends React.Component {
    render() {
        return (
            <div className="main__wrapper wrapper">
                <div className="main__look">
                    <div className="main__title main__title-smaller">
                        Выберите тему
                    </div>
                    <span className="Themes">
                        <Link className="themes__link" to="/aviation">Aviation</Link>
                        <Link className="themes__link" to="/medicine">Medicine</Link>
                        <Link className="themes__link" to="/architecture">Architecture</Link>
                    </span>
                </div>
                <img src={main__img2} />
            </div>

        )
    }
}

export default ThemeSelection