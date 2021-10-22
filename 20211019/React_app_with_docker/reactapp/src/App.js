import React from "react";
import ToolSet from "./components/toolset/ToolSet";
import Layouts from "./components/UI/Layouts/Layouts";
import Welcome from "./components/welcome/Welcome";
import WorkLog from "./components/worklog/WorkLog";

function App() {
	return (
		<>
			<Layouts>
				<Welcome />
				<WorkLog />
				<ToolSet />
			</Layouts>
		</>
	);
}

export default App;
