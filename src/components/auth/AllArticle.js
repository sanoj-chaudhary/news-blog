import React from 'react'
import Image from 'next/image'
const AllArticle = () => {
  return (
    <div className='row mt-4'>
      <div className='col-md-4'>
        <Image alt='' src='/images/ar-banner.png' height={341} width={400} />
      </div>
      <div className='col-md-8'>
        <button className='btn btn-danger mb-2'>Design tools</button>
        <h5 className='fw-bold'>Sir Gavin Williamson resigns after bullying claims</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed interdum felis, vel imperdiet elit. Suspendisse et varius augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed interdum felis, vel imperdiet elit. Suspendisse et varius augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed interdum felis, vel imperdiet elit. Suspendisse et varius augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <span>December 22, 2022 | Politics</span>
        <div className='mt-4'>
          <button className='btn btn-primary me-3'>Approve</button>
          <button className='btn btn-outline-primary'>Review</button>
        </div>
      </div>
    </div>
  )
}

export default AllArticle