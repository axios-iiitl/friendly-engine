module.exports = {
  getdetials: (email, hd) => {
    if (hd == "iiitl.ac.in") {
      const rollNo = email.split("@")[0];
      const branch = rollNo.slice(1, 3);
      const year = rollNo.slice(3, 7);
      const details = { branch, year, rollNo };
      return Object.assign({}, details);
    } else {
      const details = { branch: "nan", year: "nan", rollNo: "nan" };
      return Object.assign({}, details);
    }
  },
};
