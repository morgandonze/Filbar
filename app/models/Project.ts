import { types } from "mobx-state-tree";
import { identifier } from "mobx-state-tree/dist/internal";
import { Activity } from "./Activity";

export const Project = types
    .model({
        id: types.refinement(types.identifier, identifier => identifier.indexOf("Project_") === 0),
        activities: types.optional(types.array(Activity), []),
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
    .actions(self => ({
        updateTite(title) {
            self.title = title;
        },
        updateColor(color) {
            self.color = color;
        },
        update(title, color) {
            this.updateTite(title);
            this.updateColor(color);
        },

    }))