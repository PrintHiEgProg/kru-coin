import React, { useState, useEffect } from "react";

const TelegramUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(
      "https://api.telegram.org/bot7018807448:AAFwKDKpTX7QJbh1EXAwCIq7V_0lZiKyzoY/getMe"
    )
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.result.username);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Username: {username}</h1>
    </div>
  );
};

export default TelegramUsername;
