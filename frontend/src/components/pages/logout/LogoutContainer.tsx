import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button} from '@mui/material';
import Typography from "@mui/material/Typography";
import useAuthContext from "@/context/hooks/useAuthContext";
import {useLogout} from "@/components/pages/hooks/useLogout";
import Link from "next/link";

interface LoginFormInputs {
    email: string
    password: string
}

const LogoutContainer = () => {
    const {
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormInputs>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsSubmitting(true);
        await logout();
        setIsSubmitting(false);
    };

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
                <Typography variant={'h4'}>Logout</Typography>
                {
                    user ? <Button type="submit" variant="contained">
                        Logout
                    </Button> : <Link href={'/login'}>
                        <Button type="button" variant="contained">
                            Login
                        </Button>
                    </Link>
                }


            </Box>
        </form>
    );
};
export default LogoutContainer