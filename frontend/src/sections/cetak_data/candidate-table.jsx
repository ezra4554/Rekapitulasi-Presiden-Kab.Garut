import { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';

import UserTableRow from './user-table-row';
import UserTableHead from './user-table-head';
import { applyFilter, getComparator } from './utils';

export default function CandidateTable({ candidate }) {
  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const dataFiltered = applyFilter({
    inputData: candidate,
    comparator: getComparator(order, orderBy),
  });
  console.log(candidate);
  return (
    <Grid item>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'isVerified', label: 'No', align: 'center' },
                  { id: 'candidate_name', label: 'Nama' },
                  { id: 'paslonNumber', label: 'Paslon Nomor' },
                  { id: 'total_votes', label: 'Jumlah Suara' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row, index) => (
                  <UserTableRow
                    key={row.candidate_id}
                    no={index + 1}
                    name={`${row.capresDetail.name} & ${row.cawapresDetail.name}`}
                    role={row.total_votes}
                    company={`No. Urut ${row.paslonNumber}`}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Grid>
  );
}

CandidateTable.propTypes = {
  candidate: PropTypes.array,
};
