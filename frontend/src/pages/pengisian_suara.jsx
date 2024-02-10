import { Helmet } from 'react-helmet-async';

import { PengisianSuaraView } from 'src/sections/pengisian_suara/view';

// ----------------------------------------------------------------------

export default function PengisianSuaraPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Rekapitulasi Calon Presiden UI </title>
      </Helmet>

      <PengisianSuaraView />
    </>
  );
}
