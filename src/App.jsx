import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

const element = (
	<Router>
		<Page />
	</Router>
);

ReactDOM.render(element, document.getElementById('contents'));
