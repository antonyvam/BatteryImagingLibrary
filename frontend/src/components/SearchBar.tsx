import {FC, useContext} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import AppContext, {MAX_L_PX, MAX_SIZE_NM} from "../interfaces/types";
import {useNavigate} from "react-router-dom";

interface SearchBarProps {
    variant?: string;
}

const SearchBar: FC<SearchBarProps> = ({variant = "outline-secondary"}) => {
    const {
        searchText: [, setSearchText],
        resRange: [, setResRange],
        sizeRange: [, setSizeRange],
        selectedModalities: [, setSelectedModalities]
    } = useContext(AppContext)!;
    const navigate = useNavigate();

    const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        setSearchText(value);
        navigate("/search");
    };

    const onSearchPress = () => {
        setSelectedModalities([]);
        setSearchText("");
        setResRange({lower: 0, upper: MAX_SIZE_NM});
        setSizeRange({lower: 0, upper: MAX_L_PX});
        navigate("/search");
    };

    return (
        <InputGroup size="lg">
            <FormControl
                placeholder="Search datasets..."
                aria-label="Search"
                onChange={onSearchChange}
            />
            <Button style={{backgroundColor: "#0d6efd"}} onClick={onSearchPress}>
                Browse all
            </Button>
        </InputGroup>
    );
};

export default SearchBar;
