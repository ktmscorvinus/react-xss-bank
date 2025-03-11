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
      <h2>Welcome to XSS Bank</h2>
      <h3>Your Balance: ${balance}</h3>
      
      {/* Reflected XSS - displaying unescaped user input */}
      <p dangerouslySetInnerHTML={{ __html: message }}></p>

      <form onSubmit={handleDeposit}>
        <input type="text" name="amount" placeholder="Deposit Amount" />
        <button type="submit">Deposit</button>
      </form>

      {/* DOM-based XSS - modifying the DOM unsafely */}
      <h3>Search Transactions:</h3>
      <input
        type="text"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          document.getElementById("searchResults").innerHTML =
            "You searched for: " + e.target.value; // DOM-based XSS
        }}
        placeholder="Search..."
      />
      <div id="searchResults"></div>

        {/* Stored XSS - displaying user comments unsafely */}
      <h3>Comments:</h3>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" name="comment" placeholder="Leave a comment" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((c, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: c }}></li>
        ))}
      </ul>

    </div>
  );
}