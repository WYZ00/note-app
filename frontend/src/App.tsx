import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModal";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginUpModal, setShowLoginUpModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginUpModal(true)}
          onSignupClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

        {showSignUpModal && (
          <SignUpModel
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginUpModal && (
          <LoginModal
            onDismiss={() => setShowLoginUpModal(false)}
            onLoginSuccess={(user) => {
              setLoggedInUser(user);
              setShowLoginUpModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
