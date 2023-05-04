import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IWorkout} from "@/pages";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {format} from 'date-fns'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {KeyedMutator} from "swr";
import {useRouter} from "next/router";

interface Props {
    rows: IWorkout[],
    mutate: KeyedMutator<IWorkout[]>
}

const WorkoutTable = (props: Props) => {
    const {rows, mutate} = props
    const router = useRouter()
    const handleDelete = async (id: string) => {
        const user = JSON.parse(localStorage.getItem('user') as any)
        if (id) {
            const confirmDelete = confirm('Are you sure you want to delete this data? This action is irreversible and cannot be undone.')
            if (confirmDelete) {
                const response = await fetch(`http://localhost:8082/api/workouts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                })
                if (response.ok) {
                    await mutate()
                }
            }
        }
    }

    const handleEdit = async (id: string) => {
        await router.push(`/${id}`)
    }

    const columns: GridColDef[] = [
        {field: "_id", headerName: "ID", flex: 1},
        {field: "title", headerName: "Title", flex: 1},
        {field: "reps", headerName: "Reps", flex: 1},
        {field: "load", headerName: "Load", flex: 1},
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
            valueFormatter: ({value}) => format(new Date(value), 'yyyy-MM-dd'),
        },
        {
            field: 'update',
            headerName: 'Update',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={null}
                    onClick={() => handleEdit(params.row.id)}
                ><SaveAsIcon  sx={{width: '18px', height: '18px'}}/></Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={null}
                    onClick={() => handleDelete(params.row.id)}
                ><DeleteIcon sx={{width: '18px', height: '18px'}} /></Button>
            ),
        },
    ];
    return (
        <Box sx={{mt: 3}}>
            <DataGrid
                rows={rows ?? []}
                columns={columns}
                checkboxSelection={false}
                getRowId={(row) => row.id}
                autoHeight={true}
                disableRowSelectionOnClick={true}
            />
        </Box>
    );
};

export default WorkoutTable;
