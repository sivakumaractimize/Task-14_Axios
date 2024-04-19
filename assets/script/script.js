let outPutData=[];
function getData() {
   
    axios.get("http://localhost:4000/employe")
      
        .then(data => {
            outPutData=data.data;
            console.log(outPutData);
            let tableData="";
             
            let count=0;
            outPutData.map(emp =>{
                count++;
          
                tableData +=`
                <tr>
                    <th scope="row">${count}</th>
                    <td>${emp.Name}</td>
                    <td>${emp.Email}</td>
                    <td>${emp.Designation}</td>
                    <td><button class="btn btn-primary"  onclick="updateRecord('${emp.id.toString()}')"    >Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteRecord('${emp.id.toString()}')">Delete</button></td>

                   
                </tr>`;
                

            })
            document.getElementById("table-body").innerHTML = tableData;
           
              



        });
}




function add() {
    let name = $("#name").val();
    let email = $("#email").val();
    let desg = $("#designation").val();

    axios.post("http://localhost:4000/employe", {
        Name: name,
        Email: email,
        Designation: desg
    })
    .then((response) => {
        console.log(response);
    })
    .catch(error => {
        console.log('Error:', error);
    });
}



function deleteRecord(id) {
    const url = `http://localhost:4000/employe/${id}`;

    axios.delete(url)
   .then(response=>{
    console.log("response",response)
   })
    .catch(error => {
        console.error('Error:', error);
    });
}


function updateRecord(id){

    let url=`http://localhost:4000/employe/${id}`;
    let update=outPutData.find(value => value.id===id)

    console.log(update)
    $("#ubtn").css("display", "block");

    $("#name").val(update.Name);
    $("#email").val(update.Email);
    $("#designation").val(update.Designation);

    let updateBut=$("#ubtn");

    updateBut.on("click",function(event) {
        let name = $("#name").val();
        let email = $("#email").val();
        let desg = $("#designation").val();

        axios.put(url, {
            Name: name,
            Email: email,
            Designation: desg
        }) 
        .then(response => {
            console.log(response); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}



