import {request} from "./request";

export function getLadderlist() {
    return request({
        url: '/admin/api/v1/service_type/ladderlist',
        method: 'GET',
    })
}

export function getTechnicalList() {
    return request({
        url: '/api/v1/technical/list',
        method: 'GET',
    })
}

export function getServiceList(params: any) {
    return request({
        url: '/api/v1/service/list',
        method: 'GET',
        params,
    })
}