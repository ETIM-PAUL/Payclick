import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BoardCardsPage from "./BoardCardsPage";
import { AuthContext, tokenExpireError } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import MkdSDK from "Utils/MkdSDK";

const icons = { 1: "⭕️", 2: "🔆️", 3: "📝", 4: "✅" };

const MkdTrelloColumns = ({ activeBoardId, handleBackButton }) => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [currentTableData, setCurrentTableData] = React.useState([]);
  const [cardLIst, setCardLIst] = React.useState([]);

  async function getData() {
    let sdk = new MkdSDK();
    try {
      const result = await sdk.callRawAPI(
        `/v2/api/lambda/pm/boards/${0}/lists?order_by=id&direction=asc`,
        {},
        "GET"
      );

      const { list } = result;
      let lists = [];
      list.map((item) =>
        lists.push({
          // status: "open",
          status: item.id,
          title: item.name,
          // icon: "⭕️",
          icon: icons[item.id],
          color: "#EB5A46",
          position: item.position,
        })
      );
      setCurrentTableData(lists);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  React.useEffect(() => {
    (async function () {
      await getData();
    })();
  }, []);

  // console.log(currentTableData, "currentTableData");

  return (
    <div>
      {/* <svg
        onClick={handleBackButton}
        className="mb-4"
        fill="#000000"
        width="35px"
        height="35px"
        viewBox="0 0 100 100"
      >
        <g>
          <path
            d="M74.656,56.818c3.895,3.729,5.788,8.795,5.788,15.491c0,1.104,0.896,2,2,2s2-0.885,2-1.989
              c0-7.736-2.362-13.91-7.022-18.369C66.646,43.639,46.325,44.551,30,45.269c-2.28,0.101-4.461,0.211-6.499,0.28L38.428,30.62
              c0.781-0.781,0.781-2.047,0-2.828s-2.048-0.781-2.828,0L17.479,45.915c-0.375,0.375-0.586,0.884-0.586,1.414
              s0.211,1.039,0.586,1.414l18.123,18.12c0.391,0.391,0.902,0.586,1.414,0.586s1.024-0.195,1.415-0.586
              c0.781-0.781,0.781-2.048,0-2.828L24.142,49.75c1.915-0.11,3.932-0.261,6.033-0.354C44.919,48.748,65.114,47.688,74.656,56.818z"
          />
        </g>
      </svg> */}
      <DndProvider backend={HTML5Backend}>
        {/* {cardLIst.length > 0 && ( */}
        <BoardCardsPage
          currentTableData={currentTableData}
          setCurrentTableData={setCurrentTableData}
          // cardLIst={cardLIst}
          getData={getData}
        />
        {/* )} */}
      </DndProvider>
    </div>
  );
};

export default MkdTrelloColumns;

          