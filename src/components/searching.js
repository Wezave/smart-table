import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    // ПРАВИЛЬНО: передаём массив СТРОК (имен правил)
    // и добавляем searchMultipleFields как custom rule
    const compare = createComparison(
        ['skipEmptyTargetValues'],  // Имена правил как строки
        [
            rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
        ]
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(row => compare(row, state));
    }
}