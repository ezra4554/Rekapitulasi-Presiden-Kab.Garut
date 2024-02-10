import { Helmet } from 'react-helmet-async';

import { KecamatanView } from 'src/sections/kecamatan/view';

// ----------------------------------------------------------------------

export default function KecamatanPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Rekapitulasi Calon Presiden UI </title>
      </Helmet>

      <KecamatanView />
    </>
  );
}
