import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Activity } from "./Activity"
import { Project } from "./Project"
import uuid from 'react-native-uuid';

/**
 * A RootStore model.
 */
export const RootStoreModel = types
    .model("RootStore")
    .props({
        projects: types.optional(types.array(Project), []),
        activities: types.optional(types.array(Activity), []),
        currentProject: types.maybe(types.string),
    })
    .actions(self => ({
        reset() {
            applySnapshot(self, {})
        },
        addProject(title, color) {
            let id = "Project_" + uuid.v4();

            self.projects.push(
                Project.create({
                    id: id,
                    title: title,
                    color: color,
                }))
        },
        addActivity(date, value, projectId) {
            let id = "Activity_" + uuid.v4();
            const activity = Activity.create({
                id: id,
                date: date,
                projectId: projectId,
                value: value
            })
            self.activities.push(activity)
            return activity;
        },
        deleteProject(projectId: string) {
            let index = self.projects.findIndex(project => (project.id == projectId));
            self.projects.splice(index, 1);
        },
        getProjectById(projectId: string) {
            return self.projects.find(project => (project.id == projectId));
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
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
