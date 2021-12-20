import { useEffect, useState } from "react";

const useSkill = (url) => {
	const [getSkills, setGetSkills] = useState([]);

	useEffect(() => {
		const fetchSkills = async () => {
			const response = await fetch(url);
			const responseData = await response.json();

			const loadedSkills = [];
			for (const key in responseData) {
				loadedSkills.push({
					id: key,
					title: responseData[key].title,
					rate: responseData[key].rate,
					iconClassName: responseData[key].iconClassName,
				});
			}
			setGetSkills(loadedSkills);
		};
		fetchSkills();
	}, [url]);
	return {
		getSkills,
	};
};

export default useSkill;
