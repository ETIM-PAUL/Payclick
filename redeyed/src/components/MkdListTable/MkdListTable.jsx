import React from "react";
import ModalPrompt from "Components/Modal/ModalPrompt";
import { useNavigate } from "react-router-dom";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { capitalize } from "Utils/utils";
import { Spinner } from "Assets/svgs";
import { colors } from "Utils/config";

const MkdListTable = ({
  table,
  onSort,
  loading,
  columns,
  actions,
  tableRole,
  deleteItem,
  deleteLoading,
  actionId = "id",
  showDeleteModal,
  currentTableData,
  setShowDeleteModal,
  handleTableCellChange,
}) => {
  const [deleteId, setIdToDelete] = React.useState(null);
  const [isOneOrMoreRowSelected, setIsOneOrMoreRowSelected] =
    React.useState(false);
  const [areAllRowsSelected, setAreAllRowsSelected] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);

  function handleSelectRow(id) {
    setIsOneOrMoreRowSelected(true);
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
    console.log(id);
  }

  const handleSelectAll = () => {
    setAreAllRowsSelected((prevSelectAll) => !prevSelectAll);
    if (!areAllRowsSelected) {
      const allIds = currentTableData.map((item) => item[actionId]);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteAll = async (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  };

  const navigate = useNavigate();

  const setDeleteId = async (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  };

  // React.useEffect(() => {
  // console.log("isOneOrMoreRowSelected");
  // console.log(isOneOrMoreRowSelected);
  // console.log("areAllRowsSelected");
  // console.log(areAllRowsSelected);
  // console.log("selectedIds");
  // console.log(selectedIds);
  // });
  React.useEffect(() => {
    if (selectedIds.length <= 0) {
      setIsOneOrMoreRowSelected(false);
      setAreAllRowsSelected(false);
    }
    if (selectedIds.length === currentTableData.length) {
      setAreAllRowsSelected(true);
      setIsOneOrMoreRowSelected(true);
    }
    if (
      selectedIds.length < currentTableData.length &&
      selectedIds.length > 0
    ) {
      setAreAllRowsSelected(false);
    }
  }, [selectedIds, currentTableData]);
  //  console.log("currentTableData")
  //  console.log(currentTableData)
  //  console.log("columns")
  //  console.log(columns)
  return (
    <>
      <div
        className={`${
    loading ? "" : "overflow-x-auto"
  } border-b border-gray-200 shadow`}
      >
        {loading ? (
          <div
            className={`flex max-h-fit min-h-fit min-w-fit max-w-full items-center justify-center  py-5`}
          >
            <Spinner size={50} color={colors.primary} />
          </div>
        ) : (
          <>
            {/* <div
              className="flex items-center space-x-3 border bg-gray-300 p-3 transition-all"
              style={{
                transform: isOneOrMoreRowSelected
                  ? "translateX(0)"
                  : "translateX(-100%)",
                visibility: isOneOrMoreRowSelected ? "visible" : "hidden",
              }}
            >
              <div className="mr-3 flex flex-col items-center justify-center">
                <input
                  type="checkbox"
                  id="select_all_rows"
                  checked={areAllRowsSelected}
                  onChange={handleSelectAll}
                />
                <label for="select_all_rows">Select All</label>
              </div>
              <TrashIcon
                className={`h-[1rem] w-[1rem] cursor-pointer text-red-500 group-hover: text-white`}
                onClick={() => handleDeleteAll(selectedIds)}
              />
            </div> */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, i) => {
                    if (column?.accessor === "") {
                      if (
                        [
                          actions?.select,
                          actions?.view,
                          actions?.edit,
                          actions?.delete,
                        ].includes(true)
                      ) {
                        return (
                          <th
                            key={i}
                            scope="col"
                            className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${
    column.isSorted ? "cursor-pointer" : ""
  } `}
                            onClick={
                              column.isSorted ? () => onSort(i) : undefined
                            }
                          >
                            {column.header === "Action" ? (
                              <input
                                type="checkbox"
                                id="select_all_rows"
                                className="mr-3"
                                checked={areAllRowsSelected}
                                onChange={handleSelectAll}
                              />
                            ) : null}
                            {column.header}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " ▼"
                                  : " ▲"
                                : ""}
                            </span>
                          </th>
                        );
                      }
                    } else {
                      return (
                        <th
                          key={i}
                          scope="col"
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${
    column.isSorted ? "cursor-pointer" : ""
  } `}
                          onClick={
                            column.isSorted ? () => onSort(i) : undefined
                          }
                        >
                          {column.header === "Action" ? (
                            <input
                              type="checkbox"
                              id="select_all_rows"
                              className="mr-3"
                              checked={areAllRowsSelected}
                              onChange={handleSelectAll}
                            />
                          ) : null}
                          {column.header}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      );
                    }
                    return null;
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentTableData.map((row, i) => {
                  return (
                    <tr key={i}>
                      {columns.map((cell, index) => {
                        if (cell.accessor.indexOf("image") > -1) {
                          return (
                            <td
                              key={index}
                              className="whitespace-nowrap px-6 py-4"
                            >
                              <img
                                src={row[cell.accessor]}
                                className="h-[100px] w-[150px]"
                                alt=""
                              />
                            </td>
                          );
                        }
                        if (
                          cell.accessor.indexOf("pdf") > -1 ||
                          cell.accessor.indexOf("doc") > -1 ||
                          cell.accessor.indexOf("file") > -1 ||
                          cell.accessor.indexOf("video") > -1
                        ) {
                          return (
                            <td
                              key={index}
                              className="whitespace-nowrap px-6 py-4"
                            >
                              <a
                                className="text-blue-500"
                                target="_blank"
                                href={row[cell.accessor]}
                                rel="noreferrer"
                              >
                                {" "}
                                View
                              </a>
                            </td>
                          );
                        }
                        if (cell.accessor === "") {
                          if (
                            [
                              actions?.select,
                              actions?.view,
                              actions?.edit,
                              actions?.delete,
                            ].includes(true)
                          ) {
                            return (
                              <td
                                key={index}
                                className="flex gap-2 whitespace-nowrap px-6 py-4"
                              >
                                {actions?.select && (
                                  <span>
                                    <input
                                      className="mr-1"
                                      type="checkbox"
                                      name="select_item"
                                      checked={selectedIds.includes(
                                        row[actionId]
                                      )}
                                      onChange={() =>
                                        handleSelectRow(row[actionId])
                                      }
                                    />
                                  </span>
                                )}
                                {actions?.edit && (
                                  <button
                                    className="text-xs text-[#292829fd] font-medium cursor-pointer hover:underline"
                                    onClick={() => {
                                      navigate(
                                       `/ ${ tableRole } /edit-${table}/` +
                                          row[actionId],
                                        {
                                          state: row,
                                        }
                                      );
                                    }}
                                  >
                                    {/* <PencilIcon
                                      className={`h-[1rem] w-[1rem] cursor-pointer group-hover: text-white`}
                                      stroke={"#29282990"}
                                    /> */}
                                    <span>Edit</span>
                                  </button>
                                )}
                                {actions?.view && (
                                  <button
                                    className="px-1 text-xs text-blue-500 font-medium cursor-pointer hover:underline"
                                    onClick={() => {
                                      navigate(
                                        `/ ${ tableRole } /view-${table}/` +
                                          row[actionId],
                                        {
                                          state: row,
                                        }
                                      );
                                    }}
                                  >
                                    {/* <EyeIcon
                                      className={`h-[1rem] w-[1rem] cursor-pointer group-hover: text-white`}
                                    /> */}
                                    <span>View</span>
                                  </button>
                                )}
                                {actions?.delete && (
                                  <button
                                    className="px-1 text-xs text-red-500 font-medium cursor-pointer hover:underline"
                                    onClick={() => setDeleteId(row[actionId])}
                                  >
                                    {/* <TrashIcon
                                      className={`h-[1rem] w-[1rem] cursor-pointer group-hover: text-white`}
                                    /> */}
                                    <span>Delete</span>
                                  </button>
                                )}
                              </td>
                            );
                          } else {
                            return null;
                          }
                        }
                        if (cell.mappingExist) {
                          return (
                            <td
                              key={index}
                              className="whitespace-nowrap px-6 py-4"
                            >
                              <select
                                onChange={(e) =>
                                  handleTableCellChange(
                                    row[actionId],
                                    e.target.value,
                                    i,
                                    cell.accessor
                                  )
                                }
                              >
                                {Object.keys(cell.mappings).map(
                                  (cellDataKey, index) => (
                                    <option
                                      key={index}
                                      value={cellDataKey}
                                      selected={
                                        cellDataKey === row[cell.accessor]
                                      }
                                    >
                                      {cell.mappings[cellDataKey]}
                                    </option>
                                  )
                                )}
                              </select>
                              {/* {cell.mappings[row[cell.accessor]]} */}
                            </td>
                          );
                        }
                        if (
                          !cell.mappingExist &&
                          cell.accessor !== "id" &&
                          cell.accessor !== "create_at" &&
                          cell.accessor !== "update_at" &&
                          cell.accessor !== "user_id"
                        ) {
                          return (
                            <td
                              key={index}
                              className="whitespace-nowrap px-6 py-4"
                            >
                              <input
                                className="border-0"
                                type="text"
                                value={row[cell.accessor]}
                                onChange={(e) =>
                                  handleTableCellChange(
                                    row[actionId],
                                    e.target.value,
                                    i,
                                    cell.accessor
                                  )
                                }
                              />
                            </td>
                          );
                        }
                        return (
                          <td
                            key={index}
                            className="whitespace-nowrap px-6 py-4"
                          >
                            {row[cell.accessor]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      {showDeleteModal ? (
        <ModalPrompt
          actionHandler={() => {
            deleteItem(deleteId);
          }}
          closeModalFunction={() => {
            setIdToDelete(null);
            setShowDeleteModal(false);
          }}
          title={`Delete ${ capitalize(table) } `}
          message={`You are about to delete ${
    capitalize(
      table
    )
  } ${ deleteId }, note that this action is irreversible`}
          acceptText={`DELETE`}
          rejectText={`CANCEL`}
          loading={deleteLoading}
        />
      ) : null}
    </>
  );
};

export default MkdListTable;
