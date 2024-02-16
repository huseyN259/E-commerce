import React from 'react'
import Navbar from '../head/Navbar'
import Context from '../context/GlobalContext'
import ProductCard from './components/ProductCard'
import { useEffect ,useContext} from 'react'





function MainPage() {
  const { currentCategory, filteredProducts, getProducts, getOrders,products} = useContext(Context)

useEffect(() => {
    getProducts(),

    getOrders()
}, [])

  return (
      <>


          <div className="md:px-20 lg:px-28">
              <Navbar />
              
              <div className="px-6 ">
                  <div>
                      <h1 className="text-4xl lg:text-5xl font-light py-14 px-5">
                          {currentCategory}
                      </h1>
                  </div>
                  <div className="my-10 flex flex-col justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-y-[100px] sm:gap-x-[10px]">
                      {filteredProducts.length ? filteredProducts.map((product) => (<ProductCard key={product.id} id={product.id} data={product} />)) 
                      : products.length ? products.map((product) => (<ProductCard key={product.id} id={product.id} data={product} />)) 
                      : <p className='col-span-3 text-center font-bold'>Not Found Any Product</p>}
                  </div>
              </div>

          </div>
      </>
  )
}

export default MainPage