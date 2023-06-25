

export const getStatementItems = () => {
    const data = localStorage.getItem('statements');
    const statements = data ? JSON.parse(data) : [];

    return {
        statements: statements,
        searchValue: '',
        count: statements.length,
    };
}