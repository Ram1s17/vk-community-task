import { GetGroupsResponse } from "../types/types";
import { mockGroups } from "./groups";

export function getGroups(): Promise<GetGroupsResponse> {
    return new Promise(resolve => {
        setTimeout(() => {
            const response: GetGroupsResponse = {
                result: 1,
                data: mockGroups
            }
            resolve(response)
        }, 1000)
    })
}