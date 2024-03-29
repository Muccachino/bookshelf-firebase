import CheckBox  from "@mui/material/Checkbox";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useBooks, { TBook } from "./useBooks";

export type EditedBook = {
  id?: string;
  title: string;
  author: string;
  pages: number;
  read: boolean;
  createdAt?: Date;
  imageURL?: string;
  uid?: string;
}


interface Props {
  open: boolean;
  handleClose: () => void;
  newBook: boolean;
  currentBook: TBook | null
}

export default function Form({open, handleClose, newBook, currentBook}: Props) {


  const [formData, setFormData] = useState<EditedBook>({
    title: "",
    author: "",
    pages: 0,
    read: false,
  })

  useEffect(() => {
    if(currentBook) {
      const editFormData = {
        id: currentBook.id,
        title: currentBook.title,
        author: currentBook.author,
        pages: currentBook.pages,
        read: currentBook.read,
        createdAt: currentBook.createdAt,
        imageURL: currentBook.imageURL,
        uid: currentBook.uid,

      };
      setFormData(editFormData)
    }
  }, [currentBook])


  const[, addBook, , ,editBook] = useBooks();

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{newBook ? "Add Book" : "Edit Book"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{newBook ? "Add a Book to the Bookshelf" : "Edit Book in Bookshelf"}</DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="title"
          label="Book Title"
          type="text"
          fullWidth
          variant="standard"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value})}
          />
        <TextField
          required
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value})}
          />
        <TextField
          required
          margin="dense"
          id="pages"
          label="Pages"
          type="number"
          fullWidth
          variant="standard"
          value={formData.pages}
          onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value)})}
          />
        <FormControlLabel control={<CheckBox checked={formData.read} onChange={(e) => setFormData({ ...formData, read: e.target.checked})}/>} label="Read?"/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {newBook && 
          <Button onClick={() => {
            (addBook as (book: TBook) => Promise<void>)(formData as TBook);
            setFormData({
              title: "",
              author: "",
              pages: 0,
              read: false,
            });
            handleClose()
          }}
          >Add Book</Button>}
        {!newBook &&
          <Button onClick={() => {
            (editBook as (book: TBook) => Promise<void>)(formData as TBook);
            setFormData({
              title: "",
              author: "",
              pages: 0,
              read: false,
            });
            handleClose()
          }}
          >Save Changes</Button>}
      </DialogActions>
    </Dialog>
  )
}