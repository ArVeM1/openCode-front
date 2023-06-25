export function getAccident(number) {
    switch (number) {
        case '1':
            return "Порыв"
        case '2':
            return "Утечка";
        case '3':
            return "Колонка уличная";
        case '4':
            return "Некачественная вода";
        case '5':
            return "Закупорка";
        case '6':
            return "Другое";
        default:
            return "Не указано";
    }
}

export function getPriority(number) {
    switch (number) {
        case '1':
            return "Незамедлительно"
        case '2':
            return "высокий";
        case '3':
            return "средний";
        case '4':
            return "низкий";
        default:
            return "Не указано";
    }
}

export const getColorByPriority = (priority) => {
    switch (priority) {
        case '1':
            return "#ffa500";
        case '2':
            return  "#f00";
        case '3':
            return "#00f";
        case '4':
            return "#0f0";
        default:
            return "#000";
    }
};