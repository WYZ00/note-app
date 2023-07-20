import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModal";
import { User } from "./models/user";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLogoutView from "./components/NotesPageLogoutView";

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
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginUpModal(true)}
        onSignupClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLogoutView />}
        </>
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
  );
}

export default App;
