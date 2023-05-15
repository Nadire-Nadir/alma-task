const CoffeeList = ({ coffees }) => {
    return (
        <div className="coffee-list">
            {coffees.map((coffee) => (
                <div key={coffee.id} className="coffee-card">
                    <div className="coffee-card-content">
                        <p>
                            <span className="label">{"Name:"} </span>
                            {coffee.name}
                        </p>
                        <p>
                            <span className="label">{"Weight (grams): "}</span>
                            {coffee.weight}
                        </p>
                        <p>
                            <span className="label">{"Price(€): "}</span>
                            {coffee.price}
                        </p>
                        <p>
                            <span className="label">{"Roasting level: "}</span>
                            {coffee.level}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoffeeList;
