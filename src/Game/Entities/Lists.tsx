import { isNamedTupleMember } from 'typescript';
import { store } from '../..';

const npcList = [
  {
    id: 0,
    entityType: 'x',
    name: 'test_npc',
    spawnCoords: [7, 7, 0],
    currentCoords: [7, 7, 0],
    leash: 2,
    health: 1,
    tilePlacedOn: 'e',
  },
  {
    id: 1,
    entityType: 'x',
    name: 'test_npc',
    spawnCoords: [15, 17, 0],
    currentCoords: [15, 17, 0],
    leash: 2,
    health: 1,
    tilePlacedOn: 'e',
  },
  {
    id: 2,
    entityType: 'x',
    name: 'test_npc',
    spawnCoords: [10, 20, 0],
    currentCoords: [10, 20, 0],
    leash: 5,
    health: 1,
    tilePlacedOn: 'e',
  },
  {
    id: 3,
    entityType: 'q',
    name: 'Test_Quest_Giver',
    spawnCoords: [8, 10, 0],
    currentCoords: [8, 10, 0],
    leash: -1,
    health: 1,
    tilePlacedOn: 'q',
  },
];

const questList = [
  {
    id: 0,
    name: 'First Quest',
    questGiverId: 3,
    questSteps: [
      { dialog: ['Hello.', 'Can you retrieve me some banananana?', 'Please banana.'] },
      { dialog: ['Get BANANA'] },
      { dialog: ['Thank for banana.', 'Take big stick.'] },
    ],
    questRequirements: [
      {
        bool: () => {
          return true;
        },
      },
      {
        bool: () => {
          return (
            Object.values(store.getState().player.inventory).filter(
              (item) => item.id === 0 && item.amount > 0
            ).length > 0
          );
        },
      },
      {
        bool: () => {
          return false;
        },
      },
    ],
    playerProgress: 0,
  },
];

const itemList = [
  { id: 0, name: 'Banana', description: 'Banana' },
  { id: 1, name: 'metI', description: 'Test Item 2' },
  { id: 2, name: 'COBWeef', description: 'Beef from a spider cow' },
  { id: 5, name: 'Gold', description: 'Gold Piece' },
];

export { npcList, questList, itemList };
