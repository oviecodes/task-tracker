import uniqid from 'uniqid'
import moment from 'moment'


export default class Project{
    constructor(projectName) {
        this.name = projectName;
        this.id = uniqid();
        this.desc = '';
        this.tasks = [];
        this.progress = 0;
        this.completed = [];
        this.created = moment().fromNow();
        // use uniqid to generate random id for projet
    }

    addToTask(task) {
        let newTask = {task, id: uniqid()}
        this.tasks.push(newTask)
    }

    deleteTask(id) {
        let index = this.tasks.findIndex(el => el.id === id)
        this.tasks.splice(index, 1);
    }

    isCompleted(id){
        return this.completed.findIndex(el => el.id === id) !== -1
    }

    addDescription (desc){
        this.desc = desc;
    }

    completeTask(id){
        this.tasks.forEach(el => {
            if(el.id === id){
                this.completed.push(el)
            }
        })
    }

    deleteCompleted(id){
        let index = this.completed.findIndex(el => el.id === id)
        this.completed.splice(index, 1);
    }

    calculateProgress(){
        let perComplete = Math.round((this.completed.length/this.tasks.length) * 100)
        
        if (perComplete){
            this.progress =  perComplete;
        } else if(this.completed.length === 0){
            this.progress = 0;            
        }
    }
}


