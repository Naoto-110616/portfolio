import React from "react";
import Layouts from "./components/UI/Layouts/Layouts";
import Welcome from "./components/welcome/Welcome";
import WorkLog from "./components/worklog/WorkLog";

function App() {
	return (
		<>
			<Layouts>
				<Welcome />
				<WorkLog />
			</Layouts>
		</>
	);
}

export default App;
