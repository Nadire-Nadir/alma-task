const InputField = ({ name, value, onChange, label, type }) => {
    return (
        <label className="form-item">
            {label}:
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="input"
                required
            />
        </label>
    )
}

export default InputField;