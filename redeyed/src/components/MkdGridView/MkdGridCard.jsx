import React from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
// import { capitalize } from "Utils/utils";
// import { colors } from "Utils/config";
// import MkdSDK from "Utils/MkdSDK";
// import { Spinner } from "Assets/svgs";
// import { AuthContext, tokenExpireError } from "Src/authContext";
// import { GlobalContext, showToast } from "Src/globalContext";

const MkdGridCard = ({
  columns,
  row,
  actions,
  tableRole,
  table,
  actionId,
  setDeleteId,
  getData,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`group relative h-fit min-h-[9.375rem] truncate rounded-[.625rem] bg-white p-5 shadow-md`}
      >
        {columns.map((cell, colKey) => {
          if (
            cell?.accessor.indexOf("image") > -1 ||
            cell?.accessor.indexOf("photo") > -1
          ) {
            return (
              <div
                key={colKey}
                className="flex items-center justify-start gap-2"
              >
                <div className="capitalize">{cell?.header}:</div>
                <div className="whitespace-nowrap px-6 py-4 text-[1.5rem]">
                  <img
                    src={row[cell?.accessor]}
                    className="h-[100px] w-[150px]"
                    alt=""
                  />
                </div>
              </div>
            );
          }
          if (
            cell?.accessor.indexOf("pdf") > -1 ||
            cell?.accessor.indexOf("doc") > -1 ||
            cell?.accessor.indexOf("file") > -1 ||
            cell?.accessor.indexOf("video") > -1
          ) {
            return (
              <div
                key={colKey}
                className="flex items-center justify-start gap-2"
              >
                <div className="capitalize">{cell?.header}:</div>
                <div className="whitespace-nowrap px-6 py-4 text-[1.5rem]">
                  <a
                    className="text-blue-500"
                    target="_blank"
                    href={row[cell?.accessor]}
                    rel="noreferrer"
                  >
                    {" "}
                    View
                  </a>
                </div>
              </div>
            );
          }
          if (cell?.accessor === "") {
            if (
              [actions?.view, actions?.edit, actions?.delete].includes(true)
            ) {
              return (
                <div
                  key={colKey}
                  className={`absolute right-0 top-[-100%] m-auto flex gap-2 whitespace-nowrap bg-white px-6 py-4 transition-all group-hover:top-0`}
                >
                  {actions?.edit && (
                    <button
                      className="text-xs"
                      onClick={() => {
                        navigate(
                          `/${tableRole}/edit-${table}/` + row[actionId],
                          {
                            state: row,
                          }
                        );
                      }}
                    >
                      {" "}
                      <PencilIcon
                        title={`Edit ${table} details`}
                        className={`h-[1rem] w-[1rem] cursor-pointer `}
                        pathClasses={` text-black`}
                        stroke={"#29282990"}
                      />
                    </button>
                  )}
                  {actions?.view && (
                    <button
                      className="px-1 text-xs text-blue-500"
                      onClick={() => {
                        navigate(
                          `/${tableRole}/view-${table}/` + row[actionId],
                          {
                            state: row,
                          }
                        );
                      }}
                    >
                      {" "}
                      <EyeIcon
                        title={`View ${table} details`}
                        className={`h-[1rem] w-[1rem] cursor-pointer `}
                      />
                    </button>
                  )}
                 
                  {actions?.delete && (
                    <button
                      className="px-1 text-xs text-red-500"
                      onClick={() => setDeleteId(row[actionId])}
                    >
                      {" "}
                      <TrashIcon
                        title={`Delete ${table}`}
                        className={`h-[1rem] w-[1rem] cursor-pointer `}
                      />
                    </button>
                  )}
                </div>
              );
            } else {
              return null;
            }
          }
          if (cell?.mappingExist) {
            return (
              <div
                key={colKey}
                className="flex items-center justify-start gap-2"
              >
                <div className="capitalize">{cell?.header}:</div>
                <div className="whitespace-nowrap px-6 py-4 text-sm">
                  {cell?.mappings[row[cell?.accessor]]}
                </div>
              </div>
            );
          }
          return (
            <div key={colKey} className="flex items-center justify-start gap-2">
              <div className="capitalize">{cell?.header}:</div>
              <div className="whitespace-nowrap px-6 py-4 text-sm">
                {row[cell?.accessor]}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MkdGridCard;
