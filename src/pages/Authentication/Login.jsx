import { TextField,Button } from '@mui/material';
import React, { useState } from 'react';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from "yup"
// Yup is just a library to create validation rules easily.
// (Instead of manually checking "if email includes '@'", etc., Yup does it smartly.)
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../redux/Auth/auth.action';


const initialValues = { email: "", password: "" };
const validataionShema = { email: Yup.string().email("Invalid email").required("Email is required"), password: Yup.string().min(6, "Password must contain atleast 6 characters").required("Password is required") };
const Login = () => {

    const [formValue, setFormValue] = useState();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {

        console.log("handle submit", values)
        dispatch(loginUserAction({data:values}))
    }

    return (
        <>

{/* Formik wraps the whole form. */}
            <Formik
                onSubmit={handleSubmit}
                validataionShema={validataionShema}
                initialValues={initialValues}>
{/* Formik provides its own Form component. */}
                <Form className="space-y-5">
                    <div className="space-y-5">
                        <div>
                        {/* Field tells Formik: "This is a form field, manage its value for me." */}
                            <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth></Field>
                            {/* If validation fails, Formik + Yup will show error messages automatically. */}
                            <ErrorMessage name="email" component={"div"} className={"text-red-500"}></ErrorMessage>
                        </div>
                        <div>
                            <Field as={TextField} name="password" placeholder="Password" type="password" variant="outlined" fullWidth></Field>
                            <ErrorMessage name="password" component={"div"} className={"text-red-500"}></ErrorMessage>
                        </div>
                    </div>
                    <Button sx={{padding: ".8rem 0rem"}} fullWidth type="submit" variant="contained" color='primary'>Login</Button>
                </Form>

            </Formik>

        </>
    )
}

export default Login