import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Activity } from "./Activity"
import { Project } from "./Project"

/**
 * A RootStore model.
 */
export const RootStoreModel = types
    .model("RootStore")
    .props({
        projects: types.map(Project),
        activities: types.map(Activity),
        currentProject: types.maybe(types.string),
    })
    .actions(self => ({
        addProject(title, color) {
            let id = Array.from(self.projects.values()).length.toString()
            self.projects.set(
                id,
                Project.create({
                    id: id,
                    title: title,
                    color: color,
                }))
            },
        addActivity(date, value, projectId) {
            let id = Array.from(self.activities.values()).length.toString()
            self.activities.set(
                id,
                Activity.create({
                    id: id,
                    date: date,
                    projectId: projectId,
                    value: value
                    
                })
            )
        },
        getProjectById(id: string) {
            return self.projects.get(id)
        },
        deleteActivities() {
            self.activities.clear()
        },
        deleteProjects() {
            self.projects.clear()
        },
        setCurrentProject(project) {
            self.currentProject = project;
        },
    }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
