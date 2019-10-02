import React, { Component } from "react";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ConfiguracionHielera from "./Conteiners/ConfiguracionHielera/ConfiguracionHielera";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<ConfiguracionHielera />
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
