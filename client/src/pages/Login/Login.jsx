import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../context/UserContext";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://login-register-technical-question.vercel.app/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        // If login is successful, use the server's response message
        Swal.fire("Login successful! ", res.data.message, "success").then(
          (result) => {
            if (result.isConfirmed) {
              navigate("/home");
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);

        // Check if the error response from server has a message, else display generic message
        let errorMessage =
          err.response && err.response.data.message
            ? err.response.data.message
            : "Something went wrong! Try again later.";

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Login
                </p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <MDBBtn className="mb-4" size="lg">
                  Login
                </MDBBtn>

                <div className="d-flex flex-row align-items-center mb-4">
                  <p>
                    Do not have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default Login;
