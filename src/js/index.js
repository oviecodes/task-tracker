import Project from './models/Project'
import * as homeView from './views/homeView'
import * as projectView from './views/projectView'
import {elements,clearContent, clearInput} from './views/base'


let state = {
    projects: []
};



const createNewProject = () => {
    //check if there is a project to be created
    let projectName = homeView.getInput();
    

    if(projectName && !(/^\s/.test(projectName))){
    // create a new project and push to state.project
        let project = new Project(projectName)
        state.projects.push(project);
        //persist data
        persistData(state.projects)
    }

    // update the ui
    clearContent(elements.projects);
    clearInput(elements.create)
    state.projects.forEach(el => homeView.renderProjects(el))
}

document.querySelector('.create').addEventListener('submit', e => {
    e.preventDefault();
    createNewProject();
});
window.r = state;




const getProject = () => {
    // get project id of the project
    let id = window.location.hash.replace('#', '')

    // find the project using the id
    let project = state.projects.find(el => el.id === id)
    return project
}

// render project details
const projectMore = () => {
   // get project
    let project = getProject()
    // render contents of the project
    clearContent(elements.projects);
   
    projectView.renderTasks(project)
    if(project.tasks.length > 0) {
        projectView.renderTaskList(project);
        
    }
    persistData(state.projects)
    
}


// update project tasks
const updateTasks = () => {
    // get input to be added to tasks list
    let taskname = projectView.getInput()
    
    //get project
    let project = getProject()
    //create a new task
    project.addToTask(capitalize(taskname))
    project.calculateProgress();
    document.querySelector('.task_input').value = ``
    
    
}


elements.projects.addEventListener('submit', e => {
    if(e.target.matches('.create_tasks')){
        //viewing a project
        e.preventDefault();
        updateTasks();
        projectMore();
        // deleting a task 
    } 
})

elements.projects.addEventListener('click', e => {

    // delete tasks
    let id;
    let project = getProject();
    if(e.target.matches('.delete_task')){
        //delete task
        //get id
        id = e.target.closest('.task').dataset.itemid
        
       
        project.deleteTask(id);
        // if project is completed delete it from completed array
        if(project.isCompleted(id)){
            project.deleteCompleted(id)
            

        }
        
        project.calculateProgress();
        projectMore();
        
        

        
    } else if(e.target.matches('.task_complete')){
        // complete task
        id = e.target.closest('.task').dataset.itemid;
       
       
        if(!project.isCompleted(id)){
            project.completeTask(id);
            project.calculateProgress();
            
        } else{
            project.deleteCompleted(id)
            project.calculateProgress();
        }
        
        projectMore();
        
    } else if(e.target.matches('.addDesc')){
        // add task description
        let desc = projectView.getDesc();
        document.querySelector('.description').value = ``
        
        project.addDescription (capitalize(desc))
        projectMore();
        //go back
    } else if(e.target.matches('.back')){
        clearContent(elements.projects)
        state.projects.forEach(el => homeView.renderProjects(el))
        //write description
    } else if(e.target.matches('.descPen')){
        document.querySelector('.hide').classList.toggle('display')
        //on delete
    } else if (e.target.matches('.delete')){
        id = e.target.closest('.project').dataset.itemid;
        let index = state.projects.findIndex(el => el.id === id)
        state.projects.splice(index, 1)
        //persist data
        persistData(state.projects)
         
        clearContent(elements.projects);
        clearInput(elements.create)
        if(state.projects.length > 0){
            state.projects.forEach(el => homeView.renderProjects(el))
        }           
    } 

})

const figureRender = () => {
    if(window.location.hash.replace('#', '') === 'projects'){
        clearContent(elements.projects)
        state.projects.forEach(el => homeView.renderProjects(el))
    } else if(window.location.hash.replace('#', '') === 'Delete'){
        
    } else if(window.location.hash.replace('#', '') === ''){
        window.location.hash = '#projects'
    }
     else{
        projectMore();
    }
}

window.addEventListener('hashchange', figureRender)

window.addEventListener('load', () => {
    retrieveData();
    state.projects.forEach(el => homeView.renderProjects(el))
    if(window.location.hash.replace('#', '') === 'projects'){
        clearContent(elements.projects)
        state.projects.forEach(el => homeView.renderProjects(el))
    } else if (window.location.hash.replace('#', '') === 'Delete'){

    } else if(window.location.hash.replace('#', '') === ''){
        window.location.hash = '#projects'
    }
    else {
        projectMore()
    }
})


const capitalize = (word) => {
    let arr = word.split('');
    let conc = arr.slice(0, 1);
    let von = conc[0].toUpperCase()
    let newA = arr.splice(0, 1);
   return von.concat(arr.join(''))
}


// using local storage to store projects
const persistData = projects =>{
    localStorage.setItem('projects', JSON.stringify(state.projects));
    
}


// retrieving Data from local Storage
const retrieveData = () => {
    const storage = JSON.parse(localStorage.getItem('projects'))
    if(storage) {
      storage.forEach(el => {
          //create a new class from each item in storage 
        let project = new Project(el.name)
        project.id = el.id
        project.desc = el.desc
        project.tasks = el.tasks
        project.completed = el.completed
        project.progress = el.progress
        project.created = el.created;
        state.projects.push(project)
      })
    }
}





