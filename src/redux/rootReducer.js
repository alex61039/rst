import { combineReducers } from 'redux';
import authReducer from './../pages/Auth/auth.reducer';
import childrenReducer from './../pages/Children/children.reducer';
import dictionaryReducer from './../pages/Dictionary/dictionary.reducer';
import institutionReducer from './../pages/Admin/Institution/institution.reducer';
import profileReducer from './../pages/Profile/profile.reducer';
import settingsReducer from './../pages/Settings/settings.reducer';
import structureReducer from './../pages/Admin/Structure/structure.reducer';
import communitiesWorkerReducer from './../pages/Worker/Communities/communities.worker.reducer';
import communitiesReducer from './../pages/Communities/communities.reducer';
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    auth: authReducer,
    children: childrenReducer,
    dictionary: dictionaryReducer,
    institution: institutionReducer,
    profile: profileReducer,
    settings: settingsReducer,
    structure: structureReducer,
    communitiesWorker: communitiesWorkerReducer,
    communities: communitiesReducer,
    routing: routerReducer
});

export default rootReducer;