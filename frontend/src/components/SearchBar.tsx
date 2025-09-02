import {FC, useContext} from "react";
import {InputGroup, FormControl, DropdownButton, Dropdown, Button} from "react-bootstrap";
import AppContext from "../interfaces/types";

interface SearchBarProps {
    variant?: string;
}

const SearchBar: FC<SearchBarProps> = ({variant = "outline-secondary"}) => {
    const {
        searching: [, setSearching],
        searchText: [, setSearchText]
    } = useContext(AppContext)!;

    const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        setSearchText(value);
        // console.log(value);
    };

    const onSearchPress = () => {
        setSearching(true);
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
