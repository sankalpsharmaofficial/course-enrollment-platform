let courses = [
	{
		id: 1,
		title: 'MS BUSINESS: ',
		description: 'CONSUMER & BUSINESS STRATERGY: 705 SUMMER 2024'
	}
];

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(courses);
	} else if (req.method === 'POST') {
		const newCourse = {
			id: Date.now(),
			...req.body
		};
		courses.push(newCourse);
		res.status(201).json(newCourse);
	} else {
		res.setHeader('Allow', ['GET', 'POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
