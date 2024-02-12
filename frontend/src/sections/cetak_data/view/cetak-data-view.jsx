import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Button, MenuItem, TextField, LinearProgress } from '@mui/material';

import userService from 'src/services/userService';
import rekapService from 'src/services/rekapService';
import districtService from 'src/services/districtService';

import Iconify from 'src/components/iconify/iconify';

import SuaraTable from '../suara-table';
import PetugasTable from '../petugas-table';
import CandidateTable from '../candidate-table';

// ----------------------------------------------------------------------

export default function CetakDataView() {
  const [kecamatans, setKecamatans] = useState([]);
  const [kelurahans, setKelurahans] = useState([]);
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [cetakDataType, setCetakDataType] = useState('');
  const [dataCandidate, setCandidates] = useState([]);
  const [listPetugas, setListPetugas] = useState([]);
  const [ballots, setBallots] = useState([]);
  const [ballotName, setBallotName] = useState('');
  const [loading, setLoading] = useState(false);
  const [getGridSize, setGridSize] = useState({
    // default grid size
    Table: {
      xs: 12,
      md: 6,
    },
    Chart: {
      xs: 12,
      md: 6,
    },
  });

  const handleResetData = () => {
    setKecamatan('');
    setKelurahan('');
    setCetakDataType('');
    setCandidates([]);
    setGridSize({
      // default grid size
      Table: {
        xs: 12,
        md: 6,
      },
      Chart: {
        xs: 12,
        md: 6,
      },
    });
  };

  useEffect(() => {
    const handleGetAllKecamatan = async () => {
      try {
        if (kecamatans.length === 0) {
          setLoading(true);

          const getKecamatans = await districtService.getAllDistricts();
          setKecamatans(getKecamatans.data);
          setLoading(false);
        }
      } catch (error) {
        setKecamatans([]);
        setLoading(false);
      }
    };
    handleGetAllKecamatan();
  }, [kecamatans]);
  useEffect(() => {
    const handleGetCandidate = async () => {
      try {
        if (cetakDataType === 'data-capres') {
          setLoading(true);
          if (kelurahan) {
            // setTitle(`Data Suara Candidate Di Kelurahan ${kelurahan.name}`);
            handleGetCandidateKelurahan(kelurahan._id);
          } else if (kecamatan) {
            // setTitle(`Data Suara Candidate Di Kecamatan ${kecamatan.name}`);
            handleCandidateByKecamatan(kecamatan._id);
          } else {
            // setTitle('Data Suara Candidate Di Kabupaten Bandung');
            handleGetAllCandidate();
          }
        } else if (cetakDataType === 'data-suara') {
          setLoading(true);
          if (kelurahan) {
            handleSuaraByVillageId(kelurahan._id);
          } else if (kecamatan) {
            handleSuaraByDistrictId(kecamatan._id);
          } else {
            handleGetAllSuara();
          }
        } else {
          setLoading(true);
          if (kelurahan) {
            handleGetPetugasByVillageId(kelurahan._id);
          } else if (kecamatan) {
            handleGetPetugasByDistrictId(kecamatan._id);
          } else {
            handleGetAllPetugas();
          }
        }
      } catch (error) {
        setLoading(false);
      }
    };
    handleGetCandidate();
  }, [cetakDataType, kecamatan, kelurahan]);

  const handleGetAllPetugas = async () => {
    try {
      setLoading(true);
      const getPetugas = await userService.getAllPetugas();
      // console.log(getPetugas.data);
      setListPetugas(getPetugas.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleGetPetugasByDistrictId = async (districtId) => {
    try {
      setLoading(true);
      const getPetugas = await userService.getPetugasByDistrictId(districtId);
      setListPetugas(getPetugas.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGetAllSuara = async () => {
    try {
      setLoading(true);
      const getKecamatans = await rekapService.getAllDistrictsWithRekapVotes();
      setBallots(getKecamatans.data);
      setBallotName('Kecamatan');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSuaraByDistrictId = async (districtId) => {
    try {
      setLoading(true);
      const getKelurahan = await rekapService.getAllVillagesByDistrictIdWithRekapVotes(districtId);
      setBallots(getKelurahan.data);
      setBallotName('Kelurahan');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSuaraByVillageId = async (villageId) => {
    try {
      setLoading(true);
      const getTps = await rekapService.getAllTpsByVillageIdWithRekapVotes(villageId);
      setBallots(getTps.data.tpsInVillage);
      setBallotName('TPS');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGetPetugasByVillageId = async (villageId) => {
    try {
      setLoading(true);
      const getPetugas = await userService.getPetugasByVillageId(villageId);
      setListPetugas(getPetugas.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGetAllCandidate = async () => {
    try {
      setKelurahan('');
      setLoading(true);
      const getCandidates = await rekapService.getAllCandidateVotes();
      setCandidates(getCandidates.data);

      setLoading(false);
    } catch (error) {
      setKelurahan('');
      setLoading(false);
    }
  };

  const handleCandidateByKecamatan = async (districtId) => {
    try {
      setKelurahan('');
      setLoading(true);
      const getCandidates = await rekapService.getAllCandidateVotesInDistrict(districtId);
      setCandidates(getCandidates.data);

      setLoading(false);
    } catch (error) {
      setKelurahan('');
      setLoading(false);
    }
  };

  const handleGetCandidateKelurahan = async (village_id) => {
    try {
      setLoading(true);

      const getCandidates = await rekapService.getAllCandidateVotesInVillage(village_id);
      setCandidates(getCandidates.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // print area function
  const handlePrint = async () => {
    const prevGridSize = { ...getGridSize };
    const getButton = document.querySelectorAll('.printArea');
    getButton.forEach((element) => {
      element.style.display = 'none';
    });
    // change grid to print
    await setGridSize({
      Table: {
        xs: 7,
        md: 7,
      },
      Chart: {
        xs: 5,
        md: 5,
      },
    });
    reactToPrint();
    // back to default
    setGridSize(prevGridSize);
    getButton.forEach((element) => {
      element.style.display = 'inline';
    });
  };
  const reactToPrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: 100vh;
        margin: 10px;
      }
    }`,
    content: () => pdfRef.current,
  });
  const pdfRef = useRef();

  return (
    <Container ref={pdfRef}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Cetak Data</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        {kecamatan && kelurahan && (
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Data di {kelurahan.name}, {kecamatan.name}
          </Typography>
        )}
        {kecamatan && !kelurahan && (
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Data di {kecamatan.name}
          </Typography>
        )}
      </Stack>

      {loading && <LinearProgress color="primary" variant="query" />}
      {!loading && (
        <>
          <Grid container spacing={3} mb={5}>
            <Grid item xs={12} md={6} className="printArea">
              <TextField
                fullWidth
                select
                label="Data Yang Ingin Dicetak"
                value={cetakDataType}
                onChange={(e) => {
                  handleResetData();
                  setCetakDataType(e.target.value);
                }}
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Pilih Data Yang Ingin Dicetak
                </MenuItem>
                <MenuItem value="data-petugas">Data Akun Petugas TPS</MenuItem>
                <MenuItem value="data-capres">Data Candidate</MenuItem>
                <MenuItem value="data-suara">Data Suara Sah </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} className="printArea">
              <TextField
                fullWidth
                select
                label="Kecamatan"
                disabled={!cetakDataType}
                value={kecamatan}
                onChange={(e) => {
                  setKelurahan('');
                  setKecamatan(e.target.value);
                  setKelurahans(e.target.value.villages);
                }}
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Pilih Kecamatan
                </MenuItem>
                {kecamatans.map((option) => (
                  <MenuItem key={option._id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} className="printArea">
              <TextField
                fullWidth
                select
                label="Kelurahan"
                value={kelurahan}
                onChange={(e) => {
                  setKelurahan(e.target.value);
                }}
                variant="outlined"
                disabled={!kecamatan}
              >
                <MenuItem value="" disabled>
                  Pilih Desa / Kelurahan
                </MenuItem>
                {kelurahans.map((option) => (
                  <MenuItem key={option._id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            onClick={() => handlePrint()}
            variant="contained"
            startIcon={<Iconify icon="fa6-solid:file-pdf" />}
            className="printArea"
          >
            Export Data
          </Button>
          {cetakDataType === 'data-capres' && <CandidateTable candidate={dataCandidate} />}
          {cetakDataType === 'data-suara' && <SuaraTable data={ballots} name={ballotName} />}
          {cetakDataType === 'data-petugas' && <PetugasTable data={listPetugas} />}
        </>
      )}
    </Container>
  );
}
