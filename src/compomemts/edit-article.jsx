import { useEffect, useState } from "react"
import Input from "../ui/input"
import TextArea from "../ui/textarea"
import ArticleService from "../service/article"
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const EditArticle = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch()
  const slug = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart())
      try {
        const response = await ArticleService.getArticleDetail(slug)
        setTitle(response.article.title)
        setDescription(response.article.description)
        setBody(response.article.body)
        dispatch(getArticleDetailSuccess(response.article))
      } catch (error) {
        dispatch(getArticleDetailFailure())
      }
    }

    getArticleDetail()
  }, [])


  const formSubmit = async e => {
    e.preventDefault()
    const article = { title, description, body }
    dispatch(postArticleStart())
    try {
      await ArticleService.editArticle(slug, article)
      dispatch(postArticleSuccess())
      navigate('/')
    } catch (error) {
      dispatch(postArticleFailure())
    }
  }

  return (
    <>
      <div className="text-center">
        <h1 className="fs-2"> Edit Article</h1>
      </div>
      <div className="w-50 ">
        <form onSubmit={formSubmit}>
          <Input type="text" label="Titleni kiriting" state={title} setState={setTitle} />
          <TextArea label="Description kiriting" state={description} setState={setDescription} />
          <TextArea label="Body" state={body} setState={setBody} height="200px" />

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
            Edit an article
          </button>
        </form>

      </div>
    </>
  )
}

export default EditArticle  