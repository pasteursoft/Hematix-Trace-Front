import React from 'react';
import {BrowserRouter as Router,
		Route,
		Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import Home from '../../pages/home';
import Help from '../../pages/help';
import Disclaimer from '../../pages/disclaimer';
import NoticePrivacity from '../../pages/noticePrivacity';
import TermsConditios from '../../pages/termsConditions';
import NotFound from '../../pages/notFound';
import { ThemeProvider } from '@material-ui/styles';
import { hematixTheme } from '../../assets/css/themes';
import Movements from '../../pages/movements';
import Measurements from '../../pages/measurements';
import Localization from '../../pages/localization';
import Containers from '../../pages/containers';
import Users from '../../pages/users';

const App = ({store}) => (
    <ThemeProvider theme={hematixTheme}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/help" component={Help} />
                    <Route path="/disclaimer" component={Disclaimer} />
                    <Route path="/noticePrivacity" component={NoticePrivacity} />
                    <Route path="/termsConditions" component={TermsConditios} />
                    <Route path="/movements" component={Movements} />
                    <Route path="/measurements" component={Measurements} />
                    <Route path="/localization" component={Localization} />
                    <Route path="/containers" component={Containers} />
                    <Route path="/users" component={Users} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Provider>
    </ThemeProvider>
);

App.propTypes = {
	store: PropTypes.object.isRequired
};

export default App;