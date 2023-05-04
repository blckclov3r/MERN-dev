import CreateEditForm from "@/components/CreateEditForm";
import Typography from "@mui/material/Typography";
import React from "react";
import {useRouter} from "next/router";
import {useParams} from "next/navigation";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";

const EditWorkout = () => {
    const {query: {id}} = useRouter();

    return (
        <>
            <Box>
                <Grid container sx={{my: 4}}>
                    <Grid item xs={6}>
                        <Typography variant={"h4"}>{id}</Typography>
                        <CreateEditForm/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default EditWorkout