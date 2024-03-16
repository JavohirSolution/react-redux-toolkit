import { useState } from "react"
import Input from "../ui/input"
import TextArea from "../ui/textarea"
import ArticleService from "../service/article"
import { postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const CreateArticle = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.article)
  const navigate = useNavigate()

  const formSubmit = async (e) => {
    e.preventDefault()
    const article = { title, description, body }
    dispatch(postArticleStart())
    try {
      await ArticleService.postArticle(article)
      dispatch(postArticleSuccess())
      navigate("/")
    } catch (error) {
      dispatch(postArticleFailure())
    }
  }
  return (
    <>
      <div className="text-center">
        <h1 className="fs-2"> Create Article</h1>
      </div>
      <div className="w-50 ">
        <form onSubmit={formSubmit}>
          <Input type="text" label="Titleni kiriting" state={title} setState={setTitle} />
          <TextArea label="Description kiriting" state={description} setState={setDescription} />
          <TextArea label="Body" state={body} setState={setBody} height="200px" />

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create an article"}
          </button>
        </form>

      </div>
    </>
  )
}

export default CreateArticle