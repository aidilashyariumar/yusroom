import { Box } from '@mui/material'
import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'

export default function Home() {
  const data=[
    {name:'aidil',age:'20'},
    {name:'aidill',age:'20'},
    {name:'aidilll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
    {name:'aidillll',age:'20'},
  ];
  const columns =[
    {title:'Name',field:'name'},
    {title:'Age',field:'age'},
    
  ]
  return (
    <TableContainer component={Paper} sx={{maxHeight:'300px'}}>
      <Table aria-label="YUSROOM" stickyHeader>   
        <TableHead sx={{backgroundColor:'blue'}}>
          <TableRow >
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
          <TableRow key={row.name} sx={{'&:last-child td , &:last-child th': {border:0}}}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.age}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}
