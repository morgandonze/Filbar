import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Activity } from "./Activity"
import { Project } from "./Project"
import uuid from 'react-native-uuid';

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
            let id = "Project_" + uuid.v4();
            self.projects.set(
                id,
                Project.create({
                    id: id,
                    title: title,
                    color: color,
                }))
            },
        addActivity(date, value, projectId) {
            let id = "Activity_" + uuid.v4();
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
