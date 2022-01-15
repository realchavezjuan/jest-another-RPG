
const { expect } = require('@jest/globals');
const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/potion.js');

jest.mock('../lib/Potion.js');

test('creates an enemy', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

test('gets Enemys stats as an object', () => {
    const enemy = new Enemy('goblin');

    expect(enemy.getStats()).toHaveProperty('potions');
    expect(enemy.getStats()).toHaveProperty('health');
    expect(enemy.getStats()).toHaveProperty('strength');
    expect(enemy.getStats()).toHaveProperty('agility');
});

test('gets inventory form Enemy or returns false',() => {
    const enemy = new Enemy('goblin');

    expect(enemy.getInventory()).toEqual(expect.any(Array));

    enemy.inventory = [];
    expect(enemy.getInventory()).toEqual(false);
});

test("gets Enemy's health value", () => {
    const enemy = new Enemy('goblin');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
    
});

test("checks if Enemy is alive or not", () => {
    const enemy = new Enemy('goblin');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
})

test('subtracts form Enemys health', () => {
    const enemy = new Enemy('goblin');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);
    expect(enemy.health).toBe(oldHealth -5);

    enemy.reduceHealth(99999);
    expect(enemy.health).toBe(0);
});

test("gets Enemy's attack value", () => {
    const enemy = new Enemy('goblin');
    enemy.strength = 10;
  
    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a potion to the inventory', () => {
const enemy = new Enemy('goblin');
const oldCount = enemy.inventory.length;

enemy.addPotion(new Potion());

expect(enemy.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () =>{
    const enemy = new Enemy ('goblin');
    enemy.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = enemy.inventory.length;

    enemy.usePotion(1);
    expect(enemy.inventory.length).toBeLessThan(oldCount);
});

test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});