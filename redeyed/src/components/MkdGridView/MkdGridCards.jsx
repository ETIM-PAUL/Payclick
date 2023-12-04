import React from "react";
import ModalPrompt from "Components/Modal/ModalPrompt";
import { useNavigate } from "react-router-dom";
import { capitalize } from "Utils/utils";
import { Spinner } from "Assets/svgs";
import { colors } from "Utils/config";
import MkdGridCard from "./MkdGridCard";

const MkdGridCards = ({
  table,
  onSort,
  getData,
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
}) => {
  const [deleteId, setIdToDelete] = React.useState(null);

  const navigate = useNavigate();

  const setDeleteId = async (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  };

  return (
    <>
      <div className={`${loading ? "" : ""} border-b border-gray-200 shadow`}>
        {loading ? (
          <div
            className={`flex max-h-fit min-h-fit w-full min-w-full max-w-full items-center justify-center py-5`}
          >
            <Spinner size={50} color={colors.primary} />
          </div>
        ) : (
          <div className="min-w-full">
            <div className="grid grid-cols-3 gap-5 bg-white">
              {currentTableData.map((row, i) => {
                return (
                  <MkdGridCard
                    key={i}
                    actionId={actionId}
                    actions={actions}
                    columns={columns}
                    getData={getData}
                    row={row}
                    setDeleteId={setDeleteId}
                    table={table}
                    tableRole={tableRole}
                  />
                );
              })}
            </div>
          </div>
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
          title={`Delete ${capitalize(table)}`}
          message={`You are about to delete ${capitalize(
            table
          )} ${deleteId}, note that this action is irreversible`}
          acceptText={`DELETE`}
          rejectText={`CANCEL`}
          loading={deleteLoading}
        />
      ) : null}
    </>
  );
};

export default MkdGridCards;
