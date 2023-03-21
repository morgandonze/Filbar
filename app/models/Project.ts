import { types } from "mobx-state-tree";

export const Project = types
    .model({
        id: types.identifier,
        title: types.optional(types.string, "New Project"),
        color: types.string,
        priority: types.optional(types.integer, 0),
        howOftenInDays: types.optional(types.integer, 0),
    })
    .views(self => ({
        get velocity() {
            return 100;
        }
    }))