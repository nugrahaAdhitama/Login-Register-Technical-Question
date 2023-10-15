import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://login-register-technical-question.vercel.app/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);

        // Checking status code and response message
        if (res.status === 201) {
          Swal.fire(
            "Registration successful!",
            res.data.message, // Using the server's response message
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        } else {
          // Handle any unexpected cases
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Try again later.",
          });
        }
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
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

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

                <div className="mb-4">
                  <MDBCheckbox label="I accept the terms and conditions" />
                </div>

                <MDBBtn className="mb-4" size="lg">
                  Register
                </MDBBtn>

                <div className="d-flex flex-row align-items-center mb-4">
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
