import {
    Card,
    Grid,
    TextField,
    Button
} from '@mui/material'
import React  from 'react'
import { Box, styled} from '@mui/system'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from "yup";
import Swal from 'sweetalert2'
import axios from 'axios';
import Login from "../Login/Login";


const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))


const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))


const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '70px 60px 70px 60px',
    position: 'relative',
    background: 'rgb(255,255,255)',
    justifyContent: 'center',
}))



const Root = styled(JustifyBox)(() => ({
    marginTop:'40px',
    background: '#161b22',
    height:'800px'

}))



const InnerTheme = createTheme({
    palette: {
        primary: {
            main: "rgb(255,205,0)"
        },
    },
});


const validationSchema = yup.object({
    firstName:yup
        .string('Enter your first name')
        .max(30,"Input 15 characters or below")
        .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
        .required('Required'),
    lastName:yup
        .string('Enter your last name')
        .max(30,"Input 15 characters or below")
        .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
        .required('Required'),
    email:  Yup.string().email('Invalid email').required('Required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    passConf: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
});


const Register = () => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            passConf:''

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            axios.post('http://localhost:4000/api/auth/signup', {
                email: values.email,
                password: values.password,
                passwordConfirmation: values.passConf,
                firstName: values.firstName,
                lastName: values.lastName,
                mobile: values.mobile,
                type:'user'
            })
                .then(res => {
                    console.log(res);
                    setIsLoggedIn(true);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Registration Failed!',
                    })
                });

            if (isLoggedIn) return <Login />;
        },
    });



    return (
        <Root>
            <Card className="card" style={{width:"700px"}}>
                <Grid container >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <ContentBox>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                style={{marginBottom:"10px"}}
                            />
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName&& formik.errors.lastName}
                                style={{marginBottom:"10px"}}
                            />
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email&& formik.errors.email}
                                style={{marginBottom:"10px"}}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                style={{marginBottom:"10px"}}
                            />
                            <TextField
                                fullWidth
                                id="passConf"
                                name="passConf"
                                label="Password Confirm"
                                type="password"
                                value={formik.values.passConf}
                                onChange={formik.handleChange}
                                error={formik.touched.passConf && Boolean(formik.errors.passConf)}
                                helperText={formik.touched.passConf && formik.errors.passConf}
                                style={{marginBottom:"10px"}}
                            />

                            <ThemeProvider theme={InnerTheme}>
                                <Button color="primary" variant="contained" fullWidth type="submit" style={{marginBottom:"20px"}}>
                                    Register
                                </Button>
                            </ThemeProvider>

                        </form>

                    </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </Root>
    )
}

export default Register;
