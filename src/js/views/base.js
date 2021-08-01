export const elements = {
    create : document.querySelector('.create_input'),
    projects: document.querySelector('.projects'),
    createTasks: document.querySelector('.create_tasks'),
    list: document.querySelector('.list')
}

export const clearContent = parent => parent.textContent = ` `

export const clearInput = parent => parent.value = ``;