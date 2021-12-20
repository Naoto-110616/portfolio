import Item from "../components/toolSet/item/Item";

import { useEffect, useState } from "react";

const useSkills = () => {
	const [getSkills, setGetSkills] = useState([]);

	useEffect((enteredUrl) => {
		const fetchSkills = async () => {
			const response = await fetch(enteredUrl);
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
			setGetSkills(loadedFrontSkills);
		};
		fetchSkills();
	}, []);
	const frontItems = getSkills.map((skill) => (
		<Item
			key={skill.id}
			id={skill.id}
			title={skill.title}
			rate={skill.rate}
			iconClassName={skill.iconClassName}
		/>
	));
};

export default useSkills;
