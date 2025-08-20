import React from "react";
import {InputGroup, FormControl, DropdownButton, Dropdown, Button} from "react-bootstrap";

interface SearchBarProps {
    variant?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({variant = "outline-secondary"}) => {
    return (
        <InputGroup size="lg">
            <FormControl placeholder="Search datasets..." aria-label="Search" />
            <DropdownButton
                variant={variant}
                title="Filters"
                id="input-group-dropdown-2"
                align="end"
            >
                <Dropdown.Item eventKey="1">Resolution</Dropdown.Item>
                <Dropdown.Item eventKey="2">Image Size</Dropdown.Item>
                <Dropdown.Item eventKey="3">Signal/Noise</Dropdown.Item>
            </DropdownButton>
            <Button variant={variant}>Search</Button>
        </InputGroup>
    );
};

export default SearchBar;
