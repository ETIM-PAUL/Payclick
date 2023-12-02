import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { AuthContext, tokenExpireError } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import MkdSDK from "Utils/MkdSDK";
import LIstItems from "./LIstItems";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const ItemTypes = {
  CARD: "card",
};
const icons = { 1: "⭕️", 2: "🔆️", 3: "📝", 4: "✅" };

const Lists = ({
  list,
  cardLIst,
  getData,
  statuses,
  items,
  setItems,
  moveList,
  setCurrentTableData,
  id,
  index,
}) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [cardItems, setCardItems] = React.useState([]);

  const ref = React.useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      console.log(item, monitor, "monitor");
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      console.log(dragIndex, hoverIndex);
      moveList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const getCardsByList = async () => {
    let sdk = new MkdSDK();
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/lists/${list?.status}/cards`,
        {},
        "GET"
      );
      let cardsList = [];
      result.list.map((item) =>
        cardsList.push({
          id: item.id,
          icon: icons[item.list_id],
          // status: "open",
          status: item.list_id,
          title: "Human Interest Form",
          content: item.name,
        })
      );
      setCardItems(cardsList);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  };

  // console.log(cardLIst, items, s);

  React.useEffect(() => {
    // setItems(cardLIst);
    // console.log(cardLIst, items);
    (async function () {
      await getCardsByList();
    })();
  }, [list?.status]);

  return (
    <div
      className=""
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
    >
      <LIstItems
        list={list}
        cardItems={cardItems}
        getData={getData}
        items={items}
        setCurrentTableData={setCurrentTableData}
        setItems={setItems}
        statuses={statuses}
      />
    </div>
  );
};

export default Lists;

          