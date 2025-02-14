import type { Load } from '@sveltejs/kit';
import type { Round } from './game.types';
import { faker } from '@faker-js/faker';

const get_random_place = (): string => {
	const places = [
		'Cafe',
		'Theater',
		'Restaurant',
		'Park',
		'Museum',
		'Library',
		'Gym',
		'Cinema',
		'Bakery',
		'Bookstore',
		'Coffee Shop',
		'Art Gallery',
		'Bar',
		'Club',
		'Hotel',
		'Zoo',
		'Aquarium',
		'Stadium',
		'Market',
		'Spa',
		'Playground',
		'Observatory',
		'Church',
		'Tennis Court',
		'University',
		'School',
		'Hospital',
		'Clinic',
		'Pharmacy',
		'Supermarket',
		'Gas Station',
		'Car Wash',
		'Airport',
		'Train Station',
		'Bus Station',
		'Beach',
		'Mountain',
		'Forest',
		'Lake',
		'River',
		'Parking',
		'Canyon',
		'Desert',
		'Castle',
		'Fountain',
		'Bridge',
		'Skyscraper',
		'Farm',
		'Factory',
		'Office',
		'Photo Studio',
		'Laboratory',
	];

	return faker.helpers.arrayElement(places);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const generate_rounds = async (
	players_count: number,
	rounds_count: number,
): Promise<Round[]> => {
	// act smart x)
	await sleep(Math.floor(Math.random() * 5000) + 5000);

	const PLAYERS_PER_SPY = 3;
	const spies_count = Math.floor(players_count / PLAYERS_PER_SPY);
	const rounds: Round[] = [];
	const spyAssignmentCounts: number[] = new Array(players_count).fill(0);

	for (let i = 0; i < rounds_count; i++) {
		const random_place = get_random_place();

		const minSpyAssignments = Math.min(...spyAssignmentCounts);
		let eligiblePlayers = spyAssignmentCounts
			.map((count, index) => (count === minSpyAssignments ? index : -1))
			.filter((index) => index !== -1);

		while (eligiblePlayers.length < spies_count) {
			const nextMinSpyAssignments = Math.min(
				...spyAssignmentCounts.filter(
					(count) => count > minSpyAssignments,
				),
			);
			const additionalPlayers = spyAssignmentCounts
				.map((count, index) =>
					count === nextMinSpyAssignments ? index : -1,
				)
				.filter((index) => index !== -1);
			eligiblePlayers = eligiblePlayers.concat(additionalPlayers);
		}

		const spies_indexes: number[] = [];
		while (
			spies_indexes.length < spies_count &&
			eligiblePlayers.length > 0
		) {
			const randomIndex = Math.floor(
				Math.random() * eligiblePlayers.length,
			);
			const selectedPlayer = eligiblePlayers.splice(randomIndex, 1)[0];
			spies_indexes.push(selectedPlayer);
			spyAssignmentCounts[selectedPlayer]++;
		}

		rounds.push({
			spies: spies_indexes,
			random_place,
		});
	}

	return rounds;
};

export const load: Load = ({
	params,
}): {
	rounds: Promise<Round[]>;
} => {
	const { players_count } = params;
	const rounds_count = 50;

	return {
		rounds: generate_rounds(+players_count, rounds_count),
	};
};
