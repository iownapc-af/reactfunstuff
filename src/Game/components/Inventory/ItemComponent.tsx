const ItemList = [
  { id: 0, name: 'Item', description: 'Test Item 1' },
  { id: 1, name: 'metI', description: 'Test Item 2' },
  { id: 2, name: 'COBWeef', description: 'Beef from a spider cow' },
  { id: 5, name: 'Gold', description: 'Gold Piece' },
];

interface ItemProps {
  id: number;
  amount: number;
  index: string;
}

const ItemComponent = (props: ItemProps) => {
  const item = ItemList.filter((items) => {
    return props.id === items.id;
  });

  return (
    <button className="item" id={`${props.index}`} key={item[0].name} type="button">
      <div className="item-name">{item[0].name}</div>
      <div className="item-desc">{item[0].description}</div>
      <div className="item-count">{props.amount}</div>
    </button>
  );
};

export { ItemComponent, ItemList };
