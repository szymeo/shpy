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
	// Simulate a delay for fun
	await sleep(Math.floor(Math.random() * 5000) + 5000);

	const PLAYERS_PER_SPY = 3;
	const spies_count = Math.floor(players_count / PLAYERS_PER_SPY);
	const rounds: Round[] = [];
	const spyAssignmentCounts: number[] = new Array(players_count).fill(0);
	let lastSpies: number[] = []; // Track spies from the last round

	for (let i = 0; i < rounds_count; i++) {
		const random_place = get_random_place();

		// Assign weights to players
		const weights: number[] = new Array(players_count).fill(1); // Default weight is 1
		lastSpies.forEach((spy) => (weights[spy] = 0)); // Players who were spies last round cannot be spies again

		// Calculate total weight for normalization
		const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

		// Select spies using weighted random selection
		const spies_indexes: number[] = [];
		while (spies_indexes.length < spies_count) {
			let randomValue = Math.random() * totalWeight;
			for (
				let playerIndex = 0;
				playerIndex < players_count;
				playerIndex++
			) {
				if (
					weights[playerIndex] > 0 &&
					randomValue < weights[playerIndex]
				) {
					spies_indexes.push(playerIndex);
					weights[playerIndex] = 0; // Prevent duplicate selection
					break;
				}
				randomValue -= weights[playerIndex];
			}
		}

		// Update spy assignment counts and lastSpies
		spies_indexes.forEach((spy) => spyAssignmentCounts[spy]++);
		lastSpies = spies_indexes;

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
