import {FC, useContext} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import AppContext from "../interfaces/types";
import {useNavigate} from "react-router-dom";

interface SearchBarProps {
    variant?: string;
}

const SearchBar: FC<SearchBarProps> = ({variant = "outline-secondary"}) => {
    const {
        searchText: [, setSearchText]
    } = useContext(AppContext)!;
    const navigate = useNavigate();

    const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        setSearchText(value);
        navigate("/search");
        // console.log(value);
    };

    const onSearchPress = () => {
        navigate("/search");
    };

    return (
        <InputGroup size="lg">
            <FormControl
                placeholder="Search datasets..."
                aria-label="Search"
                onChange={onSearchChange}
            />
            <Button variant={variant} onClick={onSearchPress}>
                Search
            </Button>
        </InputGroup>
    );
};

export default SearchBar;
