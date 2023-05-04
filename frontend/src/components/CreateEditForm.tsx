import {FormEvent, useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {IWorkout} from "@/pages";
import {KeyedMutator} from "swr";
import {useParams} from "next/navigation";
import {useRouter} from "next/router";
import useAuthContext from "@/context/hooks/useAuthContext";

const CreateFormComponent = ({mutate}: { mutate?: KeyedMutator<IWorkout[]> }) => {

    const params = useParams()
    const {query: {id}} = useRouter();
    const router = useRouter()
    const [workout, setWorkout] = useState<IWorkout>();

    const [title, setTitle] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [load, setLoad] = useState<string>('');
    const [emptyFields, setEmptyFields] = useState<any>([])

    useEffect(() => {
        if (id && !workout) {
            const fnAsync = async () => {
                const user = JSON.parse(localStorage.getItem('user') as any)
                const response = await fetch(`http://localhost:8082/api/workouts/${id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const data = await response?.json();
                setWorkout(data)
                setTitle(data?.title)
                setReps(data?.reps)
                setLoad(data?.load)
            }
            fnAsync().then(r => r)

        }
    }, [id, workout])


    const createHandler = async (e: FormEvent) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user') as any)
        const response = await fetch('http://localhost:8082/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                title: title,
                reps: Number(reps),
                load: Number(load)
            })
        });

        const json = await response.json();
        if(json.emptyFields){
            setEmptyFields(json?.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setReps('')
            setLoad('')
            alert('Successfully inserted')
            mutate?.()
            setEmptyFields([])
        }
    }

    const updateHandler = async (e: FormEvent) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user') as any)
        const response = await fetch(`http://localhost:8082/api/workouts/${workout?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                _id: id,
                title,
                reps: Number(reps),
                load: Number(load),
            })
        })
        if (response.ok) {
            alert('Successfully updated')
            mutate?.()
            await router.push('/')
            setEmptyFields([])
        }
    }

    return (
        <>
            <form onSubmit={id ? updateHandler : createHandler}>
                <Box sx={{display: 'flex', gap: 3, flexDirection: 'column', mt: 3}}>
                    <TextField
                        size={'small'}
                        variant={'outlined'}
                        placeholder={'title'}
                        value={title}
                        helperText={emptyFields.includes('title') ? 'Please fill this title' : ''}
                        error={emptyFields.includes('title') ?? false}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }
                        }
                    />
                    <TextField
                        size={'small'}
                        variant={'outlined'}
                        placeholder={'reps'}
                        value={reps}
                        helperText={emptyFields.includes('reps') ? 'Please fill this reps' : ''}
                        type={'number'}
                        error={emptyFields.includes('reps') ?? false}
                        onChange={(e) => {
                            setReps(e.target.value)
                        }
                        }
                    />
                    <TextField
                        size={'small'}
                        variant={'outlined'}
                        placeholder={'load'}
                        value={load}
                        type={'number'}
                        helperText={emptyFields.includes('load') ? 'Please fill this load' : ''}
                        error={emptyFields.includes('load') ?? false}
                        onChange={(e) => {
                            setLoad(e.target.value)
                        }
                        }
                    />
                    <Button variant={'contained'} color={'secondary'} type={'submit'}>Submit</Button>
                </Box>
            </form>
        </>
    );
}

export default CreateFormComponent