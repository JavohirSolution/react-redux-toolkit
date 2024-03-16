import { useCallback } from "react"
import { useSelector } from "react-redux"

const ValidationError = () => {
    const { error } = useSelector(state => state.auth)

    const errorMessage = useCallback(() => {
        return Object.keys(error).map(name => {
            const msg = error[name].join(", ")
            return `${name} - ${msg}`
        })
    }, [error])

    return (
        error !== null && errorMessage().map(error => (
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{error}</strong> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )))
}

export default ValidationError