import { itemList } from '../../../Entities/Lists';

interface ItemProps {
  id: number;
  amount: number;
  index: string;
}

const ItemComponent = (props: ItemProps) => {
  const item = itemList.filter((items) => {
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

export { ItemComponent };
