import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

export function Contato() {
  const url = "http://localhost:5000/message";
  const [message, setMessage] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [validator, setValidator] = useState(false);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setMessage(data);
  }, [render]);

  const sendMessage = () => {
    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }
    const bodyForm = {
      email: author,
      message: content,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setRender(true);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      });

    setAuthor("");
    setContent("");
  };

  return (
    <>
      <Grid container direction="row" xs={12}>
        <TextField
          id="name"
          label="Name"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
          fullWidth
        />
        <TextField
          id="message"
          label="Message"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          fullWidth
        />
      </Grid>

      {validator && (
        <div
          className="alert alert-warning alert-dismissible fade show mt-2"
          role="alert"
        >
          <strong>Por favor preencha todos os campos</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {success && (
        <div
          className="alert alert-success alert-dismissible fade show mt-2"
          role="alert"
        >
          <strong>Mensagem foi enviada</strong>
          {/* <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button> */}
        </div>
      )}

      <Button
        onClick={sendMessage}
        className="mt-2"
        variant="contained"
        color="primary"
      >
        Send
      </Button>
      {message.map((content) => {
        return (
          <div className="row-cols-1 row-cols-md-3 g-4 mt-3">
            <div className="col">
              <div className="card h-100" key={content.id}>
                <div className="card-body">
                  <h5 className="card-title">{content.email}</h5>
                  <p className="card-text">{content.message}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{content.created_at}</small>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
