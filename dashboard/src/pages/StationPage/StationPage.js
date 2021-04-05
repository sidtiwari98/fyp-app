import React from 'react';
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Raleway, sans-serif'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    padding: 25,
  },
  tableContainer: {
    width: "70%",
  },
  table: {
    minWidth: 650,
  },
});

function createData(category, store, storeNumber, violations) {
  return { category, store, storeNumber, violations };
}

const rows = [
  createData('Passenger Services', 'Joint Host', 'HKU 9B', 0),
  createData('Passenger Services', 'Max Sight Photo-Me', 'HKU 8A', 24),
  createData('Passenger Services', 'HK Walker', 'HKU 9A', 67),
  createData('Food & Beverage', 'Yamazaki Boulangerie Chaude', 'HKU 5', 29),
  createData('Banks', 'ICBC', '	HKU ATM 2', 49),
  createData('Banks', 'Hang Seng Bank Automated Banking Center', 'HKU 7', 4),
  createData('Banks', 'HSBC ATM', 'HKU 6', 49),
  createData('Food & Beverage', 'Hung Fook Tong', 'HKU 2', 16),
  createData('Convenience Goods', '7-Eleven', 'HKU 4', 79),
  createData('Convenience Goods', '7-Eleven', 'HKU 3', 9),
  createData('Food & Beverage', 'Maxim\'s Cakes', 'HKU 1', 49),
];

const sortedRows = rows.sort((a, b) => b.violations - a.violations);

export default function StationPage(props) {
  const classes = useStyles();
  let stationName = props.match.params.stationName

  return (
    <DefaultLayout title="Station">
      <div className={classes.root}>
        <TableContainer className = {classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Store</StyledTableCell>
                <StyledTableCell>Store Number</StyledTableCell>
                <StyledTableCell>Violations</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  <StyledTableCell><Link to = {`${stationName}/${row.store}`} style={{ textDecoration: 'underline', color: 'black' }}>{row.store}</Link></StyledTableCell>
                  <StyledTableCell>{row.storeNumber}</StyledTableCell>
                  <StyledTableCell>{row.violations}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DefaultLayout>
  );
}