import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Header from "../header/header";
import Articles from "../article/Article";
import CreateArticle from "../createArticle/CreateArticle";



const ContentManager = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/create_article">
                        <CreateArticle />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Articles />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default ContentManager;