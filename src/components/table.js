import {cloneTemplate} from "../lib/utils.js";

/**
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    before.reverse().forEach(subName => {                        
        root[subName] = cloneTemplate(subName);          
        root.container.prepend(root[subName].container);
    });

    after.forEach(subName => {                    
        root[subName] = cloneTemplate(subName);          
        root.container.append(root[subName].container);   
    });

    root.container.addEventListener('change', function () {
        onAction();
    });
    root.container.addEventListener('reset', function () {
        setTimeout(onAction);
    });
    root.container.addEventListener('submit', function(e) {
        e.preventDefault();
        onAction(e.submitter);
    })


    const render = (data) => {
        const nextRows = data.map(item => { 
            const row = cloneTemplate(rowTemplate);
            Object.keys(item).forEach(key => {
                if (key in row.elements) {
                    if (row.elements[key].tagName === 'input' || row.elements[key].tagName === 'select') {
                        row.elements[key].value = item[key];
                    } else {
                        row.elements[key].textContent = item[key];
                    }
                    
                }
            });
            return row.container
        })
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}