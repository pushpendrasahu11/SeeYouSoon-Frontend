import { TextField, Button,Radio,FormControlLabel,RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../redux/Auth/auth.action';


const initialValues = {firstName:"", lastName:"", email: "", password: "",gender:"" };
const validataionShema = { email: Yup.string().email("Invalid email").required("Email is required"), password: Yup.string().min(6, "Password must contain atleast 6 characters").required("Password is required") };
const Register = () => {

  const [gender, setGender] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    values.gender = gender;
    console.log("handle submit", values)
    dispatch(registerUserAction({data:values}));
  }

  const handleChange = (event) =>{
    setGender(event.target.value)
  }

  return (
    <>

      <Formik
        onSubmit={handleSubmit}
        validataionShema={validataionShema}
        initialValues={initialValues}>

        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field as={TextField} name="firstName" placeholder="First Name" type="text" variant="outlined" fullWidth></Field>
              <ErrorMessage name="firstName" component={"div"} className={"text-red-500"}></ErrorMessage>
            </div>
            <div>
              <Field as={TextField} name="lastName" placeholder="Last Name" type="text" variant="outlined" fullWidth></Field>
              <ErrorMessage name="lastName" component={"div"} className={"text-red-500"}></ErrorMessage>
            </div>
            <div>
                <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth></Field>
                <ErrorMessage name="email" component={"div"} className={"text-red-500"}></ErrorMessage>
            </div>
            <div>
              <Field as={TextField} name="password" placeholder="Password" type="password" variant="outlined" fullWidth></Field>
              <ErrorMessage name="password" component={"div"} className={"text-red-500"}></ErrorMessage>
            </div>
            <div>
            <RadioGroup
        row
        aria-label="gender"
        name="gender"
        onChange={handleChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <ErrorMessage name="gender" component={"div"} className={"text-red-500"}></ErrorMessage>
      </RadioGroup>
            </div>
          </div>
          <Button sx={{ padding: ".8rem 0rem" }} fullWidth type="submit" variant="contained" color='primary'>Register</Button>
        </Form>

      </Formik>

    </>
  )
}

export default Register