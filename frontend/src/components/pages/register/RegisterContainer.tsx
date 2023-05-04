import React, {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, TextField} from '@mui/material';
import Typography from "@mui/material/Typography";
import useAuthContext from "@/context/hooks/useAuthContext";
import {useRegister} from "@/components/pages/hooks/useSignup";
import {useRouter} from "next/router";
import Link from "next/link";

interface RegisterFormInputs {
    email: string
    password: string
}

const RegisterContainer = () => {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormInputs>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register} = useRegister();
    const route = useRouter()

    const {user} = useAuthContext();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setIsSubmitting(true);
        await register(data.email, data.password)
        setIsSubmitting(false);
    };

    useEffect(() => {
        if (user !== null) {
            route.replace('/')
        }
    }, [user, route])

    return (
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
                <Typography variant={'h4'}>Register</Typography>
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
                    {isSubmitting ? 'Loading...' : 'Register'}
                </Button>
                <Link href={'/login'}>
                    <Typography variant={'body1'}>Already have an account. Please login.</Typography>
                </Link>
            </Box>
        </form>
    );
};
export default RegisterContainer