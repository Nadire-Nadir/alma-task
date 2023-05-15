import { useState, useEffect } from "react";
import AddNewCoffee from "./components/addNewCoffee";
import CoffeeList from "./components/coffeeList";
import SearchInput from "./components/searchInput";

import coffeeService from "./services/coffees";
import Notification from "./components/notification";
import "./styles/app.css";

const App = () => {
    const [coffees, setCoffees] = useState([]);
    const [coffeeData, setCoffeeData] = useState({
        name: "",
        weight: 0,
        price: 0.0,
        level: "1",
    });
    const [filteredCoffees, setFilteredCoffees] = useState([]);
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCoffees = () => {
        setLoading(true);
        coffeeService
            .getAllCoffees()
            .then((response) => {
              setCoffees(response);
              setLoading(false);
            })
            .catch((error) => {
              console.log("fetch error", error);
              setLoading(false);
          });
    };

    const fetchFilteredCoffees = () => {
        setLoading(true);
        coffeeService
            .getFilteredCoffees(keyword)
            .then((response) => {
                setFilteredCoffees(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
                setLoading(false);
            });
    };

    useEffect(fetchCoffees, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCoffeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSearchInputChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);

        if (newKeyword.trim() === "") {
            setFilteredCoffees([]);
        } else {
            fetchFilteredCoffees(keyword);
        }
    };

    const cleanForm = () => {
        setCoffeeData({
            name: "",
            weight: 0,
            price: 0.0,
            level: "",
        });
    };

    const closeDialog = () => {
        setOpen(false);
        cleanForm();
        setErrorMessage(null);
    };

    const addCoffee = (event) => {
        event.preventDefault();

        coffeeService
            .createCoffee(coffeeData)
            .then((response) => {
                setCoffees(coffees.concat(response));
                setMessage(`Added ${response.name}`);
                
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
                closeDialog();
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                console.log("error", error);
            });
    };

    const coffeesToShow = keyword ? filteredCoffees : coffees;

    return (
        <div className="App">
            <div className="page-container">
                <h1 className="page-title">My Favourite coffees</h1>

                <div className="add-button">
                    <button className="button blue-button" onClick={() => setOpen(!open)}>
                        Add new coffee
                    </button>
                </div>
                <div>
                    {open && (
                        <AddNewCoffee
                            onSubmit={addCoffee}
                            coffeeData={coffeeData}
                            onClick={closeDialog}
                            handleChange={handleChange}
                            errorMessage={errorMessage}
                        />
                    )}

                    <SearchInput
                        keyword={keyword}
                        onChange={handleSearchInputChange}
                    />
                </div>
                      
                <Notification message={message} />
                      
                {loading ?
                    <p>Loading ...</p>
                    :
                    <CoffeeList coffees={coffeesToShow} />
                }
            </div>
        </div>
    );
};

export default App;
