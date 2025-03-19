import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.amount.value);
    if (!isNaN(amount)) {
      setBalance(balance + amount);
      setMessage("Deposited " + amount + " successfully!"); // Reflected XSS
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = e.target.comment.value;
    setComments([...comments, newComment]); // Stored XSS
    localStorage.setItem("comments", JSON.stringify([...comments, newComment]));
  };

  return (
    <div>
      <h2>Üdvözöljük az XSS Bank-nál</h2>
      <h3>Egyenleg: ${balance}</h3>
      
      {/* Reflected XSS - displaying unescaped user input */}
      <p dangerouslySetInnerHTML={{ __html: message }}></p>

      <form onSubmit={handleDeposit}>
        <input type="text" name="amount" placeholder="Összeg" />
        <button type="submit">Befizetés</button>
      </form>

      {/* DOM-based XSS - modifying the DOM unsafely */}
      <h3>Keresés a tranzakciók között:</h3>
      <input
        type="text"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          document.getElementById("searchResults").innerHTML =
            "Keresési paraméter: " + e.target.value; // DOM-based XSS
        }}
        placeholder="Keresés..."
      />
      <div id="searchResults"></div>

        {/* Stored XSS - felhasználói értékelés, komment nem biztonságos megjelenítése */}
      <h3>Vélemények:</h3>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" name="comment" placeholder="Mondja el véleményét" />
        <button type="submit">Küldés</button>
      </form>
      <ul>
        {comments.map((c, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: c }}></li>
        ))}
      </ul>

    </div>
  );
}