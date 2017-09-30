

function addRow(tableID) {
			
			var table = document.getElementById(tableID);

			var rowCount =table.rows.length-5;
			console.log('rowCount is : ',rowCount);
			var row = table.insertRow(rowCount);
			row.className = "t2";
			var id=rowCount-1;
			console.log('id is : ',id);
			var cellid='n'+id;

			var cell1 = row.insertCell(0);
			

			var cell2 = row.insertCell(1);
			cell2.className = "bags";
			var element1 = document.createElement("input");
			element1.type="text";
			element1.name="txtbox[]";
			element1.value="0";
			cell2.appendChild(element1);

			var cell3 = row.insertCell(2);
			cell3.className = "size";
			var element2 = document.createElement("input");
			element2.type = "text";
			element2.name = "txtbox[]";
			element2.value="0";
			cell3.appendChild(element2);

			var cell4 = row.insertCell(3);
			cell4.className="qty";
			var element3 = document.createElement("input");
			element3.type = "text";
			element3.name = "txtbox[]";
			element3.id=cellid;

			element3.value="0";
			cell4.appendChild(element3);

			var cell5 = row.insertCell(4);
			
			

			var cell6 = row.insertCell(5);


		}

window.onload = function(){
var button=document.getElementById('add');
var totalRows=1;
button.onclick= function(){
	addRow('descriptions');
	totalRows+=1;
};

var submitBtn = document.getElementById('submit');

submitBtn.onclick=function(){
	var totalQty=0;
for(i=1;i<=totalRows;i++){
	var rowNumber='n'+i;
	console.log('rowNumber is :',rowNumber);
	totalQty += Number(document.getElementById(rowNumber).value);
	console.log('totalQty is : ',totalQty);
}

var total = document.getElementById('total');
total.innerHTML = totalQty;
var rate = Number(document.getElementById('rate').value);
var value = totalQty*rate;
var price = document.getElementById('value');
price.innerHTML = "Rs." + value;

var gst = (5/100)*value;
var gstValue = document.getElementById('gst');
gstValue.innerHTML = 'Rs.'+gst;

var totalPrice = gst+value;
console.log('totalPrice is : ',totalPrice);
var finalPrice = document.getElementById('final');
finalPrice.innerHTML = 'Rs.'+totalPrice;

};//submit button click ends


};// window onload function ends
