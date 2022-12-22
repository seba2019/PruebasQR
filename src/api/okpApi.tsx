import axios from 'axios';

const token =
  //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlZ29uemFsZXoiLCJvcmlnZW4iOiJPa1BhZ29zIiwiaWREaXNwb3NpdGl2byI6IjcwMERFRkE0N0E3RTJBRDQiLCJuYmYiOjE2NjQ2MzU4MjYsImV4cCI6MTk4MDI1NTAyNiwiaWF0IjoxNjY0NjM1ODI2fQ.9xweHUMhw2PCbDzKFrjoXHVd_u_zE19zkVMPn6iU9GY'; //Guille
  //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN2ZWdhIiwib3JpZ2VuIjoiT2tQYWdvcyIsImlkRGlzcG9zaXRpdm8iOiIyNUE4OEI3NkFGNDk0RDM5IiwibmJmIjoxNjYyNjQyMDkxLCJleHAiOjE5NzgyNjEyOTEsImlhdCI6MTY2MjY0MjA5MX0.og9w3mWXw8aG4vMd_EqW1kFe5yHMsaqJiG9jLqUCUIU'; //Seba
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1yaW9zIiwib3JpZ2VuIjoiT2tQYWdvcyIsImlkRGlzcG9zaXRpdm8iOiJDOUI1QkJGQ0M0MzgwQjhCIiwibmJmIjoxNjYyNzI5Njc0LCJleHAiOjE5NzgzNDg4NzMsImlhdCI6MTY2MjcyOTY3NH0.zhoYkHupXILNpkF2iIwbumqX5LvXtZY1qF5mD5VwPno'; //Token Tincho
const okpApi = axios.create({
  baseURL: 'https://www.okpagos.com.ar/webapi',
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

export default okpApi;
