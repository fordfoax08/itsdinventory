class Draw{
	
	/* Only accept node with Class attrib */
	search_btn(searchBtn){
		let btn = document.querySelector("."+searchBtn);
		// let itemSelect = document.querySelector("."+itemSelected);
		btn.addEventListener("click", ()=>{
			alert("CLICKED!");
		})
	}
	
	
}


export {Draw};