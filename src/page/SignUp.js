import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ username, password }) => {
    console.log(username, password);
  };

  const navigate = useNavigate();

  return (
    <div className="container pt-4 h-75">
      <div className="d-flex justify-content-center align-item-center h-100">
        <form
          className=" d-flex flex-column gap-3 justify-content-center align-item-center "
          onSubmit={handleSubmit(submitHandler)}
        >
          {/*Fullname */}
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({ field }) => (
              <TextField
                id="fullname"
                label="FullName"
                variant="outlined"
                inputProps={{ type: "text" }}
                error={Boolean(errors.fullName)}
                helperText={
                  errors.fullName
                    ? errors.fullName.type === "maxLength" ||
                      errors.fullName.type === "minLength"
                      ? "Fullname must contain between 3 and 12 letters or numbers."
                      : "Fullname is required"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
          {/*  Age */}
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              maxLength: 20,
              minLength: 4,
            }}
            render={({ field }) => (
              <TextField
                id="number"
                label="Number"
                variant="outlined"
                inputProps={{ type: "text" }}
                error={Boolean(errors.number)}
                helperText={errors.number ? "number is required" : ""}
                {...field}
              ></TextField>
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
              ></TextField>
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
