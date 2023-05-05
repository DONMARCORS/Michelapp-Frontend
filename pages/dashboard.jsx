// Dashboard, depends on the user role, it will show different content
// ----------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import FastAPIClient from '@/client/client';
import config from '@/client/config';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';

const client = new FastAPIClient(config);


const Home = () => {

     const [loading, setLoading] = useState(false)
     const [orders, setOrders] = useState([])

     useEffect(() => {
          //fetchAllOrders()
     }, [])


     const fetchAllOrders = async () => {
          client.getAllOrders()
               .then((res) => {
                    setLoading(false)
                    setOrders(res.data)
                    console.log(orders)
               })
               .catch((err) => {
                    console.log(err)
               })

     }





     if (loading)
          return (
               <div className="flex items-center justify-center h-screen">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               </div>
          )



     return (
          <>
               <section className="bg-black ">
                    <Layout>
                         <div className="flex flex-col items-center justify-center h-screen ">
                              <h1 className="text-4xl font-bold text-white">Welcome to the Dashboard</h1>
                         </div>



                         
                    </Layout>

               </section>
          </>
     )
}

export default Home;