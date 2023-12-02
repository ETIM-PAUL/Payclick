
    import React, {useState} from "react";
    import MkdSDK from "Utils/MkdSDK";
    import { useForm } from "react-hook-form";
    import { useNavigate } from "react-router-dom";
    import { AuthContext, tokenExpireError } from "Context/Auth";
    import { GlobalContext, showToast } from "Context/Global";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import { getNonNullValue } from "Utils/utils";
    import {PaginationBar} from "Components/PaginationBar";
    import {AddButton} from "Components/AddButton";
    import {MkdListTable}from "Components/MkdListTable";
    import {ExportButton} from "Components/ExportButton";
    import {MkdInput} from "Components/MkdInput";
    import {SkeletonLoader} from "Components/Skeleton"
    import { BiFilterAlt, BiSearch } from "react-icons/bi";
    import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
    import { RiDeleteBin5Line } from "react-icons/ri";
    import TreeSDK from "Utils/TreeSDK";

    let sdk = new MkdSDK();

    const columns = [
  
    
        
        {
            header: 'Id',
            accessor: 'id',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Setting Key',
            accessor: 'setting_key',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Setting Value',
            accessor: 'setting_value',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Create At',
            accessor: 'create_at',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Update At',
            accessor: 'update_at',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
    {
        header: "Action",
        accessor: "",
    },
    ];

    const SettingListPage = () => {
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
      const [openFilter, setOpenFilter] = React.useState(false);
  const [showFilterOptions, setShowFilterOptions] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [filterConditions, setFilterConditions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [optionValue, setOptionValue] = useState("eq");
    const navigate = useNavigate();

    const schema = yup.object({
    
    });


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
  const addFilterCondition = (option, selectedValue, inputValue) => {
    const input =
      selectedValue === "eq" && isNaN(inputValue)
        ? `"${inputValue}"`
        : inputValue;
    const condition = `${option},${selectedValue},${input}`;
    setFilterConditions((prevConditions) => {
      const newConditions = prevConditions.filter(
        (condition) => !condition.includes(option)
      );
      return [...newConditions, condition];
    });
    setSearchValue(inputValue);
  };

  async function getData(pageNum, limitNum, currentTableData) {
    let tdk = new TreeSDK();
    try {
      let sortField = columns.filter((col) => col.isSorted);

      const result = await tdk.getPaginate("setting", {
        // payload: { ...currentTableData },
        page: pageNum,
        size: limitNum,
        order: sortField.length ? sortField[0].accessor : "",
        direction: sortField.length
          ? sortField[0].isSortedDesc
            ? "DESC"
            : "ASC"
          : "",
        filter: [...filterConditions],
      });
      // sdk.setTable("wireframe");
      // const result = await sdk.callRestAPI(
      //   {
      //     payload: { ...currentTableData },
      //     page: pageNum,
      //     limit: limitNum,
      //     sortId: sortField.length ? sortField[0].accessor : "",
      //     direction: sortField.length
      //       ? sortField[0].isSortedDesc
      //         ? "DESC"
      //         : "ASC"
      //       : "",
      //   },
      //   "PAGINATE"
      // );

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

    const deleteItem = async (id) => {
        try {
            sdk.setTable("setting");
            setDeleteLoading(true);
        const result = await sdk.callRestAPI({id}, "DELETE");
        if (!result?.error) {
            const tempData = currentTableData;
            const newData = tempData.filter(x => Number(x.id) !== Number(id))
            if(newData?.length) {
                setCurrentTableData(() => newData);
            } else {
                setCurrentTableData(() => []);
            }
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

    const exportTable = async (id) => {
        try {
        sdk.setTable("notes");
        const result = await sdk.exportCSV();
        } catch (err) {
        throw new Error(err);
        }

    }

    const resetForm = async () => {
        reset();
        await getData(0, pageSize);
    }


    
    React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "wireframe",
      },
    });

    (function () {
      const delay = 700;
      const timeoutId = setTimeout(async () => {
        await getData(1, pageSize);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    })();
  }, [searchValue, filterConditions, optionValue]);


    

    
    return (
        <>
       {!loading? 
       ( <>
  

        <div className="overflow-x-auto  p-5 bg-white shadow rounded">
            <div className="mb-3 text-center justify-between w-full flex  ">
            <h4 className="text-2xl font-medium">Setting</h4>
            <div className="flex">
                <AddButton link={"/admin/add-setting"} />
                <ExportButton onClick={exportTable} className="mx-1" />
            </div>
            </div>
            <MkdListTable
            onSort={onSort}
            columns={columns}
            tableRole={"admin"} 
            table={"setting"}
            actionId={"id"}
            deleteItem={deleteItem}
            loading={loading}
            deleteLoading={deleteLoading}
            showDeleteModal={showDeleteModal}
            currentTableData={currentTableData}
            setShowDeleteModal={setShowDeleteModal}
            setCurrentTableData={setCurrentTableData}
            actions={{ view: true, edit: true, delete: true }}
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
        /> </>): (<SkeletonLoader/>)}
        </>
    );
    };

    export default SettingListPage;

    