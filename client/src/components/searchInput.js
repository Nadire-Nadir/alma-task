const SearchInput = ({keyword, onChange}) => {
    return (
        <div className="search">
            <input
                value={keyword}
                onChange={onChange}
                placeholder="Search coffee by name, weight or price"
            />
        </div>
    );
}

export default SearchInput;