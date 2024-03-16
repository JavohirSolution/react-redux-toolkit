import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../ui"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getArticleFailure, getArticleStart, getArticleSuccess } from "../slice/article"
import ArticleService from "../service/article"
import ArticleCard from "./article-card"

const Main = () => {
    const { articles, isLoading } = useSelector(state => state.article)
    const { user, isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getArticles = async () => {
        dispatch(getArticleStart())
        try {
            const response = await ArticleService.getArticles()
            dispatch(getArticleSuccess(response.articles))
        } catch (error) {
            dispatch(getArticleFailure(error))
        }
    }

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            <Link className="btn btn-primary position-absolute top-10" to={"/create-article"}>Create Article</Link>
            <div className="w-full m-0">
                <div className=" py-5">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {articles.map(item => (
                            <ArticleCard item={item} getArticles={getArticles} />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Main