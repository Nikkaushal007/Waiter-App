document.getElementById('ordForm').addEventListener('submit', addOrder);

// initial array of orders, reading from localStorage
const orders = JSON.parse(localStorage.getItem('orders')) || [];

function addOrder(e){
    e.preventDefault();

    // get dish, table, date, and amount
    let dish = document.getElementById('dish').value;
    let table = document.getElementById('table').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value;

    if(dish != 'chooseOne' 
        && table.length > 0 
        && date != 0 
        && amount > 0){
        const order = {
            dish, 
            table, 
            date,
            amount, 
            id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
        }

        orders.push(order);

        // Through promises

        // axios.post("https://crudcrud.com/api/62dbe150652948f0a0ae566dbf80d2d7/ordersdata", order)
        // .then((respone) => {
        //     console.log(respone)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        

        // Through Async/await
        const sendPostRequest = async () => {
            try {
                const resp = await axios.post('https://crudcrud.com/api/62dbe150652948f0a0ae566dbf80d2d7/ordersdata', order);
                console.log(resp.order);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        
        sendPostRequest();
        
        localStorage 
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    document.getElementById('ordForm').reset();
    showOrders();
}

const showOrders = () => {

    const orderTable = document.getElementById('orderTable');

    orderTable.innerHTML = '';

    for(let i = 0; i < orders.length; i++){
        orderTable.innerHTML += `
            <tr>
                <td>${orders[i].dish}</td>
                <td>${orders[i].table}</td>
                <td>${orders[i].date}</td>
                <td>₹${orders[i].amount}</td>
                <td><a class="deletebutton" onclick="deleteOrder(${orders[i].id})">
                    Delete</td>
            </tr>
        `;
    }
}

const deleteOrder = (id) => {
    for(let i = 0; i < orders.length; i++){
        if(orders[i].id == id){
            orders.splice(i, 1);
        }
    }



    // localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    showOrders();
}


showOrders();