import { types } from "mobx-state-tree";
import { identifier, Instance } from "mobx-state-tree/dist/internal";
import { Activity } from "./Activity";

export const Project = types
    .model({
        id: types.refinement(types.identifier, identifier => identifier.indexOf("Project_") === 0),
        activities: types.optional(types.array(types.reference(Activity)), []),
        title: types.optional(types.string, "New Project"),
        color: types.string,
        priority: types.optional(types.integer, 0),
        howOftenInDays: types.optional(types.integer, 0),
    })
    .views(self => ({
        get velocity() {
            const v = Array.from(self.activities.slice()).reduce((acc: number, act: Instance<typeof Activity>) => {
                return acc + act.discountedValue(new Date());
            }, 0)
            return Math.round(v)
        },
        get activityCount() {
            console.log("activities", self.activities)
            return self.activities.length;
        },
    }))
    .actions(self => ({
        addActivity(activity: Instance<typeof Activity>) {
            self.activities.push(activity);
        },
        removeActivity(targetActivity: Instance<typeof Activity>) {
            const index = self.activities.findIndex(activity => (activity.id == targetActivity.id));
            if (index >= 0) self.activities.splice(index, 1);
        },
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