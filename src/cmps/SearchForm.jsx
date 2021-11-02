import React, { useState, useEffect } from "react"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { makeStyles } from '@material-ui/styles';

export const SearchForm = ({ submitSearch, handleSearchChange, searchOptions }) => {

    const useStyles = makeStyles(() => ({
        searchForm: {
            marginBottom: "20px",
        },
    }))

    const classes = useStyles()

    const [searchTxt, setSearchTxt] = useState('')

    useEffect(() => {
        if (!searchTxt || searchTxt === '') return
        handleSearchChange(searchTxt)
    }, [searchTxt])

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (!searchTxt || searchTxt === '') return
        submitSearch(searchTxt)
        setSearchTxt('')
    }

    return (
        <form onSubmit={onSubmit} className={classes.searchForm}>
            <Autocomplete
                clearOnBlur
                onSelect={ev => setSearchTxt(ev.target.value)}
                onInputChange={ev => setSearchTxt(ev.target.value)}
                required
                freeSolo
                id="free-solo"
                options={searchOptions.map((option) => `${option.LocalizedName}`)}
                renderInput={(params) => (
                    <TextField
                        variant="outlined"
                        sx={{ ml: 1, flex: 1 }}
                        {...params}
                        placeholder="Search for Location"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </form>
    )
}