const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

console.log(new Potion());

const Player = require('../lib/Player');
const { expect } = require('@jest/globals');
const { object } = require('webidl-conversions');

test('creates a player object', () => {

    const player = new Player('Dave')

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));


});