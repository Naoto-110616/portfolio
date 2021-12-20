import { useEffect, useState } from "react";
import classes from "./ToolSet.module.css";
import SectionTItle from "../sectionTitle/SectionTitle";
import Item from "./item/Item";
import useSkill from "../../hooks/use-skill";

const ToolSet = () => {
	const [frontSkills, setFrontSkills] = useState([]);
	const [backendSkills, setBackendSkills] = useState([]);
	const [toolSkills, setToolSkills] = useState([]);

	useEffect(() => {
		const fetchFrontSkills = async () => {
			const response = await fetch(
				"https://portfolio-page-react-default-rtdb.firebaseio.com/skills/frontSkills.json"
			);
			const responseData = await response.json();

			const loadedFrontSkills = [];
			for (const key in responseData) {
				loadedFrontSkills.push({
					id: key,
					title: responseData[key].title,
					rate: responseData[key].rate,
					iconClassName: responseData[key].iconClassName,
				});
			}
			setFrontSkills(loadedFrontSkills);
		};
		fetchFrontSkills();
	}, []);
	useEffect(() => {
		const fetchBackendSkills = async () => {
			const response = await fetch(
				"https://portfolio-page-react-default-rtdb.firebaseio.com/skills/backendSkills.json"
			);
			const responseData = await response.json();

			const loadedBackendSkills = [];
			for (const key in responseData) {
				loadedBackendSkills.push({
					id: key,
					title: responseData[key].title,
					rate: responseData[key].rate,
					iconClassName: responseData[key].iconClassName,
				});
			}
			setBackendSkills(loadedBackendSkills);
		};
		fetchBackendSkills();
	}, []);
	useEffect(() => {
		const fetchToolSkills = async () => {
			const response = await fetch(
				"https://portfolio-page-react-default-rtdb.firebaseio.com/skills/ToolSkills.json"
			);
			const responseData = await response.json();

			const loadedToolSkills = [];
			for (const key in responseData) {
				loadedToolSkills.push({
					id: key,
					title: responseData[key].title,
					rate: responseData[key].rate,
					iconClassName: responseData[key].iconClassName,
				});
			}
			setToolSkills(loadedToolSkills);
		};
		fetchToolSkills();
	}, []);

	console.log(
		useSkill(
			"https://portfolio-page-react-default-rtdb.firebaseio.com/skills/frontSkills.json"
		)
	);

	const frontItems = frontSkills.map((frontSkill) => (
		<Item
			key={frontSkill.id}
			id={frontSkill.id}
			title={frontSkill.title}
			rate={frontSkill.rate}
			iconClassName={frontSkill.iconClassName}
		/>
	));
	const backItems = backendSkills.map((backendSkill) => (
		<Item
			key={backendSkill.id}
			id={backendSkill.id}
			title={backendSkill.title}
			rate={backendSkill.rate}
			iconClassName={backendSkill.iconClassName}
		/>
	));
	const tools = toolSkills.map((tool) => (
		<Item
			key={tool.id}
			id={tool.id}
			title={tool.title}
			rate={tool.rate}
			iconClassName={tool.iconClassName}
		/>
	));
	return (
		<section id="toolSet" className={classes["toolSet-wrap"]}>
			<SectionTItle title={"ToolSet"} />
			<h3>Frontend</h3>
			<div className={classes["toolSet-item"]}>{frontItems}</div>
			<h3>Backend</h3>
			<div className={classes["toolSet-item"]}>{backItems}</div>
			<h3>Tools</h3>
			<div className={classes["toolSet-item"]}>{tools}</div>
		</section>
	);
};
export default ToolSet;
