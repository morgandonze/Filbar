import { types } from "mobx-state-tree";
import { Project } from "./Project";

export const Activity = types.model({
    id: types.refinement(types.identifier, identifier => identifier.indexOf("Activity_") === 0),
    // projectId: types.reference(Project),
    projectId: types.string,
    date: types.Date,
    value: types.number,
})
.actions(self => ({
}))
.views(self => ({
    discountedValue(atDate: Date) {
        const dt = atDate.valueOf() - self.date.valueOf();
        const T = 1 * 24 * 60 * 60 * 1000
        return Math.exp(-dt/T) * self.value
    }
}))
