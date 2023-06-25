import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Input from "../components/Input";
import ItemList from "../components/ItemList";
import CreateModal from "../components/Modals/CreateModal";
import {useDispatch, useSelector} from "react-redux";
import {setSearch} from "../redux/slices/statements";

const Journal = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const {statements, searchValue} = useSelector(state => state.statement);

    const navigate = useNavigate();

    const isMounted = React.useRef(false);
    React.useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(statements);
            localStorage.setItem('statements', json);
        }

        isMounted.current = true;
    }, [statements]);

    const handleOpen = () => {
        setOpen(true);
        navigate("/statement/add");
    };
    const handleClose = () => {
        setOpen(false);
        navigate("/statement");
    };

    const changeValue = (e) => {
        dispatch(setSearch(e.target.value));
    }
    return (
        <div>
            <Button
                variant="primary"
                className="home-btn"
                onClick={handleOpen}
            >
                Создать заявку
            </Button>
            <Routes>
                <Route path={"add"} element={<CreateModal handleClose={handleClose} open={open}/>}/>
            </Routes>

            <Input value={searchValue} setValue={changeValue}/>
            <ItemList/>


        </div>
    );
};

export default Journal;