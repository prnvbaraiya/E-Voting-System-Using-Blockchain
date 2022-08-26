import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function DataTable(props) {
  return (
    <div>
      <DataGrid
        getRowId={(row) => row._id}
        autoHeight
        rows={props.rows}
        pageSize={25}
        columns={props.columns}
        checkboxSelection={props.checkboxSelection ? false : true}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
