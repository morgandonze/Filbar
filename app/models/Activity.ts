import { types } from "mobx-state-tree";
import { Project } from "./Project";

export const Activity = types.model({
    id: types.identifier,
    projectId: types.reference(Project),
    date: types.Date,
    value: types.number,
})
.actions(self => ({
}))
.views(self => ({
    discountedValue(now: Date) {
        const dt = now.valueOf() - self.date.valueOf();
        const T = 1 * 24 * 60 * 60 * 1000 / 20;
        return Math.exp(-dt/T)
    }
}))
