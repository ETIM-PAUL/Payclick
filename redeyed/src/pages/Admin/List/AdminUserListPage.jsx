
import React from "react";
import { AuthContext, tokenExpireError } from "Context/Auth";
import MkdSDK from "Utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "Context/Global";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getNonNullValue } from "Utils/utils";
import {PaginationBar} from "Components/PaginationBar";
import {AddButton} from "Components/AddButton";

let sdk = new MkdSDK();

const columns = [
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Role",
    accessor: "role",
  },
  {
    header: "Status",
    accessor: "status",
    mapping: ["Inactive", "Active", "Suspend"],
  },
  {
    header: "Action",
    accessor: "",
  },
];
const AdminUserListPage = () => {
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const { dispatch } = React.useContext(AuthContext);
  const [query, setQuery] = React.useState("");
  const [data, setCurrentTableData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageCount, setPageCount] = React.useState(0);
  const [dataTotal, setDataTotal] = React.useState(0);
  const [currentPage, setPage] = React.useState(0);
  const [canPreviousPage, setCanPreviousPage] = React.useState(false);
  const [canNextPage, setCanNextPage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const schema = yup.object({
    id: yup.string(),
    email: yup.string(),
    role: yup.string(),
    status: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectRole = ["", "client",
"admin",
"public",];
  const selectStatus = [
    { key: "", value: "All" },
    { key: "0", value: "Inactive" },
    { key: "1", value: "Active" },
    { key: "2", value: "Suspend" },
  ];

  function updatePageSize(limit) {
    (async function () {
      setPageSize(limit);
      await getData(0, limit);
    })();
  }
  function previousPage() {
    (async function () {
      await getData(currentPage - 1 > 0 ? currentPage - 1 : 0, pageSize);
    })();
  }

  function nextPage() {
    (async function () {
      await getData(currentPage + 1 <= pageCount ? currentPage + 1 : 0, pageSize);
    })();
  }

  async function getData(pageNum, limitNum, data) {
    setLoading(true);
    try {
      sdk.setTable("user");
      const result = await sdk.callRestAPI(
        {
          payload: {
            ...data,
          },
          page: pageNum,
          limit: limitNum,
        },
        "PAGINATE"
      );
      if (result) {
        setLoading(false);
      }
      const { list, total, limit, num_pages, page } = result;

      setCurrentTableData(list);
      setPageSize(limit);
      setPageCount(num_pages);
      setPage(page);
      setDataTotal(total);
      setCanPreviousPage(page > 1);
      setCanNextPage(page + 1 <= num_pages);
    } catch (error) {
      setLoading(false);
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  const onSubmit = (data) => {
    const email = getNonNullValue(data.email);
    const role = getNonNullValue(data.role);
    const status = getNonNullValue(data.status);
    const id = getNonNullValue(data.id);
    getData(0, pageSize, { email, role, status, id });
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "users",
      },
    });

    (async function () {
      await getData(0, pageSize);
    })();
  }, []);

  return (
    <>
      <form className="p-5 bg-white shadow rounded mb-10" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-2xl font-medium">Search</h4>
        <div className="filter-form-holder mt-10 flex flex-wrap">
          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">ID</label>
            <input
              type="text"
              placeholder="ID"
              {...register("id")}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-500 text-xs italic">{errors.id?.message}</p>
          </div>
          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="email"
              {...register("email")}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
          </div>

          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("role")}
            >
              {selectRole.map((option) => (
                <option name="role" value={option} key={option} defaultValue="">
                  {option}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-xs italic"></p>
          </div>

          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register("status")}
            >
              {selectStatus.map((option) => (
                <option name="status" value={option.key} key={option.key} defaultValue="">
                  {option.value}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-xs italic"></p>
          </div>
        </div>
        <button
          type="submit"
          className="block ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto  p-5 bg-white shadow rounded">
        <div className="mb-3 text-center justify-between w-full flex  ">
          <h4 className="text-2xl font-medium">Users </h4>
          <AddButton link={"/admin/add-user"} />
        </div>
        <div className="shadow overflow-x-auto border-b border-gray-200 ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.header}
                    <span>{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, i) => {
                return (
                  <tr key={i}>
                    {columns.map((cell, index) => {
                      if (cell.accessor == "") {
                        return (
                          <td key={index} className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => {
                                navigate("/admin/edit-user/" + row.id, {
                                  state: row,
                                });
                              }}
                            >
                              {" "}
                              Edit
                            </button>
                          </td>
                        );
                      }
                      if (cell.mapping) {
                        return (
                          <td key={index} className="px-6 py-4 whitespace-nowrap">
                            {cell.mapping[row[cell.accessor]]}
                          </td>
                        );
                      }
                      return (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          {row[cell.accessor]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading && (
            <>
              <p className=" capitalize px-10 py-3 text-xl ">Loading...</p>
            </>
          )}
          {!loading && data.length === 0 && (
            <>
              <p className=" capitalize px-10 py-3 text-xl ">You Don't have any User</p>
            </>
          )}
        </div>
      </div>
      <PaginationBar
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        updatePageSize={updatePageSize}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
};

export default AdminUserListPage;
