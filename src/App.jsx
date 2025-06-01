import { useAtom } from "jotai";
import {
  animeAtom,
  openAtom,
  open1Atom,
  openEditAtom,
  infoUserAtom,
  addNameAtom,
  addAgeAtom,
  editUserAtom,
  editNameAtom,
  editAgeAtom,
  searchs
} from "./store/Atom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function App() {
  const [data, setData] = useAtom(animeAtom);
  const [open, setOpen] = useAtom(openAtom);
  const [open1, setOpen1] = useAtom(open1Atom);
  const [openEdit, setOpenEdit] = useAtom(openEditAtom);

  const [infoUser, setInfoUser] = useAtom(infoUserAtom);
  const [addName, setAddName] = useAtom(addNameAtom);
  const [addAge, setAddAge] = useAtom(addAgeAtom);

  const [editUser, setEditUser] = useAtom(editUserAtom);
  const [editName, setEditName] = useAtom(editNameAtom);
  const [editAge, setEditAge] = useAtom(editAgeAtom);
const[search,setSearch]=useAtom(searchs)
  const handleClickOpen = (item) => {
    setInfoUser(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInfoUser(null);
  };

  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleClickEdit = (item) => {
    setEditUser(item);
    setEditName(item.name);
    setEditAge(item.age);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditUser(null);
    setEditName("");
    setEditAge("");
  };

  const addfunc = (event) => {
    event.preventDefault();
    const newUser = {
      name: addName,
      age: addAge,
      id: Date.now(),
      complete: false,
    };
    setData([...data, newUser]);
    setAddAge("");
    setAddName("");
    setOpen1(false);
  };

  const handleDelete = (e) => {
    setData(data.filter((item) => item.id !== e.id));
  };

  const completeFunction = (e) => {
    setData(
      data.map((el) =>
        el.id === e.id ? { ...el, complete: !el.complete } : el
      )
    );
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    if (!editUser) return;
    setData(
      data.map((el) =>
        el.id === editUser.id
          ? { ...el, name: editName, age: editAge }
          : el
      )
    );
    handleCloseEdit();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button variant="outlined" onClick={handleClickOpen1}>
        + Add
      </Button>
<input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}  />
      <Stack spacing={3} mt={2}>
        {data.filter((e)=>JSON.stringify(e).trim().toLowerCase().includes(search.trim().toLowerCase())).map((e) => (
          <Card key={e.id} variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {e.name}
              </Typography>
              <Typography color="text.secondary">Age: {e.age}</Typography>
              <Typography color="text.secondary">ID: {e.id}</Typography>
              <Typography color="text.secondary">
                Status: {e.complete ? "Active" : "Inactive"}
              </Typography>
              <Box mt={2}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(e)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color={e.complete ? "secondary" : "success"}
                    onClick={() => completeFunction(e)}
                  >
                    {e.complete ? "Mark Inactive" : "Mark Active"}
                  </Button>
                  <Button variant="outlined" onClick={() => handleClickOpen(e)}>
                    Info
                  </Button>
                  <Button variant="contained" onClick={() => handleClickEdit(e)}>
                    Edit
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Info Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {infoUser ? `Details for ${infoUser.name}` : ""}
        </DialogTitle>
        <DialogContent>
          {infoUser && (
            <>
              <Typography>ID: {infoUser.id}</Typography>
              <Typography>Age: {infoUser.age}</Typography>
              <Typography>
                Status: {infoUser.complete ? "Active" : "Inactive"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={open1} onClose={handleClose1}>
        <form onSubmit={addfunc}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Age"
              fullWidth
              value={addAge}
              onChange={(e) => setAddAge(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <form onSubmit={handleSaveEdit}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Age"
              fullWidth
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
