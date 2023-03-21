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
        getProjectById(id: string) {
            return self.projects.get(id)
        },
        deleteProjects() {
            self.projects.clear()
        }
    }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
