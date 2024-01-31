// actions.js
export const submitHeader = (headerData) => {
    return {
      type: 'SUBMIT_HEADER',
      payload: headerData,
    };
  };
  
  export const submitDetail = (detailData) => {
    return {
      type: 'SUBMIT_DETAIL',
      payload: detailData,
    };
  };
  