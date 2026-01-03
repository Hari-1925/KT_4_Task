import { useEffect, useState } from "react";

const API = "http://localhost:5000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const fetchBooks = async () => {
    const res = await fetch(API);
    setBooks(await res.json());
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    setError("");

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        publishedYear: Number(form.publishedYear),
        availableCopies: Number(form.availableCopies)
      })
    });

    if (!res.ok) {
      setError("Invalid book data");
      return;
    }

    setForm({
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      availableCopies: ""
    });

    fetchBooks();
  };

  const changeCopies = async (id, change) => {
    setError("");

    const res = await fetch(`${API}/${id}/copies`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ change })
    });

    if (!res.ok) {
      setError("Cannot update copies (negative stock or invalid book)");
      return;
    }

    fetchBooks();
  };

  const deleteBook = async (id) => {
    setError("");

    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      setError("Book can be deleted only when copies are 0");
      return;
    }

    fetchBooks();
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>

        <header style={styles.header}>
          <h1 style={styles.title}>Library Book Management</h1>
          <p style={styles.subtitle}>
            React frontend integrated with Node.js + MongoDB backend
          </p>
        </header>

        <section style={styles.card}>
          <h3>Add Book (POST)</h3>

          <div style={styles.form}>
            <input style={styles.input} placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })} />
            <input style={styles.input} placeholder="Author"
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })} />
            <input style={styles.input} placeholder="Category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })} />
            <input style={styles.input} placeholder="Published Year"
              value={form.publishedYear}
              onChange={e => setForm({ ...form, publishedYear: e.target.value })} />
            <input style={styles.input} placeholder="Available Copies"
              value={form.availableCopies}
              onChange={e => setForm({ ...form, availableCopies: e.target.value })} />
          </div>

          <button style={styles.primaryBtn} onClick={addBook}>
            Add Book
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </section>

        <section style={styles.card}>
          <h3>Books List (GET)</h3>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Copies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.publishedYear}</td>
                    <td>{book.availableCopies}</td>
                    <td>
                      <button style={styles.smallBtn}
                        onClick={() => changeCopies(book._id, 1)}>+1</button>
                      <button style={styles.smallBtn}
                        onClick={() => changeCopies(book._id, -1)}>-1</button>
                      <button style={styles.deleteBtn}
                        onClick={() => deleteBook(book._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    padding: "40px"
  },
  wrapper: {
    maxWidth: "1600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#e5e7eb"
  },
  header: {
    textAlign: "left"
  },
  title: {
    fontSize: "36px",
    marginBottom: "6px"
  },
  subtitle: {
    color: "#94a3b8"
  },
  card: {
    background: "#020617",
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.6)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
    marginBottom: "20px"
  },
  input: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "14px",
    color: "#e5e7eb",
    fontSize: "14px"
  },
  primaryBtn: {
    background: "#22c55e",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },
  smallBtn: {
    background: "#38bdf8",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    marginRight: "6px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#f87171",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  error: {
    color: "#f87171",
    marginTop: "10px"
  }
};

export default App;
