import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./Components/HomePage";
import ImportantsPage from "./Components/ImportantsPage";
import AboutPage from "./Components/AboutPage";
import CertificatePage from "./Components/CertificatePage";
import UploadPage from "./Components/UploadPage";
import LoginPage from "./Components/LoginPage";
import SideNavbar from "./Components/Common/SideNavbar";

import { useUser } from "./Context/User";

function App() {
  const userContext = useUser();
  return (
    <>
      {userContext && userContext.user && <SideNavbar />}
      <main
        className={`bg-[--bg-color] min-h-screen ${
          userContext && userContext.user ? "main px-8" : ""
        }`}
      >
        <Routes>
          {userContext && userContext.user ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="importants" element={<ImportantsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="certificate/new" element={<UploadPage />} />
              <Route path="certificate/:id" element={<CertificatePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
