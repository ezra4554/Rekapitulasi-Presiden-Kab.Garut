import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

export default function PartyCard({ candidate, setVotesResult }) {
  const [, setVotesData] = React.useState([]);

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;

    const updatedVotes = {
      candidates_id: candidate._id,
      paslonNumber: candidate.paslonNumber,
      capresDetail: {
        name: candidate.capresDetail.name,
        partyName: candidate.capresDetail.partyName,
      },
      cawapresDetail: {
        name: candidate.cawapresDetail.name,
        partyName: candidate.cawapresDetail.partyName,
      },
      total_votes: value,
    };

    setVotesData(updatedVotes);

    // Use the updatedVotesData directly in setVotesResult
    setVotesResult((prevVotesResult) => [
      ...prevVotesResult.filter((result) => result.candidates_id !== candidate._id),
      updatedVotes,
    ]);
  };

  return (
    <Card sx={{ maxWidth: 345, minHeight: 350 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{`${candidate.paslonNumber}`}</Avatar>}
        subheader={`Pasang Calon No ${candidate.paslonNumber}`}
      />

      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Nama</TableCell>
                <TableCell>Input Suara</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={candidate._id}>
                <TableCell style={{ textAlign: 'center' }}>
                  <div>
                    {candidate.capresDetail.name}
                    <br />&<br />
                    {candidate.cawapresDetail.name}
                  </div>
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Input Suara"
                    variant="outlined"
                    size="small"
                    onChange={(event) => handleChange(event)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

PartyCard.propTypes = {
  candidate: PropTypes.any,
  setVotesResult: PropTypes.any,
};
