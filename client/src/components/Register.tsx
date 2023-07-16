import axios from 'axios'
import * as React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

interface RegisterFormState {
  firstName: string
  lastName: string
  email: string
  password: string
  //   confirmPassword: string
}

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState<RegisterFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // confirmPassword: '',
  })

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
        'http://localhost:5000/api/signup',
        formData
      )
      console.log(response.data)
      navigate('/login')
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }

  return (
    <div>
      <h2>Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

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

        {/* <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group> */}

        <Button variant='primary' type='submit'>
          Register
        </Button>
      </Form>
      <div style={{ display: 'flex' }}>
        <p>
          Already have an account? <Link to='/login'>Login </Link>{' '}
        </p>
      </div>
    </div>
  )
}
