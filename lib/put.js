const fs=require('fs');
const url=require('url');

function PUT(req, res){

		// Write to a file
		let my_other_file=`${timestamp}.json`;
		fs.writeFileSync(`./data/${my_other_file}`,timestamp+'');

	


}
module.exports=PUT