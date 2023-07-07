import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(setIsLoading(true));

    axios
      .post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch((error) => {
        if (error.response.status === 401) alert('Credenciales Incorrectas');
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <div className="py-5 flex justify-center text-center">
      <Form
        onSubmit={handleSubmit(submit)}
        border="primary"
        style={{ border: '4px solid', padding: '20px' }}
      >
        <h1>Inicia Sesion</h1>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label>Email</Form.Label>

          <Form.Control type="email" placeholder="Email" {...register('email')} />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Button type="submit" className="bg-sky-500 hover:bg-sky-700">
            Sign in
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
