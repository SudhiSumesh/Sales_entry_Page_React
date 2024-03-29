//header section validation
export const validateHeaderData = (headerData) => {
  const { vr_no, vr_date, ac_name, ac_amt, status } = headerData;
 
  if (!vr_no || !vr_date || !ac_name || !ac_amt || !status) {
    console.log("All fields are required");
    return false;
  }

  if (isNaN(ac_amt) || ac_amt <= 0) {
    console.log("Amount must be a valid positive number");

    return false;
  }

  return true;
};
//detail section validation

export const validateDetailData = (detailData) => {
  for (const row of detailData) {
    const { item_code, item_name, description, qty, rate } = row;

    if (!item_code || !item_name || !qty || !rate || !description) {
      console.log("All fields in the detail row are required");
      return false;
    }

    if (isNaN(qty) || isNaN(rate) || qty <= 0 || rate <= 0) {
      console.log("Quantity and Rate must be valid positive numbers");
      return false;
    }
  }

  return true;
};
