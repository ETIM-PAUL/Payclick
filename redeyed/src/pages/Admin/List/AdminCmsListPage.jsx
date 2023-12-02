
import React from "react";
import { AuthContext } from "Context/Auth";
import MkdSDK from "Utils/MkdSDK";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "Context/Global";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getNonNullValue } from "Utils/utils";
import {PaginationBar} from "Components/PaginationBar";
import {AddButton} from "Components/AddButton";

let sdk = new MkdSDK();

const columns = [
  {
    header: "Action",
    accessor: "",
  },
  {
    header: "Page",
    accessor: "page",
  },
  {
    header: "Identifier",
    accessor: "content_key",
  },
  {
    header: "Content Type",
    accessor: "content_type",
  },

 
];

const AdminCmsListPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const [query, setQuery] = React.useState("");
  const [data, setCurrentTableData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(3);
  const [pageCount, setPageCount] = React.useState(0);
  const [dataTotal, setDataTotal] = React.useState(0);
  const [currentPage, setPage] = React.useState(0);
  const [canPreviousPage, setCanPreviousPage] = React.useState(false);
  const [canNextPage, setCanNextPage] = React.useState(false);
  const navigate = useNavigate();

  const schema = yup.object({
    page: yup.string(),
    key: yup.string(),
    type: yup.string(),
  });

  const selectType = [
    { key: "", value: "All" },
    { key: "text", value: "Text" },
    { key: "image", value: "Image" },
    { key: "number", value: "Number" },
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    try {
      sdk.setTable("cms");
      const result = await sdk.callRestAPI(
        {
          payload: { ...data },
          page: pageNum,
          limit: limitNum,
        },
        "PAGINATE"
      );

      const { list, total, limit, num_pages, page } = result;

      setCurrentTableData(list);
      setPageSize(limit);
      setPageCount(num_pages);
      setPage(page);
      setDataTotal(total);
      setCanPreviousPage(page > 1);
      setCanNextPage(page + 1 <= num_pages);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  const onSubmit = (data) => {
    let page = getNonNullValue(data.page);
    let key = getNonNullValue(data.key);
    let type = getNonNullValue(data.type);
    let filter = { page, content_key: key, content_type: type };
    getData(0, 10, filter);
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "cms",
      },
    });

    (async function () {
      await getData(0, 10);
    })();
  }, []);

  return (
    <>
      <form className="p-5 bg-white shadow rounded mb-10" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-2xl font-medium">CMS Search</h4>
        <div className="filter-form-holder mt-10 flex flex-wrap">
          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Page</label>
            <input
              type="text"
              placeholder="Page"
              {...register("page")}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-500 text-xs italic">{errors.page?.message}</p>
          </div>
          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Identifier</label>
            <input
              type="text"
              placeholder="Identifier"
              {...register("key")}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-500 text-xs italic">{errors.key?.message}</p>
          </div>

          <div className="mb-4 w-full md:w-1/2 pr-2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Content Type</label>
            <select className="shadow border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" {...register("type")}>
              {selectType.map((option) => (
                <option name="type" value={option.key} key={option.key} defaultValue="">
                  {option.value}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-xs italic"></p>
          </div>
        </div>

        <button type="submit" className=" block ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Search
        </button>
      </form>

      <div className="overflow-x-auto  p-5 bg-white shadow rounded">
        <div className="mb-3 text-center justify-between w-full flex  ">
          <h4 className="text-2xl font-medium">CMS </h4>
          <AddButton link={"/admin/add-cms"} />
        </div>
        <div className="shadow overflow-x-auto border-b border-gray-200 ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, i) => (
                  <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                              className="text-xs"
                              onClick={() => {
                                navigate("/admin/edit-cms/" + row.id, {
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

export default AdminCmsListPage;
