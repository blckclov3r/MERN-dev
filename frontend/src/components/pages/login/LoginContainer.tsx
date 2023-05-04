import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, TextField} from '@mui/material';
import {useLogin} from "@/components/pages/hooks/useLogin";
import Typography from "@mui/material/Typography";
import useAuthContext from "@/context/hooks/useAuthContext";
import Link from "next/link";

interface LoginFormInputs {
    email: string
    password: string
}

const LoginContainer = () => {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormInputs>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {login} = useLogin();
    const {user} = useAuthContext();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsSubmitting(true);
        await login(data.email, data.password)
        setIsSubmitting(false);
    };

    return (
        <>
            {
                user ?
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '70vh',
                            width: '100%',
                            gap: 3
                        }}
                    >
                        <Typography variant={'h5'}>Welcome <span
                            style={{color: '#006699'}}>{user.email}</span></Typography>
                        <Link href={'/'}>
                            <Button type="button" variant="contained">
                                Home
                            </Button>
                        </Link>
                    </Box>
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '70vh',
                                width: '100%',
                                gap: 3
                            }}
                        >
                            <Typography variant={'h4'}>Login</Typography>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Invalid email format',
                                    },
                                }}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be at least 4 characters',
                                    },
                                }}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.password)}
                                        helperText={errors.password?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'Log in'}
                            </Button>
                            <Link href={'/register'}>
                                <Typography variant={'body1'}>You do not have an account. Please register.</Typography>
                            </Link>
                        </Box>
                    </form>
            }
        </>
    );
};
export default LoginContainer