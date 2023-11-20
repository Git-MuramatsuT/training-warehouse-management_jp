async function fetchOrders() {
    const orders = await fetch("http://localhost:8080/orders");
    if (!orders.ok) {
        throw new Error("Could not fetch orders");
    }
    const ordersJson = await orders.json();
    console.log(ordersJson);
    renderOrders(ordersJson);
}

function renderOrders(ordersJson) {
    const orders = document.getElementById("order-list");
    if (!orders) {
        throw new Error("Could not find orders element");
    }
    orders.innerHTML = "";
    const orderDiv = document.createElement("table");
    orderDiv.innerHTML =
    "<th>Order ID</th><th>Item Id</th><th>Order Name</th><th>Order Amount</th><th>Order Status</th><th>Order Date</th>";
    ordersJson.orders.forEach((order) => {
        orderDiv.innerHTML += `
        <tr>
            <td>${order.id}</td>
            <td>${order.itemId}</td>
            <td>${order.name}</td>
            <td>${order.amount}</td>
            <td>${order.orderStatus}</td>
            <td>${order.orderDate}</td>
        </tr>
        `;
        orders.appendChild(orderDiv);
    });
}