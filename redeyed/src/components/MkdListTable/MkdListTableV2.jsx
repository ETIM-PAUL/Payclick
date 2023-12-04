
  import React from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import MkdSDK from "Utils/MkdSDK";
  import { getNonNullValue } from "Utils/utils";
  import {PaginationBar} from "Components/PaginationBar";
  import { AuthContext, tokenExpireError } from "Context/Auth";
  import { GlobalContext } from "Context/Global";
  import { MkdListTable } from "Components/MkdListTable";
  import { MkdInput } from "Components/MkdInput";
  
  let sdk = new MkdSDK();
  // const getSchemaStructure = (schema) => {
  //   return;
  // };
  const getType = (type) => {
    switch (type) {
      case "varchar":
        return "text";
      case "text":
        return "textarea";
      case "mediumtext":
        return "textarea";
      case "longtext":
        return "textarea";
      case "tinyint":
        return "number";
      case "int":
        return "number";
      case "bigint":
        return "number";
      case "float":
        return "number";
      case "double":
        return "number";
      case "image":
        return "image";
      case "file":
        return "file";
      case "date":
        return "date";
      case "datetime":
        return "datetime";
      default:
        return "text";
    }
  };
  
  const MkdListTableV2 = ({
    columns = [],
    actions = { select: true, view: true, edit: true, delete: true },
    actionId = "id",
    tableRole = "admin",
    table = "user",
    tableSchema = [],
    hasFilter = true,
    schemaFields = [],
  }) => {
    const { dispatch } = React.useContext(AuthContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  
    const [query, setQuery] = React.useState("");
    const [currentTableData, setCurrentTableData] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageCount, setPageCount] = React.useState(0);
    const [dataTotal, setDataTotal] = React.useState(0);
    const [currentPage, setPage] = React.useState(0);
    const [canPreviousPage, setCanPreviousPage] = React.useState(false);
    const [canNextPage, setCanNextPage] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
  
    const schema = yup.object({});
  
    const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    function onSort(columnIndex) {
      console.log(columns[columnIndex]);
      if (columns[columnIndex].isSorted) {
        columns[columnIndex].isSortedDesc = !columns[columnIndex].isSortedDesc;
      } else {
        columns.map((i) => (i.isSorted = false));
        columns.map((i) => (i.isSortedDesc = false));
        columns[columnIndex].isSorted = true;
      }
  
      (async function () {
        await getData(0, pageSize);
      })();
    }
  
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
        await getData(
          currentPage + 1 <= pageCount ? currentPage + 1 : 0,
          pageSize
        );
      })();
    }
  
    async function getData(pageNum, limitNum, currentTableData) {
      try {
        // sdk.setTable("nanny_profile");
        // let sortField = columns.filter(col => col.isSorted);
        setLoading(true);
        sdk.setTable(table);
        const result = await sdk.callRestAPI(
          {
            payload: {
              ...currentTableData,
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("ERROR", error);
        tokenExpireError(dispatch, error.message);
      }
    }
  
    const deleteItem = async (id) => {
  
      async function deleteId(id){
        try {
          setDeleteLoading(true);
          sdk.setTable(table);
          const result = await sdk.callRestAPI({ id }, "DELETE");
          if (!result?.error) {
            setCurrentTableData((list) =>
              list.filter((x) => Number(x.user_id) !== Number(id))
            );
            setDeleteLoading(false);
            setShowDeleteModal(false);
          }
        } catch (err) {
          setDeleteLoading(false);
          setShowDeleteModal(false);
          tokenExpireError(dispatch, err?.message);
          throw new Error(err);
        }
      }
  
      
      if(typeof id === 'object'){
        id.forEach(async (idToDelete) =>{
          await deleteId(idToDelete)
        })
      }
      else if(typeof id === 'number'){
        await deleteId(id)
      }
    };
  
    const exportTable = async (id) => {
      try {
        sdk.setTable(table);
        const result = await sdk.exportCSV();
      } catch (err) {
        throw new Error(err);
      }
    };
  
    const resetForm = async () => {
      reset();
      await getData(0, pageSize);
    };
  
    const onSubmit = (_data) => {
      let filter = {};
      for (const field of schemaFields) {
        const [key] = field.split(":");
        filter[key] = getNonNullValue(_data[key]);
      }
      getData(1, pageSize, filter);
    };
  
    React.useEffect(() => {
      // globalDispatch({
      //   type: "SETPATH",
      //   payload: {
      //     path: "nanny_profile",
      //   },
      // });
  
      (async function () {
        await getData(1, pageSize);
      })();
    }, []);
  
    return (
      <>
        {hasFilter ? (
          <form
            className="mb-10 rounded bg-white p-5 shadow"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4 className="text-2xl font-medium capitalize">{table} Search</h4>
            <div className="filter-form-holder mt-10 flex w-full flex-wrap gap-5">
              {tableSchema && tableSchema.length
                ? tableSchema
                    .map((item, itemKey) => {
                      if (item.is_filter) {
                        if (Object.keys(item.mapping).length) {
                          return (
                            <div key={itemKey + 1} className="w-full md:w-[25%_!important]" >
                              <MkdInput
                                className={""}
                                errors={errors}
                                label={item.name}
                                name={item.name}
                                placeholder={item.name}
                                type={`mapping`}
                                mapping={item.mapping}
                                options={[...Object.keys(item.mapping)]}
                                register={register}
                                page={""}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={itemKey + 1} className="w-full md:w-[25%_!important]" >
                              <MkdInput
                                className={""}
                                errors={errors}
                                label={item.name}
                                name={item.name}
                                placeholder={item.name}
                                type={getType(item.type)}
                                register={register}
                                page={""}
                              />
                            </div>
                          );
                        }
                      }
                    })
                    .filter(Boolean)
                : null}
            </div>
            <button
              type="submit"
              className=" focus:shadow-outline ml-2 inline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Search
            </button>
  
            <button
              onClick={() => {
                resetForm();
              }}
              type="button"
              className=" focus:shadow-outline ml-2 inline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
            >
              Clear
            </button>
          </form>
        ) : null}
  
        <div className="overflow-x-auto  rounded bg-white p-5 shadow">
          <div className="mb-3 flex w-full justify-between text-center  ">
            <h4 className="text-2xl font-medium capitalize">{table} Profile</h4>
            <div className="flex">
              {/* <AddButton link={"/admin/add-nanny_profile"} />
              <ExportButton onClick={exportTable} className="mx-1" /> */}
            </div>
          </div>
          <MkdListTable
            onSort={onSort}
            columns={columns}
            tableRole={tableRole}
            actionId={actionId}
            table={table}
            deleteItem={deleteItem}
            loading={loading}
            deleteLoading={deleteLoading}
            showDeleteModal={showDeleteModal}
            currentTableData={currentTableData}
            setShowDeleteModal={setShowDeleteModal}
            setCurrentTableData={setCurrentTableData}
            actions={actions}
          />
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
  
  export default MkdListTableV2;