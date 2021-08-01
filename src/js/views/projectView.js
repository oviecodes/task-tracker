import {elements} from './base'

const colorCheck = (project, id) => {

    if(project.completed.length > 0){
        let class_
        project.completed.forEach(el => {
            if(el.id ===  id){
                class_ =  'colorCheck'
            } 
            
        })
        return class_
    }
   
}

export const renderTaskList = project => {
    let tasks = project.tasks.map(element => `<div class='my-4 ml-2 task' data-itemid="${element.id}"><i class='fas fa-trash mr-3 delete_task py-3 px-3'></i> ${element.task} <i class='fas fa-check ml-md-5 ml-md-3 task_complete ${colorCheck(project, element.id)}'></i></div>`);

    document.querySelector('.list').insertAdjacentHTML('beforeend', tasks.join(''))
}

export const renderTasks = (project) => {
    let markup = `
    </div>
    <div class="col-xl-10 col-md-10 offset-md-1 col-sm-12 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
            <div class="col mr-2">
                <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">${project.name}</div>
                <div class="row no-gutters align-items-center">
                <div class='col-md-12'>
                    <div class='text-md mb-1'>${project.desc}</div>
                    <a class="" id="searchDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-pen-alt fa-fw descPen"></i>
                    </a>
                    <form class="hide">
                        <div class="form-group ">
                            <label for="exampleFormControlTextarea1">Add project description...</label>
                            <textarea class="form-control description" id="exampleFormControlTextarea1" rows="4" mr-auto></textarea>
                        </div>
                        <button class="btn btn-primary mb-3 addDesc" type="button">
                            Add
                        </button>
                    </form>

                </div>

                <div class='cl-md-12 mb-3 text-sm'>
                    <p>Created ${project.created}</P>
                </div>
                <div class="col-md-12">
                    <div class="h5 mt-3 mb-1 mr-3 text-gray-800">Tasks List</div>
                </div>
                <form class="form-inline mr-auto w-100 d-sm-inline-block  mb-md-3 my-2 my-md-0 col-md-12 create_tasks">
                  <div class="input-group">
                    <input type="text" class="form-control bg-light border-0 small task_input" placeholder="Add task..." aria-label="Search" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-primary add_task" type="button">
                        <i class="fas fa-pen-alt fa-sm "></i>
                      </button>
                    </div>
                  </div>
                </form>

                <div class="list">
                    
                </div>
                <div class="col-md-12">
                    <div class="text-sm font-weight-bold text-primary text-uppercase mb-1">${project.progress}% complete</div>
                    <div class="progress progress-lg mr-2 my-2">
                        <div class="progress-bar bg-primary " role="progressbar" style="width: ${project.progress}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                </div>
                <div>
                    <a class='btn btn-primary btn-sm my-2 back' href="#projects"> Back</a>
                </div>
            </div>
            
            <div class="col-auto">
                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
            </div>
            </div>
        </div>
        </div>
    </div>
    `
    elements.projects.insertAdjacentHTML('beforeend', markup)
}

export const getInput = () => document.querySelector('.task_input').value;
export const getDesc = () => document.querySelector('.description').value;

// let tasks = [{tasks: 'do to', id: 3}, {tasks: 'do it', id: 4}]
// let tasks2 = [{tasks: 'do to', id: 3}]
// task.forEach(el => {
//     if(el.id === 3) 
//     console.log('yes')
//     else console.log('no')
// })
