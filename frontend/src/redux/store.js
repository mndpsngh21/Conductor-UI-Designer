import { createStore, combineReducers } from 'redux';
import workflowReducer from './reducers';

const rootReducer = combineReducers({
    workflow: workflowReducer,
});

const store = createStore(rootReducer);

export default store;
