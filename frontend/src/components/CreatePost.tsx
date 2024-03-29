import React, {useState} from 'react';
import {Box, Button, CardActions, Container, Grid, MenuItem, Paper, TextField, Typography,} from '@mui/material';
import Axios from '../config/axiosConfig';
import useForm from '../hooks/useForm';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation, useNavigate} from 'react-router-dom';

export const categories = ["Їжа", "Матеріали", "Засоби гігієни", "Одяг", "Техніка", "Меблі"];

export interface IPost {
  userId: number;
  title: string;
  description: string;
  type: String;
  category: string;
  city: string;
  linkContacts?: {
    instagram: string;
    telegram: string;
  };
}

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [postType, setPostType] = useState('');
  const [category, setCategory] = useState<string | null>('');
  const [city, setCity] = useState('');
  
  const {errors} = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/home';
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();
    
    const id = toast.loading('Pending...');
    
    try {
      if (!(JSON.stringify(errors) === '{}')) throw Error('Entered values must be correct');
      
      const res = await Axios.post(
        '/api/create',
        {
          title: title,
          description: description,
          
          postType: postType,
          category: category,
          city: city,
        },
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        }
      );
      
      toast.update(id, {
        render: res.data.message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      setTimeout(() => {
        navigate('/home', {replace: true});
      }, 1500);
    } catch (error: any) {
      const err = error?.response?.data?.message || error.message;
      toast.update(id, {render: err, type: 'error', isLoading: false, autoClose: 3000, closeOnClick: true});
    }
  };
  
  return (
    <>
      <Container>
        <ToastContainer autoClose={5000}/>
        <Grid container justifyContent={'center'}>
          <Grid item xs={10} sm={8} md={6} sx={{marginTop: 3, marginBottom: 3}}>
            <Paper
              elevation={8}
              sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
               <Button color="inherit"
                       sx={{margin: '0 0 0 auto', minWidth: '30px', color: '#4c4c4c', transform: 'scale(0.8)'}}
                       onClick={() => {
                         navigate('/home', {replace: true});
                       }}>
                x
              </Button>
              <Typography color={'primary'} component="h2" variant="h5" textAlign={'center'}>
                Новий допис
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e)}
                padding={5}
                sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '80%'}}
              >
                <TextField
                  select
                  id="type"
                  name="type"
                  label="Тип"
                  onChange={(e) => {
                    setPostType(e.target.value);
                  }}
                  fullWidth
                  required
                  defaultValue={''}
                  sx={{marginBottom: '30px'}}
                >
                  <MenuItem key="help" value="help">
                    Можу допомогти
                  </MenuItem>
                  <MenuItem key="needHelp" value="needHelp">
                    Потребую допомоги
                  </MenuItem>
                </TextField>
                <TextField
                  id="title"
                  name="title"
                  label="Заголовок"
                  fullWidth
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <TextField
                  id="description"
                  name="description"
                  label="Опис"
                  fullWidth
                  required
                  multiline
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <TextField
                  select
                  id="category"
                  name="category"
                  label="Категорія"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  fullWidth
                  required
                  defaultValue={""}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="city"
                  name="city"
                  label="Місто"
                  fullWidth
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <CardActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                  <Button type="submit" variant="contained" size="medium">
                    Створити
                  </Button>
                </CardActions>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
