
export const getTotalPages = (length) => {
    let itemsPerPage = 8;
    let totalPages = Math.ceil(length / itemsPerPage);
    const res = [];
    for (let i = 1; i <= totalPages; i++) {
        res.push(i);
    }
    return res;
}