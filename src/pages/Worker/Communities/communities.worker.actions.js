import axios from 'axios';
import { config } from '../../../config';

import { ACTIVECOMMUNITIES_LIST_REQUEST, ACTIVECOMMUNITIES_LIST_SUCCESS, ACTIVECOMMUNITIES_LIST_ERROR,
    ARCHIVECOMMUNITIES_LIST_REQUEST, ARCHIVECOMMUNITIES_LIST_SUCCESS, ARCHIVECOMMUNITIES_LIST_ERROR } from './communities.worker.types';

export const ListActiveCommunities = () => listCommunities(true, {
    request: ACTIVECOMMUNITIES_LIST_REQUEST, success: ACTIVECOMMUNITIES_LIST_SUCCESS, error: ACTIVECOMMUNITIES_LIST_ERROR
});

export const ListArchiveCommunities = () => listCommunities(false, {
    request: ARCHIVECOMMUNITIES_LIST_REQUEST, success: ARCHIVECOMMUNITIES_LIST_SUCCESS, error: ARCHIVECOMMUNITIES_LIST_ERROR
});

function listCommunities(isActive, types) {
    return (dispatch) => {
        dispatch({
            type: types.request,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.communityList, { params: { isActive } })
            .then(function (response) {

                dispatch({
                    type: types.success,
                    payload: response.data
                })  
            })
            .catch(function (error) {
                const errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка";

                dispatch({
                    type: types.error,
                    payload: errorMessage
                })
            });
    }
}