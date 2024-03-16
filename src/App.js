import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main, Login, Register, Navbar, ArticleDetail, CreateArticle, EditArticle } from "./compomemts"
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { signUserSuccess } from './slice/auth'
import { getItem } from './helpers/persistence'

const App = () => {
  const dispatch = useDispatch()

  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    const token = getItem('token')
    if (token) {
      getUser()
    }
  }, [])

  return (
    <div className="container py-3">
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/article/:slug' element={<ArticleDetail />} />
        <Route path='/create-article' element={<CreateArticle />} />
        <Route path='/edit-article/:slug' element={<EditArticle />} />
      </Routes>
    </div>
  )
}

export default App