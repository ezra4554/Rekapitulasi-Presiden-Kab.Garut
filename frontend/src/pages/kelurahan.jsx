import { Helmet } from 'react-helmet-async';

import { KelurahanView } from 'src/sections/kelurahan/view';

// ----------------------------------------------------------------------

export default function KelurahanPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Rekapitulasi Calon Presiden UI </title>
      </Helmet>

      <KelurahanView />
    </>
  );
}
