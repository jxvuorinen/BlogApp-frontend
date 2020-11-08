import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { Switch, Route, useHistory, Redirect, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import Login from './components/Login'
import User from './components/User'
import Navigation from './components/Navigation'
import BlogInfo from './components/BlogInfo'
import { uniqBy } from 'lodash'
import { Container } from 'react-bootstrap'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = blogs.map(blog => blog.user)
  const uniqueUsers = uniqBy(users, 'id')

  const history = useHistory()

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  if (!user) {
    return (
      <Container className="justify-content-md-center mt-2 mb-2">
        <Notification />
        <h2>Please login</h2>
        <Login history={history} />
      </Container >
    )
  }

  return (
    <Container className="justify-content-md-center mt-2 mb-2">
      <Notification />
      <Navigation user={user} history={history} />
      <Switch>
        <Route path='/users/:id'>
          <User blogs={blogs} userMatch={userMatch} users={users} uniqueUsers={uniqueUsers} />
        </Route>

        <Route path='/blogs/:id'>
          <BlogInfo blogs={blogs} blogMatch={blogMatch} user={user} />
        </Route>

        <Route path='/blogs'>
          <BlogList blogs={blogs} history={history} user={user} />
        </Route>

        <Route path='/users'>
          <Users blogs={blogs} uniqueUsers={uniqueUsers} />
        </Route>

        <Route path='/'>
          <Redirect to='/blogs' />
        </Route>

      </Switch>
    </Container >
  )
}

export default App