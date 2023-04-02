const timestamp = () => {
  //Obtain the current timestamp (why do we need this?)
	const currentDate = new Date();
	return currentDate.getTime();
};

module.exports = timestamp;
