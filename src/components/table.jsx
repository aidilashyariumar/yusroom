import React from 'react'
import MaterialTable from 'material-table'

export default function Table() {
  const data=[
    {name:'aidil',age:'20'},
    {name:'aidill',age:'20'},
    {name:'aidilll',age:'20'},
    {name:'aidillll',age:'20'},
  ];
  const columns =[
    {title:'Name',field:'name'},
    {title:'Age',field:'age'},
    
  ]
  return (
    <div>
      <MaterialTable title="home"
        data={data}
        columns={columns}
      />
    </div>
  )
}
