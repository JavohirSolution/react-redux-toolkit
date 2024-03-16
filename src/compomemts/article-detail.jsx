import { useParams } from "react-router-dom"
import ArticleService from "../service/article"
import { Loader } from "../ui"
import { useEffect } from "react"
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"

const ArticleDetail = () => {
    const slug = useParams()
    const dispatch = useDispatch()
    const { articleDetail, isLoading } = useSelector(state => state.article)

    useEffect(() => {
        const getArticleDetail = async () => {
            dispatch(getArticleDetailStart())
            try {
                const response = await ArticleService.getArticleDetail(slug)
                dispatch(getArticleDetailSuccess(response.article))
            } catch (error) {
                dispatch(getArticleDetailFailure())
            }
        }

        getArticleDetail()
    }, [slug])
    return (
        isLoading ? <Loader /> :
            articleDetail !== null && (
                <div>
                    <div className="p-3 mb-3 rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
                            <p className="col-md-8 fs-4">{articleDetail.description}</p>
                            <div className="d-flex gap-3">
                                <p className="text-muted">
                                    <span className="fw-bold">Created at:</span>  {moment(articleDetail.createdAt).format('DD MMM, YYYY')}
                                </p>

                            </div>
                            <div class="col-md-6">
                                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div class="col p-4 d-flex flex-column position-static">
                                        <strong class="d-inline-block mb-2 text-primary text-uppercase">{articleDetail.author.username}</strong>
                                        <p class="mb-0">{articleDetail.author.bio}</p>
                                        <div class="mb-1 text-body-secondary"></div>
                                        <p class="mb-auto"></p>
                                        <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                                        </a>
                                    </div>
                                    <div class="col-auto d-none d-lg-block">
                                        <svg class="bd-placeholder-img" width="200" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: صورة مصغرة" preserveAspectRatio="xMidYMid slice" focusable="false">
                                            <title>Placeholder
                                            </title>
                                            <rect width="100%" height="100%" fill="#55595c">
                                            </rect>
                                            <text x="50%" y="50%" fill="#eceeef" dy=".3em" className="text-uppercase fs-3 p-0 m-0">
                                                {articleDetail.author.username[0]}
                                            </text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p>{articleDetail.body}</p>
                        </div>
                    </div>
                </div>

            )
    )
}

export default ArticleDetail