import React , {useEffect , useState} from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";


export default function Register() {
  const initialValue = { username: "", email: "", password: "" };
  const [inputValue, setInputvalue] = useState(initialValue);
  const [inputError, setinputError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  // for set value on input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputValue, [name]: value });
  };

  // for form onSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    setinputError(handleValidation(inputValue));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(inputError).length === 0 && isSubmit) {
      alert("Registration successfully  !!");
      navigate("/login");
      console.log(inputValue);
    }
  }, [inputError]);

  //for perform validation
  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const letter = /^[a-zA-Z]+$/i;
    const Uppercase = /^(?=.*[A-Z]).*$/;
    const ContainsNumber = /^(?=.*[0-9]).*$/;
    const specialSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;

    // User validation
    if (!values.username) {
      errors.username = "***Username is required";
    } else if (!letter.test(values.username)) {
      errors.username = "***Only letters!";
    } else if (!Uppercase.test(values.username)) {
      errors.username =
        "***Username must have at least one uppercase characters! ";
    }

    // email validation
    if (!values.email) {
      errors.email = "***Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "***This is not a valid email format !";
    }

    // password validation
    if (!values.password) {
      errors.password = "***Password is required";
    } else if (values.password.length < 4) {
      errors.password = "***Password must be more then 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "***Password cannot exceed more then 10 characters";
    } else if (!Uppercase.test(values.password)) {
      errors.password =
        "***Password must have at least one uppercase characters!";
    } else if (!ContainsNumber.test(values.password)) {
      errors.password = "***Password must contain at least one Digit.";
    } else if (!specialSymbol.test(values.password)) {
      errors.password = "***Password must contain at least one Special Symbol";
    }
    return errors;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" container Register-part content mb-3">
          <h3 className="title mb-5">Registration form</h3>
          <label className="form-label">userName</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            name="username"
            value={inputValue.username}
            onChange={handleChange}
          />
        </div>
        <p className=" para text-danger">{inputError.username}</p>

        <div className=" container Register-part mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={inputValue.email}
            onChange={handleChange}
            placeholder="Email id "
            name="email"
          />
        </div>
        <p className=" para text-danger">{inputError.email}</p>

        <div className=" container Register-part mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={inputValue.password}
            onChange={handleChange}
          />
        </div>
        <p className=" para text-danger">{inputError.password}</p>
        <button type="submit" className="btn register-btn mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
