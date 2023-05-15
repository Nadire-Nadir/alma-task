import InputField from "./inputField";
import { inputFields, levelSelectField } from "../config";

const AddNewCoffee = ({
    onSubmit,
    coffeeData,
    handleChange,
    onClick,
    errorMessage,
}) => {
    return (
        <div className="dialog">
            <form onSubmit={onSubmit}>
                <p className="dialog-title">Add a new coffee</p>
                
                {inputFields.map((field) => (
                    <InputField
                        key={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        value={coffeeData[field.name]}
                        onChange={handleChange}
                        label={field.label}
                    />
                ))}

                <label className="form-item">
                    Roasting level:
                    <select
                        name="level"
                        value={coffeeData.level}
                        onChange={handleChange}
                        className="input"
                    >
                        {levelSelectField.map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                </label>

                {errorMessage && <p className="error form-item">{errorMessage}</p>}

                <div className="form-item">
                    <button
                        type="submit"
                        className="add-btn button blue-button"
                        disabled={
                            coffeeData.name === "" ||
                            coffeeData.weight === 0 ||
                            coffeeData.price === 0
                        }
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="cancel-btn button"
                        onClick={onClick}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewCoffee;
