import React from 'react';
import {ListGroup, Pagination} from "react-bootstrap";
import Item from "../Item";
import {useSelector} from "react-redux";
import {getTotalPages} from "../../utils/getTotalPages";
import styles from './ItemList.module.scss'

const ItemList = () => {
    const {searchValue} = useSelector(state => state.statement);
    const filterStatements = useSelector(state => {
        return state.statement.statements.filter(i => {
            return i.address.toLowerCase().replace(/\s/g, "").includes(searchValue.toLowerCase().replace(/\s/g, ""))
        })
    })

    const [page, setPage] = React.useState(1);
    const pageArray = getTotalPages(filterStatements.length);

    const startIndex = (page - 1) * 8;
    const endIndex = startIndex + 8;
    const currentData = filterStatements.slice(startIndex, endIndex);
    console.log(pageArray)
    return (
        <>
            <ListGroup className={styles.list}>
                {currentData.map(item => (
                    <Item key={item.id} data={item}/>
                ))}
            </ListGroup>

            {pageArray.length === 1 ?
                null
                :
                <Pagination>
                    {pageArray.map(p =>
                        <Pagination.Item onClick={() => setPage(p)} key={p} active={p === page}>
                            {p}
                        </Pagination.Item>
                    )}
                </Pagination>}
        </>
    );
};

export default ItemList;