import React from "react";
import Layouts from "./components/UI/Layouts/Layouts";
import Welcome from "./components/welcome/Welcome";

function App() {
	return (
		<>
			<Layouts>
				<Welcome />
			</Layouts>
		</>
	);
}

export default App;
