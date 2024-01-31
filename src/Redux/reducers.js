// reducers.js
const headerReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SUBMIT_HEADER':
        // Handle state changes for header submission
        return {
          ...state,
          headerData: action.payload,
        };
      default:
        return state;
    }
  };
  
  const detailReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SUBMIT_DETAIL':
        // Handle state changes for detail submission
        return {
          ...state,
          detailData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export { headerReducer, detailReducer };
  