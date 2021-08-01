import {elements} from './base'

const projectDesc = project => {
    if(project.desc){
        return `Description: ${project.desc}`
    } else {
        return `No description yet`
    }
}
export const renderProjects = project => {
    let markup = `
    <div class="col-xl-6 col-md-6 mb-4 project" data-itemid="${project.id}">
        <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
            <div class="col mr-2">
                <div class="text-md font-weight-bold text-primary text-uppercase mb-1">${project.name}</div>
                <div class="row no-gutters align-items-center">
                <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                </div>
                <div class='text-sm col-md-12'>
                    <p>${projectDesc(project)}</P>
                </div> 
                <div class="col-md-12 mb-2"> 
                    ${project.tasks.length} tasks
                </div>
                <div class="col-md-4 col-xs-6 offset-md-8 offset-xs-6"> 
                    ${project.progress}% completed
                </div>
                <div class="col-md-12">
                    <div class="progress progress-sm mr-2 my-2">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: ${project.progress}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                </div>
                <div>
                    <a class='btn btn-primary btn-sm mt-2 mb-1 view' href="#${project.id}"> View</a>
                    <a class='btn btn-danger btn-sm mt-2 mb-1 delete' href="#Delete"> Delete</a>
                    
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
    elements.projects.insertAdjacentHTML('afterbegin', markup)
}

export const getInput = () => elements.create.value;

