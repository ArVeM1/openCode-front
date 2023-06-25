import React from 'react';
import {ListGroup} from "react-bootstrap";
import styles from './Item.module.scss';
import UpdateModal from "../Modals/UpdateModal";
import {Route, Routes, useNavigate} from "react-router-dom";
import {getAccident, getPriority} from "../../utils/getName";

const Item = ({data}) => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
        navigate(`/statement/${data.id}`)
    };
    const handleClose = () => {
        setOpen(false);
        navigate(`/statement`)
    };

    return (
        <>
            <ListGroup.Item className={styles.root}>
                <div className={styles.address}>
                    <p className={styles.title}>Адрес</p>
                    <p className={styles.descr}>{data.address.length > 23 ? data.address.substring(0, 23) + "..." : data.address}</p>
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>Тип аварии</p>
                    <p className={styles.descr}>{getAccident(data.accidentType)}</p>
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>Приоритет</p>
                    <p className={styles.descr}>{getPriority(data.priority)}</p>
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>Заявитель</p>
                    <p className={styles.descr}>{data.applicant ? data.applicant : 'Не указано'}</p>
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleOpen}>Подробнее</button>
                </div>
            </ListGroup.Item>

            <Routes>
                <Route path={`/${data.id}`} element={
                    <UpdateModal
                    handleClose={handleClose}
                    open={open}
                    data={data}
                />} />
            </Routes>
        </>
    );
};

export default Item;