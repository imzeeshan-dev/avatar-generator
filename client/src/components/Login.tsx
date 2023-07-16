import * as React from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

interface RegisterFormState {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState<RegisterFormState>({
    email: '',
    password: '',
  })

  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Perform form submission or validation logic here
    console.log(formData)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        formData
      )
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response?.data?.user))
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      <div style={{ display: 'flex' }}>
        <p>
          Don't have an account? <Link to='/register'>Register </Link>{' '}
        </p>
      </div>
    </div>
  )
}
