class Tooltip {}

class ProjectItem {
    constructor(id, updateprojectListFunction) {
        this.id = id;
        this.updateprojectListHandler = updateprojectListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }
    connectMoreInfoButton() {};

    connectSwitchButton() {
        const ProjectItemElement = document.getElementById(this.id);
        const switchBtn = ProjectItemElement.querySelector('button:last-of-type');
        switchBtn.addEventListener('click', this.updateprojectListHandler);
    }
}

class ProjectList {
    projects = [];

    constructor(type, switchHandlerFunction) {
        this.type = type;
        this.switchHandler = switchHandlerFunction;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)))
        }
        console.log(this.projects);
    }

    // switchProject(projectId) {
    //     this.switchHandler = this.projects.filter(p => p.id === projectId)
    // }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId))
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');

        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));     
    }
}

App.init();