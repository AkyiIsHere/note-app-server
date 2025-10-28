const serviceAsyncWrapper = (serviceFunction) => {
	return async (req,res) => {
		try {
			return await serviceFunction(req,res);
		} catch (error) {
			console.log("Error in service wrapper",error)
			throw error;
		}
	};
};

module.exports = serviceAsyncWrapper