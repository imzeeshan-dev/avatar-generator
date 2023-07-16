import * as React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom'

import Main from './Main'
import history from '../history'
import { Register } from './Register'
import { Login } from './Login'

type MyProps = {};
type MyState = { user: boolean };

export default class App extends React.Component<MyProps, MyState> {

  constructor(props:any) {
    super(props);

    this.state = {
      user: false
    }
  }

  // static getDerivedStateFromProps(props:any, state:any) {
  //   if(localStorage.getItem("user")) {
  //     return {user: true}
  //   } else {
  //     return {user: false}
  //   }
  // }


  componentDidMount() {
    // force an update if the URL changes
    history.listen(() => this.forceUpdate())
  }

  // static getDerivedStateFromProps(props:any, state:any) {
  //   console.log('getDerivedStateFromProps', props, state);
  //   console.log("localStorage.getItem('user')", localStorage.getItem('user'));
    
  // }

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Main />}
          />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    )
  }
}
