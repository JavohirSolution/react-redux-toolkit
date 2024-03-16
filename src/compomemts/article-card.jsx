import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ArticleService from "../service/article"

const ArticleCard = ({ item, getArticles }) => {
  const navigate = useNavigate()
  const { articles, isLoading } = useSelector(state => state.article)
  const { user, isLoggedIn } = useSelector(state => state.auth)
  const slug = useParams()


  const deleteArticle = async (slug) => {
    try {
      await ArticleService.removeArticle(slug)
      getArticles()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col" key={item.id}>
      <div className="card h-100 shadow-sm">
        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        <div className="card-body">
          <p className="card-text fw-bold m-0">{item.title}</p>
          <p className="card-text ">{item.description}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-success" onClick={() => navigate(`/article/${item.slug}`)}>View</button>
            {isLoggedIn && user.username === item.author.username && (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate(`/edit-article/${item.slug}`)}
                >Edit</button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteArticle(item.slug)}
                >Delete</button>
              </>
            )}
          </div>
          <small className="text-body-secondary text-capitalize fw-bold">{item.author.username}</small>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard