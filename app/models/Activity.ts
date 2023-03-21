import { types } from "mobx-state-tree";
import { Project } from "./Project";

export const Activity = types.model({
    id: types.identifier,
    projectId: types.reference(Project),
    startDatetime: types.Date,
    endDatetime: types.Date,
})
