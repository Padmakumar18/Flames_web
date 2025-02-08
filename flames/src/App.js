import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [result, setResult] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  function hasSpecialCharacters(str) {
    const regex = /[^a-zA-Z]/;
    return regex.test(str);
  }

  function handleSubmit(event) {
    event.preventDefault();
    toast.dismiss();

    let a = name1.toLowerCase().trim().replace(/\s+/g, "");
    let b = name2.toLowerCase().trim().replace(/\s+/g, "");

    if (a === b) {
      toast.error("Names should not be the same!");
      return;
    }

    if (hasSpecialCharacters(a) || hasSpecialCharacters(b)) {
      toast.error("Names should not contain special characters & numbers!");
      return;
    }

    setName1("");
    setName2("");
    let totalLength = a.length + b.length;
   
    let count = 0;

    let bArray = b.split("");

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < bArray.length; j++) {
        if (a[i] === bArray[j]) {
          bArray[j] = " ";
          count++;
          break;
        }
      }
    }

    totalLength = totalLength - count * 2;

    let flames = "FLAMES";
    for (let i = 0; i < 5; i++) {
      let removeIndex = totalLength;

      while (removeIndex > flames.length) {
        removeIndex = removeIndex - flames.length;
      }
      flames = flames.slice(removeIndex) + flames.slice(0, removeIndex - 1);
    }

    setResult(flames[0]);

    setTimeout(() => {
      setResult("");
    }, 3000);
  }

  const resultMap = {
    F: { message: "Friends - Just friends!", className: "green" },
    L: { message: "Lovers - Love is in the air!", className: "green" },
    A: { message: "Affection - Special bond!", className: "orange" },
    M: { message: "Marriage – Get ready for wedding invites!", className: "green" },
    E: { message: "Enemies - Watch out!", className: "red" },
    S: { message: "Siblings - Family vibes!", className: "blue" },
  };

  const resultData = resultMap[result];

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="title">Find Your Fate</h1>
          <p className="subtitle">Your fate is just a click away! Ready? </p>

          <form onSubmit={handleSubmit} className="form-container">
            <div className="Names">
              <div className="person1">
                <input
                  type="text"
                  className="name-input"
                  placeholder="Your name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  required
                />
              </div>
              <div className="person2">
                <input
                  type="text"
                  className="name-input"
                  placeholder="Your partner's name"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="btn" type="submit">
              Find My Fate
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "10px",
          padding: "10px 20px",
          textAlign: "center",
        }}
      />

      <div className="row">
        <div className="col-12">
          {resultData && (
            <p className={`${resultData.className} mt-3`}>{resultData.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;