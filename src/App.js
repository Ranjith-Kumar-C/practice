import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [message, setMessage] = useState("");

  // Example: calling an API if you added API in Amplify
  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch("/api/hello"); // if API is connected
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error("API call failed:", err);
        setMessage("Hello from Amplify React App 🚀");
      }
    }
    fetchMessage();
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome {user.username} 🎉</h1>
      <h2>{message}</h2>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(App);