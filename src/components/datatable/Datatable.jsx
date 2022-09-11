import React from 'react'
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import {Link} from "react-router-dom"

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
        <Link to = "/users/12349s" style={{textDecoration:"none"}} >
            <div className="viewButton">View</div>
            </Link>
          <div className="deleteButton">
            Delete
          </div>
        </div>
      );
    },
  },
];

const Datatable = () => {
  return (
    <div className='datatable'>
      <div className="datatableTitle">
        Add New User
        <Link to = "/users/new" style={{textDecoration:"none"}} className = "link"> 
        Add New 
        </Link>
      </div>
     <DataGrid
     className='datagrid'
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable