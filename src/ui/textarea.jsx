const TextArea = ({ label, state, setState, height = "100px" }) => {
    return (
        <div className="form-floating">
            <textarea
                value={state}
                className="form-control mt-2"
                placeholder={label}
                onChange={e => setState(e.target.value)}
                id="floatingTextarea2"
                style={{ height: height }}
            />
            <label htmlFor="floatingTextarea2">{label}</label>
        </div>)
}

export default TextArea