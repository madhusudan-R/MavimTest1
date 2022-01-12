import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './orderList.css'

function OrderList() {

    const [orders, setOrders] = useState([])
    const [deletedItem, setDeletedItems] = useState([orders])
    const [itemDeleted, setItemDeleted] = useState(false)

    const navigate = useNavigate();

    const handelClick = () => {
        navigate("/addOrders")
    }

    const handelUpdateItem = (id) => {
        navigate('/update')
        localStorage.setItem("id", id)
    }
    
    const handelDeleteItem = async (id) => {
        try{
            await axios.delete(`https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza/${id}`);
        }catch(err){
            console.log(err)
        }
         orders.filter((orders) => {
            return(orders.id!==id);
        })
        if(orders.id!==id){
            alert('Record is Successfully deleted')
        }else{
            alert('Something went wrong please try againg!...')
        }
        
        setDeletedItems(orders)
        setItemDeleted(true)
    }

    const handelLogout = () => {
        localStorage.removeItem("user")
        navigate('/')
    }

    useEffect( () => {
        const fetchOrderList = async () => {
            const orderList = await axios.get('https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza');
            setOrders(orderList.data);
            console.log(orderList.data)

        }

        const refreshOrderList = () => {
            if(itemDeleted){
                return setDeletedItems
            } 
        }
        refreshOrderList()
        fetchOrderList()
        
    },[setOrders, setDeletedItems, deletedItem])

    

    return (
        <div>
            <h3 className='list'>Order List</h3>
            <span className='user col-lg-2'>{localStorage.getItem("user")}</span><button className='logoutbtn col-lg-2' type="button" onClick={handelLogout}>Logout</button>
            <div className='container table-responsive'>
                <button className='button1 my-4' onClick={handelClick}>Add Order</button>
            <table className="td1 table  my-4">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Order_No</th>
                        <th scope="col">Crust</th>
                        <th scope="col">Flavour</th>
                        <th scope="col">Size</th>
                        <th scope='col'>Table_No</th>
                        <th scope='col'>Edit-Orders</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.Crust}</td>
                                <td>{item.Flavor}</td>
                                <td>{item.Size}</td>
                                <td>{item.Table_No}</td>
                                <td className='update bi bi-pencil-square' onClick={() => handelUpdateItem(item.id)}></td>
                                <td className='delete bi bi-trash' onClick={() => handelDeleteItem(item.id)}></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default OrderList
