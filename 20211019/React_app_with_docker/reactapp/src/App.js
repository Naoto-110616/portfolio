import React from "react";
import ToolSet from "./components/toolSet/ToolSet";
import Layouts from "./components/UI/Layouts/Layouts";
import Welcome from "./components/welcome/Welcome";
import WorkLog from "./components/workLog/WorkLog";
import SideProjects from "./components/sideProjects/SideProjects";

function App() {
	return (
		<>
			<Layouts>
				<Welcome />
				<WorkLog />
				<ToolSet />
				<SideProjects />
			</Layouts>
		</>
	);
}

export default App;
