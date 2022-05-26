import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = ({
    username,
    firstName,
    lastName,
    email,
    birthDate,
    password,
    confirmpassword,
  }) => {
    if (password === confirmpassword) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_AUTH_URL}/auth/signup`,
        data: {
          username,
          firstName,
          lastName,
          email,
          birthDate,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          navigate("/Signin");
          window.alert("Success...");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Please Confirmpassword...");
    }
  };

  const User = useSelector((state) => state.Auth.User);
  console.log(User);
  useEffect(() => {
    if (User) {
      navigate("/Dashboard");
    }
  }, []);
  return (
    <div className="container pt-4 h-75">
      <div className="d-flex justify-content-center align-item-center h-100">
        <form
          className=" d-flex flex-column gap-3 justify-content-center align-item-center "
          onSubmit={handleSubmit(submitHandler)}
        >
          {/*userName */}
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({ field }) => (
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                inputProps={{ type: "text" }}
                error={Boolean(errors.username)}
                helperText={
                  errors.username
                    ? errors.username.type === "maxLength" ||
                      errors.username.type === "minLength"
                      ? "username must contain between 3 and 12 letters or numbers."
                      : "username is required"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
          {/* firstName */}
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({ field }) => (
              <TextField
                id="firstName"
                label="FirstName"
                variant="outlined"
                inputProps={{ type: "text" }}
                error={Boolean(errors.firstName)}
                helperText={
                  errors.firstName
                    ? errors.firstName.type === "maxLength" ||
                      errors.firstName.type === "minLength"
                      ? "firstName must contain between 3 and 12 letters or numbers."
                      : "firstName is required"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
          {/*lastName*/}
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({ field }) => (
              <TextField
                id="lastName"
                label="lastName"
                variant="outlined"
                inputProps={{ type: "text" }}
                error={Boolean(errors.lastName)}
                helperText={
                  errors.lastName
                    ? errors.lastName.type === "maxLength" ||
                      errors.lastName.type === "minLength"
                      ? "lastName must contain between 3 and 12 letters or numbers."
                      : "lastName is required"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
          {/* email */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({ field }) => (
              <TextField
                id="email"
                label="email"
                variant="outlined"
                inputProps={{ type: "text" }}
                error={Boolean(errors.email)}
                helperText={
                  errors.email
                    ? errors.email.type === "maxLength" ||
                      errors.email.type === "minLength"
                      ? "email must contain between 3 and 12 letters or numbers."
                      : "email is required"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
          {/* birthDate */}
          <Controller
            name="birthDate"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({ field }) => (
              <label htmlFor="birthDate">
                <input
                  name="birthDate"
                  id="birthDate"
                  type="date"
                  value=""
                  {...field}
                />
              </label>
            )}
          ></Controller>
          {/*password*/}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              maxLength: 12,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                inputProps={{ type: "password" }}
                error={Boolean(errors.password)}
                helperText={
                  errors.password
                    ? errors.password.type === "maxLength" ||
                      errors.password.type === "minLength"
                      ? "password must contain between 6 and 12 letters or numbers."
                      : "password is required"
                    : ""
                }
                {...field}
              >
                {" "}
              </TextField>
            )}
          ></Controller>
          {/*confrim password */}
          <Controller
            name="confirmpassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                id="confirmpassword"
                label="Confirm Password"
                variant="outlined"
                inputProps={{ type: "password" }}
                error={Boolean(errors.confirmpassword)}
                helperText={
                  errors.confirmpassword
                    ? errors.confirmpassword.type === "maxLength" ||
                      errors.confirmpassword.type === "minLength"
                      ? "password must contain between 6 and 12 letters or numbers."
                      : "password is required"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
          <p className="text-secondary">
            Already Have Account ?{" "}
            <span
              className="text-primary"
              role="button"
              onClick={() => {
                navigate("/Signin");
              }}
            >
              Sing In
            </span>
          </p>{" "}
          <button className="btn bg-primary text-white" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
