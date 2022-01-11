import { store } from '../..';

const npcList = [
  {
    id: 0,
    entityType: 'q',
    name: 'Test_Quest_Giver',
    spawnCoords: [8, 10, 0],
    currentCoords: [8, 10, 0],
    leash: -1,
    health: 1,
    tilePlacedOn: 'q',
  },
];

interface Quests {
  id: number;
  name: string;
  questGiverId: number;
  questSteps: { dialog: string[] }[];
  questRequirements: { bool: () => boolean }[];
  playerProgress: number;
}

const questList: Quests[] = [
  {
    id: 0,
    name: 'First Quest',
    questGiverId: 0,
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
          return true;
        },
      },
    ],
    playerProgress: 0,
  },
  {
    id: 1,
    name: 'test second quest',
    questGiverId: 0,
    questSteps: [{ dialog: ['Oi'] }, { dialog: ['Ooga.. Ooga Booga..'] }],
    questRequirements: [
      {
        bool: () => {
          return questList[0].playerProgress === 3;
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
