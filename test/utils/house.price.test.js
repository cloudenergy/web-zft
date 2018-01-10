import _ from 'lodash';
import fp from 'lodash/fp';

const nameMapping = {
	'ELECTRIC': 'electricity',
	'OTHER2': 'water',
	'OTHER3': 'hot water'
}

const transform = houses => {
	const single = house => {
		const customAttributes = _(house.prices)
			.groupBy('type')
			.mapValues((v) => _.get(v, '[0]', {}))
			.mapKeys((v, k) => nameMapping[k])
			.value();
		return _.assign({}, house, customAttributes);
	}
	return fp.map(single)(houses);
}

describe('HousePrice', () => {
	it('should transform prices into house body', () => {
		const houses = [{
			houseId: '6348906036501549056',
			prices: [
				{
					type: 'ELECTRIC',
					price: 4
				}
			]
		}];

		const expectedHouses = [{
			houseId: '6348906036501549056',
			electricity: {
				type: 'ELECTRIC',
				price: 4
			},
			prices: [
				{
					type: 'ELECTRIC',
					price: 4
				}
			]
		}];
		expect(transform(houses)).toMatchObject(expectedHouses);
	});

	it('should consider other types of prices', () => {
		const houses = [{
			houseId: '6348906036501549056',
			prices: [
				{
					type: 'ELECTRIC',
					price: 4
				},
				{
					type: 'OTHER2',
					price: 100
				}
			]
		}];

		const expectedHouses = [{
			houseId: '6348906036501549056',
			electricity: {
				type: 'ELECTRIC',
				price: 4
			},
			water: {
				type: 'OTHER2',
				price: 100
			},
			prices: [
				{
					type: 'ELECTRIC',
					price: 4
				},
				{
					type: 'OTHER2',
					price: 100
				}
			]
		}];
		expect(transform(houses)).toMatchObject(expectedHouses);
	});

	it('should apply prices transformation to all houses', () => {
		const houses = [{
			houseId: '6348906036501549056',
			prices: [
				{
					type: 'ELECTRIC',
					price: 4
				},
				{
					type: 'OTHER2',
					price: 100
				}
			]
		}, {
			houseId: '6348906036501549057',
			prices: [
				{
					type: 'ELECTRIC',
					price: 5
				},
				{
					type: 'OTHER2',
					price: 200
				}
			]
		}];

		const expectedHouses = [{
			houseId: '6348906036501549056',
			electricity: {
				type: 'ELECTRIC',
				price: 4
			},
			water: {
				type: 'OTHER2',
				price: 100
			},
			prices: [
				{
					type: 'ELECTRIC',
					price: 4
				},
				{
					type: 'OTHER2',
					price: 100
				}
			]
		}, {
			houseId: '6348906036501549057',
			electricity: {
				type: 'ELECTRIC',
				price: 5
			},
			water: {
				type: 'OTHER2',
				price: 200
			},
			prices: [
				{
					type: 'ELECTRIC',
					price: 5
				},
				{
					type: 'OTHER2',
					price: 200
				}
			]
		}];
		expect(transform(houses)).toMatchObject(expectedHouses);
	});
});
