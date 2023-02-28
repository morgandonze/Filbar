import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const Project = types.model({
    id: types.identifier,
    title: types.optional(types.string, "New Project"),
    color: types.optional(types.string, "#0792e3"),
    velocity: types.optional(types.number, 0),
    priority: types.optional(types.integer, 0),
    howOftenInDays: types.optional(types.integer, 0),
})

export const Activity = types.model({
    id: types.identifier,
    projectId: types.reference(Project),
    startDatetime: types.Date,
    endDatetime: types.Date,
})

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
