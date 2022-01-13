import {
  questCheckPlayerInventory,
  questPlaceItemsOnMap,
  questSetProgression,
} from '../systems/QuestFunctions';

interface Npc {
  id: number;
  entityType: string;
  name: string;
  spawnCoords: number[];
  currentCoords: number[];
  leash: number;
  health: number;
  tilePlacedOn: string;
}

interface Dialog {
  // id: number;
  // questId: number;
  dialog: string[];
  dialogStep: number;
}

interface Quests {
  id: number;
  name: string;
  questGiverId: number;
  questSteps: Dialog[];
  questRequirements: { progressionEligible: () => boolean }[];
  playerProgress: number;
}

const npcList: Npc[] = [
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
  {
    id: 1,
    entityType: 'q',
    name: 'Dad?',
    spawnCoords: [6, 4, 0],
    currentCoords: [6, 4, 0],
    leash: -1,
    health: 1,
    tilePlacedOn: 'q',
  },
];

const questList: Quests[] = [
  {
    id: 0,
    name: 'First Quest',
    questGiverId: 0,
    questSteps: [
      {
        dialog: ['Hello.', 'Can you retrieve me some banananana?', 'Please banana.'],
        dialogStep: 0,
      },
      { dialog: ['Get BANANA'], dialogStep: 0 },
      { dialog: ['Thank for banana.', 'Take big stick.'], dialogStep: 0 },
    ],
    questRequirements: [
      {
        progressionEligible: () => {
          questPlaceItemsOnMap(0);
          return true;
        },
      },
      {
        progressionEligible: () => {
          if (questCheckPlayerInventory(0, 1)) questSetProgression(0);
          return questCheckPlayerInventory(0, 1);
        },
      },
      {
        progressionEligible: () => {
          return true;
        },
      },
    ],
    playerProgress: 0,
  },
  {
    id: 1,
    name: 'test second quest',
    questGiverId: 1,
    questSteps: [
      { dialog: ['Oi'], dialogStep: 0 },
      {
        dialog: [
          'Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..Ooga.. Ooga Booga..',
        ],
        dialogStep: 0,
      },
    ],
    questRequirements: [
      {
        progressionEligible: () => {
          // return questList[0].playerProgress === 3;
          return true;
        },
      },
      {
        progressionEligible: () => {
          return false;
        },
      },
    ],
    playerProgress: 0,
  },
  {
    id: 2,
    name: 'Two Quests From The SAME GUY',
    questGiverId: 0,
    questSteps: [
      { dialog: ['My second quest for you is...', 'Go away.'], dialogStep: 0 },
      { dialog: ['Ooga.. Ooga Booga..'], dialogStep: 0 },
    ],
    questRequirements: [
      {
        progressionEligible: () => {
          return questList[0].playerProgress === 3;
        },
      },
      {
        progressionEligible: () => {
          return false;
        },
      },
    ],
    playerProgress: 0,
  },
];

const itemList = [
  { id: 0, name: 'Banana', description: 'Banana', tileCharacter: 'B' },
  { id: 1, name: 'metI', description: 'Test Item 2', tileCharacter: '' },
  { id: 2, name: 'COBWeef', description: 'Beef from a spider cow', tileCharacter: '' },
  { id: 5, name: 'Gold', description: 'Gold Piece', tileCharacter: '' },
];

const groundItemsList = [
  { id: 0, itemId: 0, stackSize: 1, coord: [8, 12, 0], placedOnTile: 'e' },
  { id: 1, itemId: 5, stackSize: 5, coord: [22, 23, 0], placedOnTile: 'e' },
];

const Doors = [
  {
    currentCoords: '5,8,0',
    newPlayerCoords: [7, 6],
    newRoomIndex: 1,
  },
  {
    currentCoords: '23,25,0',
    newPlayerCoords: [3, 3],
    newRoomIndex: 2,
  },
  {
    currentCoords: '5,7,1',
    newPlayerCoords: [8, 6],
    newRoomIndex: 0,
  },
  {
    currentCoords: '8,8,2',
    newPlayerCoords: [22, 25],
    newRoomIndex: 0,
  },
];

export { npcList, questList, itemList, groundItemsList, Doors };
export type { Dialog, Quests };
