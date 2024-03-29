import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index";
import { toast } from "react-toastify";
import Table from "./Table";
import SearchBar from "./SearchBar";
import Page from "./page";
import DeleteButton from "./delete";
import EditData from "./editdata";
import AddData from "./addData";

const URL =
  "https://dataplant-assessment.onrender.com";

const Interface = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setfilterUsers] = useState([]);
  const [page, setpage] = useState(1);
  const [searchText, setsearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [editData, seteditData] = useState(null);
  const [showAdd, setShowAdd] = useState(false)
  const [edit,setEdit] = useState(null)

  const itemsPerPage = 10;

  useEffect(() => {
    fetchTheData();
  }, []);

  const fetchTheData = async () => {
    try {
      const response = await axios.get(`${URL}/schedule`);
      console.log(response.data)
      setUsers(response.data);
      setfilterUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setsearchText(query);

    const filtered = users.filter(
      (user) =>
        user.Title.toLowerCase().includes(query)
       
    );
    setfilterUsers(filtered);
    setpage(1);
  };

  const handleEdit = (id) => {
    
    setEdit(id)
  };

  const handleDelete = async(id) => {

    try{
    const res = await axios.delete(`${URL}/schedule/${id}`)
    
    setfilterUsers((prevfilterUsers) =>
      prevfilterUsers.filter((user) => user.id !== id)
    );

    toast.error("Deleted Successfully!");
    }
    catch(error){
      console.log(error);
      toast.error("Deletion Failed!");
    }
  };

  const handlePage = (page) => {
    setpage(page);
  };

  const handleSelectAllRows = (event) => {
    const { checked } = event.target;
    const allRowIds = currentUsers.map((user) => user.id); // Use currentUsers instead of filterUsers

    if (checked && selectedRows.length !== allRowIds.length) {
      setSelectedRows(allRowIds);
      toast.warn("Hey You Selected All !", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "dark",
      });
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelection = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
      // toast.success('Selected');
      toast.success("Selected", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
    }
  };

  

  const handleAddClick = ()=>{
    setShowAdd(!showAdd);
  }

  // Calculate the current page's subset of users
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filterUsers.slice(startIndex, endIndex);

  return (
    
    <div className="container my-10">
    <div className="flex justify-between mx-5">
      <SearchBar searchText={searchText} handleSearch={handleSearch}/>
      <div className="flex">
      {showAdd && <div><AddData showAdd={showAdd} setShowAdd={setShowAdd}/></div>}
      <div className="bg-blue-950 text-white p-2 my-4 rounded-md">
      
       
        <button className="flex" onClick={handleAddClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
          Add
        </button>
      </div>
      </div>
    </div>
      <Table
        users={currentUsers}
        selectedRows={selectedRows}
        handleRowSelection={handleRowSelection}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setEdit={setEdit}
        edit={edit}
        handleSelectAllRows={handleSelectAllRows}
      />
      <Page
        page={page}
        itemsPerPage={itemsPerPage}
        totalItems={filterUsers.length}
        handlePagination={handlePage}
      />
     
      {modalOpen && (
        <EditData editData={editData} setmodalOpen={setmodalOpen} />
      )}
    </div>
  );
};

export default Interface;